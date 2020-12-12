import { Message, Event } from '../common/consts';

import { captureException, documentQueryHasSelector } from './utils';
import { getLyricsBtn } from './btn';
import { loggedPromise } from './observer';
import config, { currentPlatform, localConfig } from './config';

export const lyricVideo = document.createElement('video');
lyricVideo.muted = true;
lyricVideo.width = 640;
lyricVideo.height = 640;

export let lyricVideoIsOpen = false;

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
  lyricVideoIsOpen = true;
});
lyricVideo.addEventListener('leavepictureinpicture', () => {
  setPopupState(false);
  lyricVideoIsOpen = false;
});
// When the lyrics are displayed on the page
window.addEventListener('beforeunload', () => {
  if (lyricVideoIsOpen) setPopupState(false);
});

export const audioPromise = new Promise<HTMLAudioElement>((resolveAudio) => {
  let audio: HTMLAudioElement | null = null;

  const createElement: typeof document.createElement = document.createElement.bind(document);

  const elementCountOverrideBefore = document.querySelectorAll('*').length;
  const hrefOverrideBefore = location.href;

  if (!localConfig.USE_AUDIO_SELECTOR) {
    // Spotify: using `document.createElement`
    document.createElement = function <K extends keyof HTMLElementTagNameMap>(
      tagName: K,
      options: ElementCreationOptions,
    ) {
      const element = createElement(tagName, options);
      // Spotify: <video>
      // Deezer: <audio>
      if ((tagName === 'video' || tagName === 'audio') && !audio) {
        performance.measure('capture_audio_element');
        audio = element as HTMLAudioElement;
        resolveAudio(audio);
      }
      return element;
    };
  }

  // Youtube Music: without using `document.createElement`
  // Apple Music
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

  // Apple music does not insert audio elements by default
  if (currentPlatform !== 'APPLE') {
    // Check if audio is found normally
    // Spotify: login required
    Promise.all([loggedPromise, new Promise((res) => window.addEventListener('load', res))]).then(
      () => {
        const loadedTime = performance.now();
        setTimeout(() => {
          if (!audio) {
            captureException(new Error('Audio not found'), {
              // Provide some information that can tell if the extension is working properly
              hrefOverrideBefore,
              elementCountOverrideBefore,
              elementCount: document.querySelectorAll('*').length,
              loadedTime,
            });
          }
        }, 5_000);
      },
    );
  }
});

audioPromise.then((audio) => {
  let reported = false;
  audio.addEventListener('playing', async () => {
    const isMusic = audio.duration && audio.duration > 2.6 * 60 && audio.duration < 4 * 60;
    if (!reported && isMusic && !(await getLyricsBtn())) {
      reported = true;
      const { BTN_WRAPPER_SELECTOR, BTN_LIKE_SELECTOR, TRACK_NAME_SELECTOR } = await config;
      captureException(new Error('Lyrics button not found'), {
        duration: audio.duration,
        TRACK_NAME: document.querySelector(TRACK_NAME_SELECTOR)?.textContent,
        BTN_WRAPPER: !!document.querySelector(BTN_WRAPPER_SELECTOR),
        BTN_LIKE: !!documentQueryHasSelector(BTN_LIKE_SELECTOR),
      });
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
