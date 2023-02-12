import { sendEvent, events } from '../common/ga';
import { Event, Message } from '../common/consts';

import config, { localConfig } from './config';
import { lyricVideo, audioPromise, lyricVideoIsOpen } from './element';
import { appendStyle, css, captureException, documentQueryHasSelector } from './utils';
import { sharedData } from './share-data';
import { optionsPromise } from './options';
import { openEditor } from './editor';
import { openLyrics, closeLyrics } from './pip';

// Hide the original content that conflicts with the lyrics button
// In spotify is the pip button
// In deezer is the native lyrics button, and many lyrics buttons
// Note that the css selector needs to support multiple languages
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
  return btnWrapper?.getElementsByClassName(
    localConfig.LYRICS_CLASSNAME,
  )[0] as HTMLButtonElement | null;
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
      e.preventDefault();
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
  const likeBtn = documentQueryHasSelector(BTN_LIKE_SELECTOR) as HTMLButtonElement;
  if (!btnWrapper || !likeBtn) return;

  if (btnWrapper.getElementsByClassName(localConfig.LYRICS_CLASSNAME).length) return;

  btnWrapper.style.display = 'flex';
  const lyricsBtn = likeBtn.cloneNode(true) as HTMLButtonElement;
  lyricsBtn.classList.add(localConfig.LYRICS_CLASSNAME);

  lyricsBtn.disabled = false;
  lyricsBtn.hidden = false;
  lyricsBtn.title = options.i18nMap.pageButtonTitle;
  lyricsBtn.setAttribute('aria-label', lyricsBtn.title);
  lyricsBtn.querySelectorAll('*').forEach((e) => {
    e.removeAttribute('title');
    e.removeAttribute('aria-label');
  });

  if (lyricVideoIsOpen) {
    lyricsBtn.classList.add(localConfig.LYRICS_ACTIVE_CLASSNAME);
  }
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
  lyricsBtn.addEventListener('auxclick', (e) => {
    // This event is first triggered when right-clicking in Firefox
    if (e.button === 1) {
      lyricsBtn.blur();
      openEditor();
    }
  });
  lyricsBtn.addEventListener('click', async (evt) => {
    lyricsBtn.blur();
    if (evt.isTrusted) sendEvent(options.cid, events.clickToggleLyrics);
    try {
      if (lyricVideoIsOpen) {
        await closeLyrics();
        sharedData.resetData();
      } else {
        await openLyrics();
        sharedData.updateTrack(true);
      }
    } catch (e) {
      captureException(e);
    }
  });
  btnWrapper.append(lyricsBtn);
};
