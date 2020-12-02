import type { Value } from '../options/elements/switch';

// Read package.json `version` field
export const VERSION = process.env.VERSION || 'UNKNOWN';

export const isProd = process.env.NODE_ENV === 'production';
export const isWebApp = location.protocol.startsWith('http');

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
  OPEN_OPTIONS = 'open-options',
  POPUP_ACTIVE = 'popup-active',
  CAPTURE_EXCEPTION = 'capture-exception',
}

export const ContextItems = {
  FEEDBACK: 'feedback',
  RATE_ME: 'rate-me',
  WELCOME: 'welcome',
};

export const LyricsPositions = ['page', 'pip'] as const;
export const LyricsAlign = ['left', 'center'] as const;
export const LyricsFontFamily = ['sans-serif', 'serif', 'cursive'] as const;
export interface Options {
  cid: string;
  'font-size': string;
  'font-family': typeof LyricsFontFamily[number] | string;
  'toggle-shortcut': string;
  'only-cover': Value;
  'clean-lyrics': Value;
  'hd-cover': Value;
  'use-unreviewed-lyrics': Value;
  'show-on': typeof LyricsPositions[number];
  'lyrics-align': typeof LyricsAlign[number];
  'traditional-chinese-lyrics': Value;
  // Deprecated
  'lyrics-smooth-scroll'?: Value;
  'strict-mode'?: Value;
}

export type Platform = 'SPOTIFY' | 'YOUTUBE' | 'DEEZER' | 'TIDAL';
