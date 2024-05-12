import { browser } from 'webextension-polyfill-ts';

import { Message, Event, isProd } from './common/constants';

browser.runtime.onMessage.addListener((msg: Message) => {
  window.postMessage(msg, '*');
});

window.addEventListener('message', ({ data }) => {
  const { type } = data || {};
  switch (type) {
    case Event.GET_OPTIONS: {
      return browser.runtime
        .sendMessage(data)
        .then((options) => {
          window.postMessage({ type: Event.SEND_OPTIONS, data: options }, '*');
        })
        .catch(() => {
          //
        });
    }
    case Event.SEND_REQUEST:
    case Event.POPUP_ACTIVE:
    case Event.CAPTURE_EXCEPTION:
    case Event.SEND_SONGS: {
      return browser.runtime.sendMessage(data).catch(() => {
        //
      });
    }
  }
});

declare let __webpackReplaceWithChunk__: (chunk: string) => string;

const script = document.createElement('script');
if (!isProd || browser.runtime.getURL('').startsWith('moz')) {
  // Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
  script.src = browser.runtime.getURL('page.js');
} else {
  script.textContent = __webpackReplaceWithChunk__('page');
}
// "run_at": "document_start"
// The head element may not exist
document.documentElement.append(script);
script.remove();
