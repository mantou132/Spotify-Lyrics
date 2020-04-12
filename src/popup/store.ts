import { browser } from 'webextension-polyfill-ts';
import { createStore, updateStore } from '@mantou/gem';

import { Event, Message } from '../common/consts';

import { SharedData } from '../page/lyrics';

export const store = createStore<SharedData>({
  name: '',
  artists: '',
  list: [],
  id: 0,
});

export function sendMessage(msg: Message) {
  browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    if (tab?.id) browser.tabs.sendMessage(tab.id, msg);
  });
}

export function changeSong(id: number) {
  const data: Message = {
    type: Event.SELECT_SONG,
    data: { id, name: store.name, artists: store.artists },
  };
  sendMessage(data);
}

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg?.type === Event.SEND_SONGS) {
    updateStore(store, msg.data);
  }
});

sendMessage({ type: Event.GET_SONGS });
