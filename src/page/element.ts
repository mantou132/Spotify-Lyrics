import { Message, Event } from '../common/consts';

import { sharedData } from './share-data';
import { captureException } from './utils';
import { getLyricsBtn } from './btn';

const video = document.createElement('video');
video.muted = true;
video.width = 640;
video.height = 640;

const createElement: typeof document.createElement = document.createElement.bind(document);

let audio: HTMLAudioElement | null = null;

const setPopupState = (active: boolean) => {
  const msg: Message = { type: Event.POPUP_ACTIVE, data: active };
  window.postMessage(msg, '*');
};

export const videoMetadataloaded = new Promise(res => {
  video.addEventListener('loadedmetadata', () => res());
});

video.addEventListener('enterpictureinpicture', () => {
  setPopupState(true);
});
video.addEventListener('leavepictureinpicture', () => {
  setPopupState(false);
});
// When the lyrics are displayed on the page
window.addEventListener('beforeunload', () => {
  if (document.pictureInPictureElement) setPopupState(false);
});

// safari not support media session, pip contorl video
video.addEventListener('play', () => {
  audio?.play();
});
video.addEventListener('pause', () => {
  audio?.pause();
});

document.createElement = function<K extends keyof HTMLElementTagNameMap>(tagName: K, options: ElementCreationOptions) {
  const element = createElement(tagName, options);
  if (tagName === 'video') {
    if (!audio) {
      audio = element as HTMLAudioElement;
      audio.addEventListener('playing', async () => {
        const isMusic = audio?.duration && audio.duration > 2 * 60 && audio.duration < 4 * 60;
        if (isMusic && !(await getLyricsBtn())) {
          captureException(new Error('Lyrics button not found'));
        }
      });
      // when next track
      audio.addEventListener('emptied', () => {
        sharedData.removeLyrics();
      });
      if (navigator.mediaSession) {
        const mediaSession = navigator.mediaSession;
        audio.addEventListener('play', () => {
          video.play();
          mediaSession.playbackState = 'playing';
        });
        audio.addEventListener('pause', () => {
          video.pause();
          mediaSession.playbackState = 'paused';
        });
      }
    } else {
      // ignore spotify pip video
    }
  }
  return element;
};

window.addEventListener('load', () => {
  setTimeout(() => {
    if (!audio) {
      captureException(new Error('Audio not found'));
    }
  }, 3000);
});

export { video, audio };
