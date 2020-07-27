import type { Value } from '../options/elements/switch';

export const isProd = process.env.NODE_ENV === 'production';

export interface Message<T = any> {
  type: Event;
  data?: T;
}

export enum Event {
  GET_SONGS = 'get-songs',
  SEND_SONGS = 'send-songs',
  SELECT_SONG = 'select-song',
  CONFIRMED_SONG = 'confirmed-song',
  GET_OPTIONS = 'get-options',
  SEND_OPTIONS = 'send-options',
  POPUP_ACTIVE = 'popup-active',
  CAPTURE_EXCEPTION = 'capture-exception',
}

export const ContextItems = {
  FEEDBACK: 'feedback',
  RATE_ME: 'rate-me',
};

// Store in extension localStorage
export const LocalStorageKeys = {
  CONFIG: 'config',
};

export const LyricsPositions = ['page', 'pip'] as const;
export interface Options {
  'font-size': number;
  'lyrics-smooth-scroll': Value;
  'only-cover': Value;
  'clean-lyrics': Value;
  'show-on': typeof LyricsPositions[number];
  cid: string;
}

export const isSupportES2018RegExp = (() => {
  try {
    /xx/su;
    return true;
  } catch {
    return false;
  }
})();

export const USER_SELECT_USE_LOCAL = true;
