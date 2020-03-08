import { browser } from 'webextension-polyfill-ts';

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab?.id) return;
  if (tab?.url?.match(/^https?:\/\/open.spotify.com\/.*/)) {
    browser.pageAction.show(tab.id);
  } else {
    browser.pageAction.hide(tab.id);
  }
});
