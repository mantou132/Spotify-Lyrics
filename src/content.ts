import { browser } from 'webextension-polyfill-ts';

import { ExtensionMessage, MessageCallType, ExtReplyPrefix, ExtMessageType } from './common';

window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  // Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
  script.src = browser.runtime.getURL('page.js');
  document.head.append(script);
});

async function getSimplified(s: string) {
  type Module = typeof import('chinese-conv');
  // Cannot use https://dev.jspm.io/chinese-conv
  // Firefox issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1536094
  // Chrome issue: CSP error despite `content_security_policy` set
  const module: Module = await import(/* webpackIgnore: true */ browser.runtime.getURL('chinese-conv.js'));
  const { sify } = module.default;
  return sify(s);
}

interface ExtensionMessageEvent extends MessageEvent {
  data: null | ExtensionMessage;
}

window.addEventListener('message', async ({ data }: ExtensionMessageEvent) => {
  if (data?.type === ExtMessageType) {
    console.log('message data:', data);
    if (data.call === MessageCallType.GET_SIMPLIFIED) {
      const result = await getSimplified(data.data as string);
      dispatchEvent(new CustomEvent(`${ExtReplyPrefix}${data.id}`, { detail: result }));
    }
  }
});
