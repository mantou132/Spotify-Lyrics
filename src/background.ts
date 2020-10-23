import { browser } from 'webextension-polyfill-ts';
import * as Sentry from '@sentry/browser';

import { Message, Event, ContextItems, isProd, VERSION } from './common/consts';
import { getOptions } from './options/store';
import { i18n, i18nMap } from './i18n';
declare global {
  interface Window {
    Sentry?: typeof Sentry;
  }
}

// popup, options, contentpage share a Sentry instance
// the submitted error event environment is background_page, such as console

window.Sentry = Sentry;
Sentry.init({
  dsn: 'https://124df8398d8b466fbcf09ec64bcfe144@o55145.ingest.sentry.io/5353517',
  release: VERSION,
  environment: isProd ? 'prod' : 'dev',
});
getOptions().then(({ cid }) => Sentry.setUser({ id: cid }));

function disableBrowserAction() {
  browser.browserAction.disable();
  browser.browserAction.setTitle({ title: i18n.actionDisableTitle() });
}

function enableBrowserAction() {
  browser.browserAction.enable();
  browser.browserAction.setTitle({ title: i18n.actionEnableTitle() });
}

disableBrowserAction();

browser.runtime.onMessage.addListener((msg: Message) => {
  const { type, data } = msg || {};
  if (type === Event.GET_OPTIONS) {
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Parameters
    return getOptions().then((options) => ({
      ...options,
      i18nMap,
    }));
  }
  if (type === Event.POPUP_ACTIVE) {
    if (data === true) {
      enableBrowserAction();
    } else {
      disableBrowserAction();
    }
  }
  // breadcrumb and exception are cumulative
  if (type === Event.CAPTURE_EXCEPTION) {
    const err = new Error(data.message);
    err.name = data.name;
    err.stack = data.stack;
    window.Sentry?.captureException(err, {
      extra: data.extra,
    });
  }
});

browser.runtime.setUninstallURL('https://forms.gle/bUWyEqfSTCU9NEwEA');

browser.contextMenus.create({
  id: ContextItems.WELCOME,
  title: i18n.menusWelcome(),
  contexts: ['browser_action'],
});

browser.contextMenus.create({
  id: ContextItems.FEEDBACK,
  title: i18n.menusFeedback(),
  contexts: ['browser_action'],
});

async function getRateMeLink() {
  const linkMap: Record<string, string> = {
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/spotify-lyrics/',
    chrome:
      'https://chrome.google.com/webstore/detail/spotify-lyrics/mkjfooclbdgjdclepjeepbmmjaclipod',
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

getRateMeLink().then((link) => {
  if (link) {
    browser.contextMenus.create({
      id: ContextItems.RATE_ME,
      title: i18n.menusRateMe(),
      contexts: ['browser_action'],
    });
  }
});

const openPage = async (url: string) => {
  const { windowId } = await browser.tabs.create({ url });
  if (windowId) browser.windows.update(windowId, { focused: true });
};

browser.contextMenus.onClicked.addListener(async function (info) {
  switch (info.menuItemId) {
    case ContextItems.WELCOME:
      openPage(browser.runtime.getURL('welcome.html'));
      break;
    case ContextItems.FEEDBACK:
      openPage('https://github.com/mantou132/Spotify-Lyrics/issues');
      break;
    case ContextItems.RATE_ME:
      openPage(await getRateMeLink());
      break;
  }
});

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    openPage(browser.runtime.getURL('welcome.html'));
  }
});
