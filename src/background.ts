import { browser } from 'webextension-polyfill-ts';

import { Message, Event } from './common/consts';
import { Options } from './options/store';

browser.browserAction.disable();

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg?.type === Event.GET_OPTIONS) {
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Parameters
    return Promise.resolve(Options.init());
  }
  if (msg?.type === Event.POPUP_ACTIVE) {
    if (msg.data === true) {
      browser.browserAction.enable();
    } else {
      browser.browserAction.disable();
    }
  }
});
