import { Event, Options } from '../common/consts';
import { sendEvent, events } from '../common/ga';
import { PopupStore } from '../popup/store';

import {
  renderLyricsWithCanvas,
  RenderOptions,
  drawText,
  drawHighlightLyrics,
  drawLoading,
} from './canvas-renderer';
import { coverCanvas, coverHDCanvas, lyricCtx, audioPromise } from './element';
import { sharedData } from './share-data';
import { optionsPromise } from './options';
import { appendStyle } from './utils';
import { localConfig } from './config';

import './pip';
import './observer';

let options: Options;

const update = async () => {
  const audio = await audioPromise;

  const isOnlyCover = options['only-cover'] === 'on';
  const isHDCover = options['hd-cover'] === 'on';
  const isSmoothScroll =
    document.visibilityState === 'visible' && options['lyrics-smooth-scroll'] === 'on';
  const isOpen = !!document.pictureInPictureElement;
  const { width, height } = lyricCtx.canvas;

  const drawCover = () => {
    lyricCtx.canvas.width = width;
    lyricCtx.drawImage(isOnlyCover || isHDCover ? coverHDCanvas : coverCanvas, 0, 0, width, height);
  };

  const renderOptions: RenderOptions = {
    focusLineFontSize: Number(options['font-size']),
    align: options['lyrics-align'],
    smooth: isSmoothScroll,
  };

  const { error, lyrics, highlightLyrics } = sharedData;

  drawCover();
  if (!isOnlyCover) {
    if (error) {
      drawText(lyricCtx, `Error: ${error.message}`, 'red');
    } else if (!lyrics && !highlightLyrics) {
      drawText(lyricCtx, 'No lyrics');
    } else if (lyrics?.length) {
      renderLyricsWithCanvas(lyricCtx, lyrics, audio.currentTime, renderOptions);
    } else if (lyrics?.length === 0 || highlightLyrics?.length === 0) {
      drawLoading(lyricCtx);
    } else if (!lyrics && highlightLyrics?.length) {
      drawHighlightLyrics(lyricCtx, highlightLyrics, renderOptions);
    }
  }

  if (!isOnlyCover && isSmoothScroll && isOpen && (lyrics?.length || highlightLyrics?.length)) {
    requestAnimationFrame(update);
  } else {
    setTimeout(update, 80);
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
