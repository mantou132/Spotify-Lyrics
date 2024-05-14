import browser from 'webextension-polyfill';

import { Event, isProd, type Message } from './constants';

export function sendMessage<T>(tabId: number, msg: Message<T>): void;
export function sendMessage<T>(msg: Message<T>): void;
export function sendMessage<T>(tabIdOrMsg: number | Message<T>, msg?: Message<T>) {
  if (typeof tabIdOrMsg === 'number') {
    browser.tabs.sendMessage(tabIdOrMsg, msg);
  } else {
    browser.tabs
      .query({ url: browser.runtime.getManifest().content_scripts![0].matches })
      .then((tabs) => {
        tabs.forEach((tab) => {
          // Only the tab that open the lyrics will response
          if (tab?.id) browser.tabs.sendMessage(tab.id, tabIdOrMsg);
        });
      });
  }
}

export function captureException({ error }: ErrorEvent, extra?: any) {
  if (!isProd) console.error(error, extra);
  const msg: Message = {
    type: Event.CAPTURE_EXCEPTION,
    data: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      extra: { href: location.href, ...extra },
    },
  };
  browser.runtime.sendMessage(msg);
}
