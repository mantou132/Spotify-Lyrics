import { Event, Options } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { renderLyricsWithCanvas, RenderOptions } from './canvas-renderer';
import { renderLyricsWithSVG } from './svg-renderer';
import { video, audioPromise } from './element';
import { sharedData } from './share-data';

import './pip';
import './observer';

import { optionsPromise } from './options';
import { appendStyle } from './utils';
import { localConfig } from './config';

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
  const drawCover = () => {
    ctx.canvas.width = ctx.canvas.width;
    ctx.drawImage(coverTrack.canvas, 0, 0, video.width, video.height);
  };

  if (options['only-cover'] === 'on') {
    drawCover();
    setTimeout(update, INTERVAL);
    return;
  }

  const renderOptions: RenderOptions = {
    focusLineFontSize: Number(options['font-size']),
    align: options['lyrics-align'],
  };

  if (options['lyrics-smooth-scroll'] === 'on') {
    drawCover();
    renderLyricsWithCanvas(ctx, sharedData.lyrics, audio.currentTime, renderOptions);
    requestAnimationFrame(update);
  } else {
    const img = await renderLyricsWithSVG(ctx, sharedData.lyrics, audio.currentTime, renderOptions);
    drawCover();
    img && ctx.drawImage(img, 0, 0, video.width, video.height);
    setTimeout(update, INTERVAL);
  }
};

optionsPromise.then((opts) => {
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
  if (!data?.type) return;

  switch (data.type) {
    case Event.GET_SONGS:
      return sharedData.sendToContentScript();
    case Event.SELECT_SONG:
      return sharedData.chooseLyricsTrack(data.data as PopupStore);
    case Event.CONFIRMED_SONG:
      return sharedData.confirmedMId();
    default:
      return;
  }
});

appendStyle(localConfig.STATIC_STYLE);

if (localConfig.SERVICE_WORKER) {
  navigator.serviceWorker.getRegistration().then((reg) => {
    if (!reg) {
      navigator.serviceWorker.register(localConfig.STATIC_STYLE);
    }
  });
}
