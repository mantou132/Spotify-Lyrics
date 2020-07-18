import i18nEnMessages from '../../public/_locales/en/messages.json';

export interface Message<T = any> {
  type: Event;
  data?: T;
}

export enum Event {
  RELOAD_SPOTIFY = 'reload-spotify',
  GET_SONGS = 'get-songs',
  SEND_SONGS = 'send-songs',
  SELECT_SONG = 'select-song',
  GET_OPTIONS = 'get-options',
  SEND_OPTIONS = 'send-options',
  POPUP_ACTIVE = 'popup-active',
}

// Store in extension localStorage
export const LocalStorageKeys = {
  CONFIG: 'config',
};

export const LyricsPositions = ['page', 'pip'] as const;
type CheckboxValue = 'on' | 'off';
export interface Options {
  'lyrics-smooth-scroll': CheckboxValue;
  'strict-mode': CheckboxValue;
  'only-cover': CheckboxValue;
  'clean-lyrics': CheckboxValue;
  'show-on': typeof LyricsPositions[number];
  cid: string;
}

type Keys<T> = {
  [K in keyof T]: string;
};

export const I18nMsgKeys = Object.keys(i18nEnMessages).reduce((p, c: keyof typeof i18nEnMessages) => {
  p[c] = c;
  return p;
}, {} as Keys<typeof i18nEnMessages>);

export const isSupportES2018RegExp = (function() {
  try {
    /xx/su;
    return true;
  } catch {
    return false;
  }
})();
