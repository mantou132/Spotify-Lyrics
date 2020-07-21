import { Event, Options } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import { renderLyricsWithCanvas } from './canvas-renderer';
import { renderLyricsWithSVG } from './svg-renderer';
import { setSongId } from './store';
import { video, audio } from './element';
import { lyric, updateLyric, sendMatchedData, Query, Lyric } from './lyrics';

import './pip';
import './misc';
import './observer';
import { optionsPromise } from './options';
import { captureException } from './utils';

const INTERVAL = 80;

const weakMap = new WeakMap<MediaStream, CanvasCaptureMediaStreamTrack>();
const lyricWeakMap = new WeakMap<CanvasCaptureMediaStreamTrack, Lyric>();
const prevTimeWeakMap = new WeakMap<CanvasCaptureMediaStreamTrack, number>();
let errorLyric: Lyric;
const lyricCanvas = document.createElement('canvas');
const ctx = lyricCanvas.getContext('2d');
// Firefox Issue: NS_ERROR_NOT_INITIALIZED
// https://bugzilla.mozilla.org/show_bug.cgi?id=1572422
const lyricTrack = lyricCanvas.captureStream().getVideoTracks()[0] as CanvasCaptureMediaStreamTrack;
lyricCanvas.width = video.width;
lyricCanvas.height = video.height;
let options: Options;

const update = async () => {
  if (!ctx) return;
  // Do not check `document.pictureInPictureElement`
  // safari enters pip needs a video that is playing
  if (
    !video ||
    !audio ||
    !(video.srcObject instanceof MediaStream) ||
    // Safari needs to refresh the video all the time to open pip
    (!document.pictureInPictureElement && !/Version\/.*Safari\/.*/.test(navigator.userAgent))
  ) {
    return setTimeout(update, INTERVAL);
  }
  if (!weakMap.get(video.srcObject)) {
    // song change
    // change coverTrack
    const coverTrack = video.srcObject.getVideoTracks()[0] as CanvasCaptureMediaStreamTrack;
    if (!coverTrack.canvas) {
      // Firefox Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1231131
      coverTrack.canvas = (video.srcObject as CanvasCaptureMediaStream).canvas;
    }
    const stream = new MediaStream([lyricTrack]);
    video.srcObject = stream;
    weakMap.set(video.srcObject, coverTrack);
    if (video.paused) {
      video.play();
    }
  }
  const coverTrack = weakMap.get(video.srcObject) as CanvasCaptureMediaStreamTrack;

  if (options['only-cover'] === 'on') {
    ctx.clearRect(0, 0, video.width, video.height);
    ctx.drawImage(coverTrack.canvas, 0, 0, video.width, video.height);
    setTimeout(update, INTERVAL);
    return;
  }

  const prevTime = prevTimeWeakMap.get(coverTrack) || 0;
  const renderTime = audio.currentTime > prevTime ? audio.currentTime : prevTime;
  const currentLyric = lyricWeakMap.get(coverTrack) || lyric;
  prevTimeWeakMap.set(coverTrack, audio.currentTime);
  if (options['lyrics-smooth-scroll'] === 'on') {
    ctx.drawImage(coverTrack.canvas, 0, 0, video.width, video.height);
    if (lyric.length > 0) {
      lyricWeakMap.set(coverTrack, lyric);
      renderLyricsWithCanvas(ctx, currentLyric, renderTime);
    }
    requestAnimationFrame(update);
  } else {
    try {
      const img = await renderLyricsWithSVG(ctx, currentLyric, renderTime);
      ctx.drawImage(coverTrack.canvas, 0, 0, video.width, video.height);
      if (lyric.length > 0) {
        lyricWeakMap.set(coverTrack, lyric);
        ctx.drawImage(img, 0, 0, video.width, video.height);
      }
    } catch (e) {
      if (errorLyric !== currentLyric) {
        captureException(e, currentLyric);
        errorLyric = currentLyric;
      }
      ctx.drawImage(coverTrack.canvas, 0, 0, video.width, video.height);
    }
    setTimeout(update, INTERVAL);
  }
};

optionsPromise.then(opts => {
  options = opts;
  update();

  sendEvent(opts.cid, events.startUp);

  // https://github.com/w3c/manifest/pull/836
  window.addEventListener('appinstalled', () => {
    sendEvent(opts.cid, events.installAsPWA);
  });
});

window.addEventListener('message', async ({ data }: MessageEvent) => {
  if (!document.pictureInPictureElement) return;

  if (data?.type === Event.GET_SONGS) {
    sendMatchedData();
  }
  if (data?.type === Event.SELECT_SONG && video && video.srcObject) {
    const info = data.data as Query & { id: number };
    const { id, name, artists } = info;
    await setSongId(info);
    const coverTrack = weakMap.get(video.srcObject as CanvasCaptureMediaStream);
    lyricWeakMap.delete(coverTrack as CanvasCaptureMediaStreamTrack);
    if (id) {
      updateLyric(id as number);
    } else {
      // auto select
      updateLyric({ name, artists });
    }
  }
});
