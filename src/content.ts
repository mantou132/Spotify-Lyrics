import { browser } from 'webextension-polyfill-ts';

import { Message, Event } from './common/consts';
import { Options } from './common/options';

const script = document.createElement('script');
// Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
script.src = browser.runtime.getURL('page.js');
// "run_at": "document_start"
// Firefox have `<head>`, Chrome have't.
document.documentElement.append(script);

window.addEventListener('message', ({ data }) => {
  if (data?.type === Event.SEND_SONGS) {
    browser.runtime.sendMessage(data).catch(() => {
      //
    });
  }
});

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg.type === Event.RELOAD_SPOTIFY) {
    location.reload();
  } else {
    window.postMessage(msg, '*');
  }
});

window.addEventListener('message', ({ data }) => {
  if (data?.type === Event.GET_OPTIONS) {
    browser.runtime
      .sendMessage(data)
      .then(options => {
        window.postMessage({ type: Event.SEND_OPTIONS, data: options }, '*');
      })
      .catch(() => {
        //
      });
  }
});
