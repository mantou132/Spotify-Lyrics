import { browser } from 'webextension-polyfill-ts';

import { Message, Event, isProd } from './common/consts';

browser.runtime.onMessage.addListener((msg: Message) => {
  window.postMessage(msg, '*');
});

window.postMessage({ type: Event.GET_EXTURL, data: browser.runtime.getURL('dict') }, '*');

window.addEventListener('message', ({ data }) => {
  const { type } = data || {};
  if (type === Event.GET_OPTIONS) {
    browser.runtime
      .sendMessage(data)
      .then((options) => {
        window.postMessage({ type: Event.SEND_OPTIONS, data: options }, '*');
      })
      .catch(() => {
        //
      });
  }
  if (
    type === Event.SEND_REQUEST ||
    type === Event.POPUP_ACTIVE ||
    type === Event.CAPTURE_EXCEPTION ||
    type === Event.SEND_SONGS
  ) {
    browser.runtime.sendMessage(data).catch(() => {
      //
    });
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
