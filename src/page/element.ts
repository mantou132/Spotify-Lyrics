import { Message, Event, isProd } from '../common/constants';

import {
  captureException,
  documentQueryHasSelector,
  isValidSelector,
  querySelector,
} from './utils';
import { getLyricsBtn } from './btn';
import { loggedPromise } from './observer';
import { configPromise, currentPlatform, localConfig } from './config';
import { tryParseTimeStr } from './lyrics';

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
  lyricVideoIsOpen = true;
});
lyricVideo.addEventListener('leavepictureinpicture', () => {
  lyricVideoIsOpen = false;
  lyricVideo.remove();
});

// service worker active will disabled browser action
setInterval(() => setPopupState(lyricVideoIsOpen), 1000);

// When the lyrics are displayed on the page
window.addEventListener('beforeunload', () => {
  if (lyricVideoIsOpen) setPopupState(false);
});

let audio: HTMLAudioElement | null = null;

const audioData = new WeakMap<
  HTMLAudioElement,
  { updateTime: number; currentTime: number; oldAudio?: HTMLAudioElement | null }
>();

const firstAudioPromise = new Promise<HTMLAudioElement>((resolveAudio) => {
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
      if ((tagName === 'video' || tagName === 'audio') && !audio) {
        if (!isProd) console.log('capture_audio_element', element);
        performance.measure('capture_audio_element');
        audio = element as HTMLAudioElement;
        handleAudio(audio);
        resolveAudio(audio);
      }
      return element;
    };
  }

  // Spotify(or all player fallback method?) other device
  const queryOtherDeviceMockAudio = async () => {
    const { OTHER_DEVICE, OTHER_DEVICE_TOTAL, OTHER_DEVICE_CURRENT } = await configPromise;
    if (!isValidSelector(OTHER_DEVICE)) return;
    const playInOtherDevice = querySelector(OTHER_DEVICE);
    const totalStr = querySelector(OTHER_DEVICE_TOTAL)?.textContent;
    const currentStr = querySelector(OTHER_DEVICE_CURRENT)?.textContent;
    const data = audio && audioData.get(audio);
    if (playInOtherDevice && totalStr && currentStr) {
      const { time: currentTime } = tryParseTimeStr(currentStr);
      const { time: duration } = tryParseTimeStr(totalStr);
      const updateTime = (data?.currentTime === currentTime && data.updateTime) || Date.now();
      const offset = (Date.now() - updateTime) / 1000;
      const oldAudio = data?.oldAudio || audio;
      audio = {
        ...audio,
        addEventListener: (..._: any) => void 0,
        currentSrc: 'mock',
        currentTime: currentTime + (offset > 1 ? 0 : offset),
        duration,
      } as HTMLAudioElement;
      audioData.set(audio, { currentTime, updateTime, oldAudio });
    }
    if (playInOtherDevice) {
      requestAnimationFrame(queryOtherDeviceMockAudio);
    } else {
      audio = data?.oldAudio || null;
      setTimeout(queryOtherDeviceMockAudio, 1000);
    }
  };
  queryOtherDeviceMockAudio();

  // Youtube Music: without using `document.createElement`
  // Apple Music
  const queryAudio = async () => {
    const { AUDIO_SELECTOR } = await configPromise;
    if (!isValidSelector(AUDIO_SELECTOR)) return;
    const element = querySelector(AUDIO_SELECTOR);
    if (element) {
      audio = element as HTMLAudioElement;
      handleAudio(audio);
      resolveAudio(audio);
    } else {
      setTimeout(queryAudio, 100);
    }
  };
  queryAudio();

  if (currentPlatform === 'DEEZER') {
    const A = Audio;
    (window as any).Audio = class {
      constructor(src?: string) {
        const element = new A(src);
        element.addEventListener('play', () => {
          audio = element;
          handleAudio(audio);
          resolveAudio(audio);
        });
        return element;
      }
    };
  }

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

/**
 * Some platforms (such as Deezer) keep changing Audio
 */
export async function getCurrentAudio() {
  return audio || firstAudioPromise;
}

let reported = false;
function handleAudio(audio: HTMLAudioElement) {
  audio.addEventListener('playing', async () => {
    const isMusic = audio.duration && audio.duration > 2.6 * 60 && audio.duration < 4 * 60;
    if (!reported && isMusic && !(await getLyricsBtn())) {
      reported = true;
      const { BTN_WRAPPER_SELECTOR, BTN_LIKE_SELECTOR, TRACK_NAME_SELECTOR } = await configPromise;
      captureException(new Error('Lyrics button not found'), {
        duration: audio.duration,
        TRACK_NAME: querySelector(TRACK_NAME_SELECTOR)?.textContent,
        BTN_WRAPPER: !!querySelector(BTN_WRAPPER_SELECTOR),
        BTN_LIKE: !!documentQueryHasSelector(BTN_LIKE_SELECTOR),
      });
    }
  });

  audio.addEventListener('play', () => {
    lyricVideo.play();
    navigator.mediaSession.playbackState = 'playing';
  });

  audio.addEventListener('pause', () => {
    lyricVideo.pause();
    navigator.mediaSession.playbackState = 'paused';
  });
}

// safari not support media session, pip control video
// safari turning off pip will also cause the video to pause
let time = performance.now();
lyricVideo.addEventListener('pause', () => {
  const now = performance.now();
  if (now - time > 300) {
    time = now;
    audio?.pause();
  }
});

lyricVideo.addEventListener('play', () => {
  // video need't seek, because it is stream
  audio?.play();
});
