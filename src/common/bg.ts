import { browser } from 'webextension-polyfill-ts';

import type { Message } from '../common/constants';

export function sendMessage<T>(tabId: number, msg: Message<T>): void;
export function sendMessage<T>(msg: Message<T>): void;
export function sendMessage<T>(tabIdOrMsg: number | Message<T>, msg?: Message<T>) {
  if (typeof tabIdOrMsg === 'number') {
    browser.tabs.sendMessage(tabIdOrMsg, msg);
  } else {
    const manifest = browser.runtime.getManifest() as typeof import('../../public/manifest.json');
    browser.tabs.query({ url: manifest.content_scripts[0].matches }).then((tabs) => {
      tabs.forEach((tab) => {
        // Only the tab that open the lyrics will response
        if (tab?.id) browser.tabs.sendMessage(tab.id, tabIdOrMsg);
      });
    });
  }
}
