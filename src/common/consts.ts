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
}

// Store in extension localStorage
export const LocalStorageKeys = {
  CONFIG: 'config',
};

type Keys<T> = {
  [K in keyof T]: string;
};

export const I18nMsgKeys = Object.keys(i18nEnMessages).reduce((p, c: keyof typeof i18nEnMessages) => {
  p[c] = c;
  return p;
}, {} as Keys<typeof i18nEnMessages>);
