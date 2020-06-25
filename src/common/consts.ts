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
