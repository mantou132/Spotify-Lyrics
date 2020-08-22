import { Event, Options } from '../common/consts';
import { sendEvent, events } from '../common/ga';
import { PopupStore } from '../popup/store';

import {
  drawText,
  drawBackground,
  renderLyrics,
  renderHighlight,
  RenderLyricsOptions,
} from './canvas-renderer';
import { coverCanvas, coverHDCanvas, lyricCtx, audioPromise } from './element';
import { sharedData } from './share-data';
import { optionsPromise } from './options';
import { appendStyle } from './utils';
import { localConfig } from './config';
import { getFPS } from './fps';

import './pip';
import './observer';

let options: Options;

const tick = async () => {
  const audio = await audioPromise;

  const isOnlyCover = options['only-cover'] === 'on';
  const isHDCover = options['hd-cover'] === 'on';
  const isSmoothScroll = getFPS() >= 30;
  const isOpen = !!document.pictureInPictureElement;
  const { error, lyrics, highlightLyrics } = sharedData;

  const bg = isOnlyCover || isHDCover ? coverHDCanvas : coverCanvas;

  const renderOptions: RenderLyricsOptions = {
    bg,
    focusLineFontSize: Number(options['font-size']),
    align: options['lyrics-align'],
    smooth: isSmoothScroll,
  };

  if (isOnlyCover) {
    drawBackground(lyricCtx, bg);
  } else {
    if (error) {
      drawText(lyricCtx, `Error: ${error.message}`, { color: 'red', bg });
    } else if (!lyrics && !highlightLyrics) {
      drawText(lyricCtx, 'No lyrics', { bg });
    } else if (lyrics?.length) {
      renderLyrics(lyricCtx, lyrics, audio.currentTime, renderOptions);
    } else if (lyrics?.length === 0 || highlightLyrics?.length === 0) {
      drawText(lyricCtx, audio.currentSrc ? 'Loading...' : 'Waiting for music...', { bg });
    } else if (!lyrics && highlightLyrics?.length) {
      renderHighlight(lyricCtx, highlightLyrics, renderOptions);
    }
  }

  if (!isOnlyCover && isSmoothScroll && isOpen && (lyrics?.length || highlightLyrics?.length)) {
    requestAnimationFrame(tick);
  } else {
    setTimeout(tick, 80);
  }
};

optionsPromise.then((opts) => {
  options = opts;
  tick();

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
