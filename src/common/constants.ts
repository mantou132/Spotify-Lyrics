import type { SwitchValue } from '../options/elements/switch';

// Read package.json `version` field
export const VERSION = process.env.VERSION || 'UNKNOWN';

export const isProd = process.env.NODE_ENV === 'production';
export const isRateTest = process.env.TEST === 'rate';
export const isWebApp = location.protocol.startsWith('http');
export const isFirefox = navigator.userAgent.includes('Firefox');

export interface Message<T = any> {
  type: Event;
  data?: T;
}

export enum Event {
  GET_SONGS = 100000,
  SEND_SONGS,
  SELECT_SONG,
  CONFIRMED_SONG,
  GET_OPTIONS,
  SEND_OPTIONS,
  OPEN_OPTIONS,
  POPUP_ACTIVE,
  CAPTURE_EXCEPTION,
  SEND_REQUEST,
  SEND_RESPONSE,
  TOGGLE,
}

export enum ContextItems {
  FEEDBACK = 'feedback',
  RATE_ME = 'rate-me',
  WELCOME = 'welcome',
}

export const LyricsPositions = ['page', 'pip'] as const;
export const LyricsAlign = ['left', 'center'] as const;
export const LyricsFontFamily = ['CircularSp', 'Sans-Serif', 'Serif', 'Cursive'] as const;
export interface Options {
  cid: string;
  'font-size': string;
  'font-family': (typeof LyricsFontFamily)[number] | string;
  'toggle-shortcut': string;
  'only-cover': SwitchValue;
  'clean-lyrics': SwitchValue;
  'hd-cover': SwitchValue;
  'use-unreviewed-lyrics': SwitchValue;
  'show-on': (typeof LyricsPositions)[number];
  'lyrics-align': (typeof LyricsAlign)[number];
  'traditional-chinese-lyrics': SwitchValue;
  // Deprecated
  'lyrics-smooth-scroll'?: SwitchValue;
  'strict-mode'?: SwitchValue;
}

export type Platform = 'SPOTIFY' | 'YOUTUBE' | 'DEEZER' | 'TIDAL' | 'APPLE';
