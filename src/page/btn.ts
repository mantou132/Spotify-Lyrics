import config from '../common/config';

import { video, audio } from './element';

export const LYRICS_CLASSNAME = 'spoticon-lyrics-16';
const LYRICS_ACTIVE_CLASSNAME = 'active';

const style = document.createElement('style');
style.textContent = `
  .${LYRICS_CLASSNAME}::before {
    content: '\\f345';
    font-size: 16px;
    transform: rotate(90deg);
    color: #b3b3b3;
  }
  .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME}::before {
    color: #1db954;
  }
`;
document.head.append(style);

export const insetLyricsBtn = async () => {
  const { BTN_WRAPPER_SELECTOR, PIP_BTN_SELECTOR } = await config;
  const btnWrapper = document.querySelector(BTN_WRAPPER_SELECTOR) as HTMLDivElement;
  const pipBtn = document.querySelector(PIP_BTN_SELECTOR) as HTMLElement | null;
  const likeBtn = btnWrapper?.children?.[0];
  if (!btnWrapper || !likeBtn) return;
  if (btnWrapper.getElementsByClassName(LYRICS_CLASSNAME).length) return;
  btnWrapper.style.display = 'flex';
  const lyricsBtn = likeBtn.cloneNode(true) as HTMLButtonElement;
  lyricsBtn.classList.add(LYRICS_CLASSNAME);
  lyricsBtn.title = 'Toggle lyrics';
  if (document.pictureInPictureElement === video) lyricsBtn.classList.add(LYRICS_ACTIVE_CLASSNAME);
  video.addEventListener('enterpictureinpicture', () => {
    lyricsBtn.classList.add(LYRICS_ACTIVE_CLASSNAME);
  });
  video.addEventListener('leavepictureinpicture', () => {
    lyricsBtn.classList.remove(LYRICS_ACTIVE_CLASSNAME);
  });
  lyricsBtn.addEventListener('click', () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(console.error);
    } else {
      video
        .requestPictureInPicture()
        .then(() => {
          // automatically pause when the video is removed from the DOM tree
          if (!audio?.paused) video.play();
        })
        .catch(console.error);
    }
  });
  btnWrapper.append(lyricsBtn);
  if (pipBtn) pipBtn.hidden = true;
};
