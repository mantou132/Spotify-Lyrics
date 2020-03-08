import { browser } from 'webextension-polyfill-ts';

import { Message, Event } from './consts';
const script = document.createElement('script');
// Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
script.src = browser.runtime.getURL('page.js');
// "run_at": "document_start"
// Firefox have `<head>`, Chrome have't.
document.documentElement.append(script);

window.addEventListener('message', ({ data }) => {
  if (data?.type === Event.SEND_SONGS) {
    browser.runtime.sendMessage(data);
  }
});

browser.runtime.onMessage.addListener((msg: Message) => {
  window.postMessage(msg, '*');
});
