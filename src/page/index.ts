import { Event, Options } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { renderLyricsWithCanvas } from './canvas-renderer';
import { renderLyricsWithSVG } from './svg-renderer';
import { video, audioPromise } from './element';
import { sharedData } from './share-data';

import './pip';
import './misc';
import './observer';

import { optionsPromise } from './options';

const INTERVAL = 80;

const weakMap = new WeakMap<MediaStream, CanvasCaptureMediaStreamTrack>();

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
  const audio = await audioPromise;
  // Do not check `document.pictureInPictureElement`
  // safari enters pip needs a video that is playing
  if (
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

  if (options['lyrics-smooth-scroll'] === 'on') {
    ctx.drawImage(coverTrack.canvas, 0, 0, video.width, video.height);
    renderLyricsWithCanvas(ctx, sharedData.lyrics, audio.currentTime);
    requestAnimationFrame(update);
  } else {
    const img = await renderLyricsWithSVG(ctx, sharedData.lyrics, audio.currentTime);
    ctx.drawImage(coverTrack.canvas, 0, 0, video.width, video.height);
    img && ctx.drawImage(img, 0, 0, video.width, video.height);
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
    sharedData.sendToContentScript();
  }

  if (data?.type === Event.SELECT_SONG) {
    sharedData.chooseLyricsTrack(data.data as PopupStore);
  }
});
