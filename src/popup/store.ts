import { browser } from 'webextension-polyfill-ts';
import { createStore, updateStore } from '@mantou/gem';

import { Event, Message } from '../consts';

import { SharedData } from '../page/lyrics';

export const store = createStore<SharedData>({
  list: [],
  id: 0,
});

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg?.type === Event.SEND_SONGS) {
    updateStore(store, msg.data);
  }
});

const getLyricsMsg: Message = { type: Event.GET_SONGS };
browser.runtime.sendMessage(getLyricsMsg);
