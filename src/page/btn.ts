import { sendEvent, events } from '../common/ga';

import config, { localConfig } from './config';

import { video, audioPromise, videoMetadataloaded } from './element';
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
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (e.key === 'l' && !e.repeat) {
      sendEvent(options.cid, events.keypressToggleLyrics);
      lyricsBtn.click();
    }
  },
  true,
);

export const insetLyricsBtn = async () => {
  // Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': Metadata for the video element are not loaded yet.
  // Ensure that the inserted button can be clicked
  await videoMetadataloaded;

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
    if (document.pictureInPictureElement !== video) {
      video.requestPictureInPicture().catch(() => document.exitPictureInPicture());
    } else {
      lyricsBtn.classList.add(localConfig.LYRICS_ACTIVE_CLASSNAME);
    }
  }

  lyricsBtn.title = 'Toggle lyrics(L)';
  if (document.pictureInPictureElement === video)
    lyricsBtn.classList.add(localConfig.LYRICS_ACTIVE_CLASSNAME);
  video.addEventListener('enterpictureinpicture', () => {
    lyricsBtn.classList.add(localConfig.LYRICS_ACTIVE_CLASSNAME);
  });
  video.addEventListener('leavepictureinpicture', () => {
    lyricsBtn.classList.remove(localConfig.LYRICS_ACTIVE_CLASSNAME);
  });
  lyricsBtn.addEventListener('click', () => {
    sendEvent(options.cid, events.clickToggleLyrics);
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      video
        .requestPictureInPicture()
        .then(() => {
          sharedData.updateTrack(true);
        })
        .catch(captureException);
    }
  });
  btnWrapper.append(lyricsBtn);
};
