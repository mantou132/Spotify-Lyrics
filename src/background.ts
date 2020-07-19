import { browser } from 'webextension-polyfill-ts';

import { Message, Event, I18nMsgKeys, ContextItems } from './common/consts';
import { getOptions } from './options/store';

browser.browserAction.disable();

browser.runtime.onMessage.addListener((msg: Message) => {
  if (msg?.type === Event.GET_OPTIONS) {
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Parameters
    return Promise.resolve(getOptions());
  }
  if (msg?.type === Event.POPUP_ACTIVE) {
    if (msg.data === true) {
      browser.browserAction.enable();
    } else {
      browser.browserAction.disable();
    }
  }
});

browser.runtime.setUninstallURL('https://forms.gle/bUWyEqfSTCU9NEwEA');

browser.contextMenus.create({
  id: ContextItems.FEEDBACK,
  title: browser.i18n.getMessage(I18nMsgKeys.menusFeedback),
  contexts: ['browser_action'],
});

async function getRateMeLink() {
  const linkMap: Record<string, string> = {
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/spotify-lyrics/',
    chrome: 'https://chrome.google.com/webstore/detail/spotify-lyrics/mkjfooclbdgjdclepjeepbmmjaclipod',
    safari: '',
  };
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getBrowserInfo
  if (browser.runtime.getBrowserInfo) {
    const { name } = await browser.runtime.getBrowserInfo();
    return linkMap[name.toLowerCase()] || '';
  }
  // contain Edge, Yandex, Opera...
  if (/chrome\/\d/i.test(navigator.userAgent)) {
    return linkMap.chrome;
  }
  if (/version\/.*safari\/.*/i.test(navigator.userAgent)) {
    return linkMap.safari;
  }
  return '';
}

getRateMeLink().then(link => {
  if (link) {
    browser.contextMenus.create({
      id: ContextItems.RATE_ME,
      title: browser.i18n.getMessage(I18nMsgKeys.menusRateMe),
      contexts: ['browser_action'],
    });
  }
});

browser.contextMenus.onClicked.addListener(async function(info) {
  switch (info.menuItemId) {
    case ContextItems.FEEDBACK:
      browser.tabs.create({
        url: 'https://github.com/mantou132/Spotify-Lyrics/issues',
      });
      break;
    case ContextItems.RATE_ME:
      browser.tabs.create({
        url: await getRateMeLink(),
      });
      break;
  }
});
