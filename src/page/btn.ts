import { sendEvent, events } from '../common/ga';

import config from './config';

import { video, audio } from './element';
import { appendStyle, css, captureException } from './utils';
import { sharedData } from './share-data';
import { optionsPromise } from './options';

const LYRICS_CLASSNAME = 'spoticon-lyrics-16';
const LYRICS_ACTIVE_CLASSNAME = 'active';

appendStyle(css`
  .${LYRICS_CLASSNAME}::before {
    content: '\\f345';
    font-size: 16px;
    transform: rotate(90deg);
    color: #b3b3b3;
  }
  .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME}::before {
    color: #1db954;
  }
`);

config.then(({ PIP_BTN_SELECTOR }) => {
  appendStyle(css`
    ${PIP_BTN_SELECTOR} {
      display: none;
    }
  `);
});

export async function getLyricsBtn() {
  const { BTN_WRAPPER_SELECTOR } = await config;
  const btnWrapper = document.querySelector(BTN_WRAPPER_SELECTOR) as HTMLDivElement;
  return btnWrapper.getElementsByClassName(LYRICS_CLASSNAME)[0] as HTMLButtonElement;
}

window.addEventListener('keyup', async e => {
  const options = await optionsPromise;
  const lyricsBtn = await getLyricsBtn();
  if (!lyricsBtn) return;
  const element = (e.composedPath?.()[0] || e.target) as HTMLElement;
  if (element.isContentEditable || element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    return;
  }
  if (e.key === 'l') {
    sendEvent(options.cid, events.keypressToggleLyrics);
    lyricsBtn.click();
  }
});

export const insetLyricsBtn = async () => {
  const options = await optionsPromise;
  const { BTN_WRAPPER_SELECTOR, BTN_LIKE_SELECTOR } = await config;

  const btnWrapper = document.querySelector(BTN_WRAPPER_SELECTOR) as HTMLDivElement;
  const likeBtn = document.querySelector(BTN_LIKE_SELECTOR) as HTMLButtonElement;
  if (!btnWrapper || !likeBtn) return;

  if (btnWrapper.getElementsByClassName(LYRICS_CLASSNAME).length) return;

  btnWrapper.style.display = 'flex';
  const lyricsBtn = likeBtn.cloneNode(true) as HTMLButtonElement;
  lyricsBtn.classList.add(LYRICS_CLASSNAME);

  if (document.pictureInPictureElement) {
    if (document.pictureInPictureElement !== video) {
      video.requestPictureInPicture().catch(() => document.exitPictureInPicture());
    } else {
      lyricsBtn.classList.add(LYRICS_ACTIVE_CLASSNAME);
    }
  }

  lyricsBtn.title = 'Toggle lyrics(L)';
  if (document.pictureInPictureElement === video) lyricsBtn.classList.add(LYRICS_ACTIVE_CLASSNAME);
  video.addEventListener('enterpictureinpicture', () => {
    lyricsBtn.classList.add(LYRICS_ACTIVE_CLASSNAME);
  });
  video.addEventListener('leavepictureinpicture', () => {
    lyricsBtn.classList.remove(LYRICS_ACTIVE_CLASSNAME);
  });
  lyricsBtn.addEventListener('click', () => {
    sendEvent(options.cid, events.clickToggleLyrics);
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(console.error);
    } else {
      video
        .requestPictureInPicture()
        .then(() => {
          sharedData.updateTrack(true);
          // automatically pause when the video is removed from the DOM tree
          if (!audio?.paused) video.play();
        })
        .catch(e => {
          captureException(e);
        });
    }
  });
  btnWrapper.append(lyricsBtn);
};
