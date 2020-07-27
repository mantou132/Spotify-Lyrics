import { browser } from 'webextension-polyfill-ts';

import { Message, Event } from './common/consts';

window.addEventListener('message', ({ data }) => {
  if (data?.type === Event.SEND_SONGS) {
    browser.runtime.sendMessage(data).catch(() => {
      //
    });
  }
});

browser.runtime.onMessage.addListener((msg: Message) => {
  window.postMessage(msg, '*');
});

window.addEventListener('message', ({ data }) => {
  if (data?.type === Event.GET_OPTIONS) {
    browser.runtime
      .sendMessage(data)
      .then((options) => {
        window.postMessage({ type: Event.SEND_OPTIONS, data: options }, '*');
      })
      .catch(() => {
        //
      });
  }
  if (data?.type === Event.POPUP_ACTIVE || data?.type === Event.CAPTURE_EXCEPTION) {
    browser.runtime.sendMessage(data);
  }
});

const script = document.createElement('script');
// Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
script.src = browser.runtime.getURL('page.js');
// "run_at": "document_start"
// The head element may not exist
document.documentElement.append(script);
