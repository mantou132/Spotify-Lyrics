import { sendEvent, events } from '../common/ga';
import { Event, isProd, Message } from '../common/constants';

import { configPromise, localConfig } from './config';
import { lyricVideo, audioPromise, lyricVideoIsOpen } from './element';
import {
  appendStyle,
  css,
  captureException,
  documentQueryHasSelector,
  querySelector,
  querySelectorAll,
} from './utils';
import { sharedData } from './share-data';
import { optionsPromise } from './options';
import { openEditor } from './editor';
import { openLyrics, closeLyrics } from './pip';

// Hide the original content that conflicts with the lyrics button
// In spotify is the pip button
// In deezer is the native lyrics button, and many lyrics buttons
// Note that the css selector needs to support multiple languages
configPromise.then(({ PIP_BTN_SELECTOR }) => {
  appendStyle(css`
    ${PIP_BTN_SELECTOR} {
      display: none;
    }
  `);
});

export async function getLyricsBtn() {
  const { BTN_WRAPPER_SELECTOR } = await configPromise;
  const btnWrapper = querySelector(BTN_WRAPPER_SELECTOR);
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
    if (e.key.toLowerCase() === options['toggle-shortcut'] && !e.repeat) {
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
  const { BTN_WRAPPER_SELECTOR, BTN_LIKE_SELECTOR } = await configPromise;

  // test selector
  if (!isProd) {
    console.log('===============================');
    Object.entries(await configPromise).forEach(([k, v]) => {
      if (k.includes('SELECTOR')) {
        console.log(k, querySelector(`${v}`));
      }
    });
    Object.entries(localConfig).forEach(([k, v]) => {
      if (k.includes('STYLE')) {
        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(v);
        [...styleSheet.cssRules].forEach((rule: CSSStyleRule) => {
          console.log(rule.selectorText, querySelectorAll(rule.selectorText));
        });
      }
    });
  }

  const btnWrapper = querySelector(BTN_WRAPPER_SELECTOR) as HTMLDivElement;
  const likeBtn = documentQueryHasSelector(BTN_LIKE_SELECTOR) as HTMLButtonElement;
  if (!btnWrapper || !likeBtn) return;

  if (btnWrapper.getElementsByClassName(localConfig.LYRICS_CLASSNAME).length) return;

  if (localConfig.BTN_CONTINER_STYLE) {
    const root = btnWrapper.shadowRoot || (btnWrapper.getRootNode() as unknown as ShadowRoot);
    const style = new CSSStyleSheet();
    style.replaceSync(localConfig.BTN_CONTINER_STYLE);
    root.adoptedStyleSheets.push(style);
  }

  btnWrapper.style.display = 'flex';
  const lyricsBtn = likeBtn.cloneNode(true) as HTMLButtonElement;
  (window as any).lyricsBtn = lyricsBtn;
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
      if (e.metaKey || e.ctrlKey) {
        openEditor();
      } else {
        window.postMessage({ type: Event.OPEN_OPTIONS } as Message, '*');
      }
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
        sharedData.dispatchTrackElementUpdateEvent(true);
      }
    } catch (e) {
      captureException(e);
    }
  });
  btnWrapper.append(lyricsBtn);
};
