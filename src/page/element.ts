import { Message, Event } from '../common/consts';

import { captureException } from './utils';
import { getLyricsBtn } from './btn';
import { loggedPromise } from './observer';
import config from './config';

export const lyricVideo = document.createElement('video');
lyricVideo.muted = true;
lyricVideo.width = 640;
lyricVideo.height = 640;

export const lyricCanvas = document.createElement('canvas');
lyricCanvas.width = lyricVideo.width;
lyricCanvas.height = lyricVideo.height;
export const lyricCtx = lyricCanvas.getContext('2d')!;
// Firefox Issue: NS_ERROR_NOT_INITIALIZED
// https://bugzilla.mozilla.org/show_bug.cgi?id=1572422
lyricVideo.srcObject = lyricCanvas.captureStream();
// Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': Metadata for the video element are not loaded yet.
// Ensure that the lyrics button can be clicked
lyricCtx.fillRect(0, 0, 1, 1);
lyricVideo.play();

export const coverCanvas = document.createElement('canvas');
coverCanvas.width = lyricVideo.width;
coverCanvas.height = lyricVideo.height;
export const coverCtx = coverCanvas.getContext('2d')!;

export const coverHDCanvas = document.createElement('canvas');
coverHDCanvas.width = lyricVideo.width;
coverHDCanvas.height = lyricVideo.height;
export const coverHDCtx = coverHDCanvas.getContext('2d')!;

const setPopupState = (active: boolean) => {
  const msg: Message = { type: Event.POPUP_ACTIVE, data: active };
  window.postMessage(msg, '*');
};

lyricVideo.addEventListener('enterpictureinpicture', () => {
  setPopupState(true);
});
lyricVideo.addEventListener('leavepictureinpicture', () => {
  setPopupState(false);
});
// When the lyrics are displayed on the page
window.addEventListener('beforeunload', () => {
  if (document.pictureInPictureElement) setPopupState(false);
});

export const audioPromise = new Promise<HTMLAudioElement>((resolveAudio) => {
  let audio: HTMLAudioElement | null = null;

  const createElement: typeof document.createElement = document.createElement.bind(document);

  // Spotify: using `document.createElement`
  document.createElement = function <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options: ElementCreationOptions,
  ) {
    const element = createElement(tagName, options);
    if (tagName === 'video' && !audio) {
      audio = element as HTMLAudioElement;
      resolveAudio(audio);
    }
    return element;
  };

  // Youtube Music: without using `document.createElement`
  const queryAudio = async () => {
    const { AUDIO_SELECTOR } = await config;
    const element = document.querySelector(AUDIO_SELECTOR);
    if (element) {
      audio = element as HTMLAudioElement;
      resolveAudio(audio);
    } else {
      setTimeout(queryAudio, 100);
    }
  };
  queryAudio();

  // Check if audio is found normally
  // Spotify: login required
  Promise.all([loggedPromise, new Promise((res) => window.addEventListener('load', res))]).then(
    () => {
      setTimeout(() => {
        if (!audio) captureException(new Error('Audio not found'));
      }, 5_000);
    },
  );
});

audioPromise.then((audio) => {
  audio.addEventListener('playing', async () => {
    const isMusic = audio.duration && audio.duration > 2.6 * 60 && audio.duration < 4 * 60;
    if (isMusic && !(await getLyricsBtn())) {
      captureException(new Error('Lyrics button not found'));
    }
  });

  // safari not support media session, pip contorl video
  // safari turning off pip will also cause the video to pause
  let time = performance.now();
  lyricVideo.addEventListener('pause', () => {
    const now = performance.now();
    if (now - time > 300) {
      time = now;
      audio.pause();
    }
  });
  lyricVideo.addEventListener('play', () => {
    // video need't seek, because it is stream
    audio.play();
  });

  if (navigator.mediaSession) {
    const mediaSession = navigator.mediaSession;
    audio.addEventListener('play', () => {
      lyricVideo.play();
      mediaSession.playbackState = 'playing';
    });
    audio.addEventListener('pause', () => {
      lyricVideo.pause();
      mediaSession.playbackState = 'paused';
    });
  }
});
