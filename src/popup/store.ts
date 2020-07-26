import { browser } from 'webextension-polyfill-ts';
import { createStore, updateStore } from '@mantou/gem';

import { Event, Message, USER_SELECT_USE_LOCAL } from '../common/consts';

import { Song } from '../page/lyrics';

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

export function sendMessage(msg: Message) {
  const manifest = browser.runtime.getManifest() as typeof import('../../public/manifest.json');
  browser.tabs.query({ url: manifest.content_scripts[0].matches }).then(tabs => {
    tabs.forEach(tab => {
      // Only the tab that open the lyrics will response
      if (tab?.id) browser.tabs.sendMessage(tab.id, msg);
    });
  });
}

export function changeSong(id: number) {
  updateStore(store, { id, aId: USER_SELECT_USE_LOCAL ? id : store.aId });

  const msg: Message<PopupStore> = {
    type: Event.SELECT_SONG,
    data: store,
  };
  sendMessage(msg);
}

export function confirmedMId() {
  sendMessage({ type: Event.CONFIRMED_SONG });
}

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg?.type === Event.SEND_SONGS) {
    updateStore(store, msg.data);
  }
});

sendMessage({ type: Event.GET_SONGS });
