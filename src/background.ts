import { browser } from 'webextension-polyfill-ts';

import { Message, Event } from './common/consts';
import { Options } from './common/options';

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab?.id) return;
  if (tab?.url?.match(/^https?:\/\/open.spotify.com\/.*/)) {
    browser.pageAction.show(tab.id);
  } else {
    browser.pageAction.hide(tab.id);
  }
});

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg?.type === Event.GET_OPTIONS) {
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Parameters
    return Promise.resolve(Options.init());
  }
});
