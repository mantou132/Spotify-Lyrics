import config from '../common/config';

import { video } from './element';

const LYRICS_CLASSNAME = 'spoticon-lyrics-16';

const style = document.createElement('style');
style.textContent = `
  .${LYRICS_CLASSNAME}::before {
    content: '\\f345';
    font-size: 16px;
    transform: rotate(90deg);
    color: #b3b3b3;
  }
  .${LYRICS_CLASSNAME}.active::before {
    color: #1db954;
  }
`;
document.head.append(style);

export const insetLyricsBtn = async () => {
  const { BTN_WRAPPER_SELECTOR } = await config;
  const btnWrapper = document.querySelector(BTN_WRAPPER_SELECTOR) as HTMLDivElement;
  const likeBtn = btnWrapper?.children?.[0];
  if (!btnWrapper || !likeBtn) return;
  btnWrapper.style.display = 'flex';
  const lyricsBtn = likeBtn.cloneNode(true) as HTMLButtonElement;
  lyricsBtn.classList.add(LYRICS_CLASSNAME);
  lyricsBtn.title = 'Toggle lyrics';
  video.addEventListener('enterpictureinpicture', () => {
    lyricsBtn.classList.add('active');
  });
  video.addEventListener('leavepictureinpicture', () => {
    lyricsBtn.classList.remove('active');
  });
  lyricsBtn.addEventListener('click', () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {
        //
      });
    } else {
      video.requestPictureInPicture().catch(() => {
        //
      });
    }
  });
  btnWrapper.append(lyricsBtn);
};
