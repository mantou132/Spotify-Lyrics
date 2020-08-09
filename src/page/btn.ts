import { sendEvent, events } from '../common/ga';
import { Event, Message } from '../common/consts';

import config, { localConfig } from './config';
import { lyricVideo, audioPromise } from './element';
import { appendStyle, css, captureException } from './utils';
import { sharedData } from './share-data';
import { optionsPromise } from './options';

config.then(({ PIP_BTN_SELECTOR }) => {
  appendStyle(css`
    ${PIP_BTN_SELECTOR} {
      display: none;
    }
  `);
});

export async function getLyricsBtn() {
  const { BTN_WRAPPER_SELECTOR } = await config;
  const btnWrapper = document.querySelector(BTN_WRAPPER_SELECTOR);
  return btnWrapper?.getElementsByClassName(localConfig.LYRICS_CLASSNAME)[0] as HTMLButtonElement;
}

window.addEventListener(
  'keydown',
  async (e) => {
    const options = await optionsPromise;
    const lyricsBtn = await getLyricsBtn();
    if (!lyricsBtn) return;
    const element = (e.composedPath?.()[0] || e.target) as HTMLElement;
    if (
      element.isContentEditable ||
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    ) {
      return;
    }
    if (e.key === options['toggle-shortcut'] && !e.repeat) {
      // Execute in current microtask
      e.stopImmediatePropagation();
      e.stopPropagation();
      sendEvent(options.cid, events.keypressToggleLyrics);
      lyricsBtn.click();
    }
  },
  true,
);

export const insetLyricsBtn = async () => {
  await audioPromise;

  const options = await optionsPromise;
  const { BTN_WRAPPER_SELECTOR, BTN_LIKE_SELECTOR } = await config;

  const btnWrapper = document.querySelector(BTN_WRAPPER_SELECTOR) as HTMLDivElement;
  const likeBtn = document.querySelector(BTN_LIKE_SELECTOR) as HTMLButtonElement;
  if (!btnWrapper || !likeBtn) return;

  if (btnWrapper.getElementsByClassName(localConfig.LYRICS_CLASSNAME).length) return;

  btnWrapper.style.display = 'flex';
  const lyricsBtn = likeBtn.cloneNode(true) as HTMLButtonElement;
  lyricsBtn.classList.add(localConfig.LYRICS_CLASSNAME);

  if (document.pictureInPictureElement) {
    if (document.pictureInPictureElement !== lyricVideo) {
      lyricVideo.requestPictureInPicture().catch(() => document.exitPictureInPicture());
    } else {
      lyricsBtn.classList.add(localConfig.LYRICS_ACTIVE_CLASSNAME);
    }
  }

  lyricsBtn.title = 'Toggle lyrics';
  if (document.pictureInPictureElement === lyricVideo)
    lyricsBtn.classList.add(localConfig.LYRICS_ACTIVE_CLASSNAME);
  lyricVideo.addEventListener('enterpictureinpicture', () => {
    lyricsBtn.classList.add(localConfig.LYRICS_ACTIVE_CLASSNAME);
  });
  lyricVideo.addEventListener('leavepictureinpicture', () => {
    lyricsBtn.classList.remove(localConfig.LYRICS_ACTIVE_CLASSNAME);
  });
  lyricsBtn.addEventListener(
    'contextmenu',
    (e) => {
      lyricsBtn.blur();
      window.postMessage({ type: Event.OPEN_OPTIONS } as Message, '*');
      e.stopPropagation();
      e.preventDefault();
    },
    true,
  );
  lyricsBtn.addEventListener('click', async () => {
    lyricsBtn.blur();
    sendEvent(options.cid, events.clickToggleLyrics);
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        sharedData.resetData();
      } else {
        await lyricVideo.requestPictureInPicture();
        sharedData.updateTrack(true);
      }
    } catch (e) {
      captureException(e);
    }
  });
  btnWrapper.append(lyricsBtn);
};
