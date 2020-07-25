import { Message, Event } from '../common/consts';

import { sharedData } from './share-data';
import { captureException } from './utils';
import { getLyricsBtn } from './btn';
import { loggedPromise } from './observer';
import config from './config';

export const video = document.createElement('video');

video.muted = true;
video.width = 640;
video.height = 640;

export const canvas = document.createElement('canvas');
canvas.width = video.width;
canvas.height = video.height;
canvas.getContext('2d');
video.srcObject = canvas.captureStream();

export const videoMetadataloaded = new Promise(res => {
  video.addEventListener('loadedmetadata', () => res());
});

const setPopupState = (active: boolean) => {
  const msg: Message = { type: Event.POPUP_ACTIVE, data: active };
  window.postMessage(msg, '*');
};

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

export const audioPromise = new Promise<HTMLAudioElement>(res => {
  let audio: HTMLAudioElement | null = null;

  const createElement: typeof document.createElement = document.createElement.bind(document);

  document.createElement = function<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options: ElementCreationOptions,
  ) {
    const element = createElement(tagName, options);
    if (tagName === 'video' && !audio) {
      audio = element as HTMLAudioElement;
      res(audio);
    }
    return element;
  };

  window.addEventListener('load', () => {
    setTimeout(async () => {
      if (!audio) {
        const { AUDIO_SELECTOR } = await config;
        const audioSelected = document.querySelector(AUDIO_SELECTOR);
        if (audioSelected) {
          return res(audioSelected as HTMLAudioElement);
        }
        await loggedPromise;
        captureException(new Error('Audio not found'));
      }
    }, 3000);
  });
});

audioPromise.then(audio => {
  // safari not support media session, pip contorl video
  video.addEventListener('play', () => {
    audio.play();
  });
  video.addEventListener('pause', () => {
    audio.pause();
  });

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
});
