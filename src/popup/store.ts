import { browser } from 'webextension-polyfill-ts';
import { createStore, updateStore } from '@mantou/gem';

import { Event, Message } from '../common/constants';
import { sendMessage } from '../common/bg';

import type { Song } from '../page/lyrics';

export interface PopupStore {
  // current track name
  name: string;
  // current track artists
  artists: string;
  // current matched lyrics track id
  id: number;
  // auto matched lyrics track id
  aId: number;
  // lyrics track list
  list: Song[];
}

export const store = createStore<PopupStore>({
  name: '',
  artists: '',
  list: [],
  id: 0,
  aId: 0,
});

export function changeSong(id: number) {
  updateStore(store, { id });

  const msg: Message<PopupStore> = {
    type: Event.SELECT_SONG,
    data: store,
  };
  sendMessage(msg);
}

export function cancelMId() {
  updateStore(store, { id: store.aId });

  const msg: Message<PopupStore> = {
    type: Event.SELECT_SONG,
    data: store,
  };
  sendMessage(msg);
}

export function confirmedMId() {
  sendMessage({ type: Event.CONFIRMED_SONG });
  setTimeout(window.close, 300);
}

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg?.type === Event.SEND_SONGS) {
    updateStore(store, msg.data);
  }
});

sendMessage({ type: Event.GET_SONGS });
