import { Event } from '../common/consts';
import { sendEvent, events } from '../common/ga';
import { PopupStore } from '../popup/store';

import {
  drawText,
  drawBackground,
  renderLyrics,
  renderHighlight,
  RenderLyricsOptions,
  RenderTextOptions,
} from './canvas-renderer';
import { coverCanvas, coverHDCanvas, lyricCtx, audioPromise } from './element';
import { sharedData } from './share-data';
import { optionsPromise, OptionsAndI18n } from './options';
import { appendStyle } from './utils';
import { localConfig } from './config';
import { getFPS } from './fps';

import './pip';
import './observer';

let options: OptionsAndI18n;

const tick = async () => {
  const audio = await audioPromise;
  const i18nMap = options.i18nMap;

  const isOnlyCover = options['only-cover'] === 'on';
  const isHDCover = options['hd-cover'] === 'on';
  const isSmoothScroll = getFPS() >= 30;
  const isOpen = !!document.pictureInPictureElement;
  const { error, lyrics, highlightLyrics } = sharedData;

  const backgroundImage = isOnlyCover || isHDCover ? coverHDCanvas : coverCanvas;

  const textOptions: RenderTextOptions = {
    backgroundImage,
    fontFamily: options['font-family'],
  };

  const renderOptions: RenderLyricsOptions = {
    backgroundImage,
    focusLineFontSize: Number(options['font-size']),
    align: options['lyrics-align'],
    smooth: isSmoothScroll,
    fontFamily: options['font-family'],
  };

  if (isOnlyCover) {
    drawBackground(lyricCtx, backgroundImage);
  } else {
    if (error) {
      drawText(lyricCtx, `${i18nMap.pageTipError}: ${error.message}`, {
        color: 'red',
        ...textOptions,
      });
    } else if (!lyrics && !highlightLyrics) {
      drawText(lyricCtx, i18nMap.pageTipNoLyrics, textOptions);
    } else if (audio.duration && lyrics?.length) {
      renderLyrics(lyricCtx, lyrics, audio.currentTime, renderOptions);
    } else if (!audio.duration || lyrics?.length === 0 || highlightLyrics?.length === 0) {
      drawText(
        lyricCtx,
        audio.currentSrc ? i18nMap.pageTipLoading : i18nMap.pageTipWaiting,
        textOptions,
      );
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
