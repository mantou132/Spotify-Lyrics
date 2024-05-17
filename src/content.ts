import { runtime } from 'webextension-polyfill';

import { Message, Event, isFirefox, isRateTest, isProd } from './common/constants';

runtime.onMessage.addListener((msg: Message) => {
  window.postMessage(msg, '*');
});

window.addEventListener('message', ({ data }) => {
  const { type } = data || {};
  switch (type) {
    case Event.GET_OPTIONS: {
      return runtime
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
      return runtime.sendMessage(data).catch(() => {
        //
      });
    }
  }
});

if (!isProd || isFirefox) {
  // Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
  const script = document.createElement('script');
  script.src = runtime.getURL(isRateTest ? 'page/rate.js' : 'page/index.js');
  document.documentElement.append(script);
  script.remove();
}
