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

const storeLinkMap: Record<string, string> = {
  '{d5bcc68d-856a-41e2-8021-d4c51f3b8e4a}':
    'https://addons.mozilla.org/en-US/firefox/addon/spotify-lyrics/',
  mkjfooclbdgjdclepjeepbmmjaclipod:
    'https://chrome.google.com/webstore/detail/spotify-lyrics/mkjfooclbdgjdclepjeepbmmjaclipod/reviews',
  aiehldpoaeaidnljjimhbojpblkbembm:
    'https://microsoftedge.microsoft.com/addons/detail/spotify-lyrics/aiehldpoaeaidnljjimhbojpblkbembm',
};
if (storeLinkMap[browser.runtime.id]) {
  browser.contextMenus.create({
    id: ContextItems.RATE_ME,
    title: i18n.menusRateMe(),
    contexts: ['browser_action'],
  });
}

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
      openPage(storeLinkMap[browser.runtime.id]);
      break;
  }
});

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    openPage(browser.runtime.getURL('welcome.html'));
  }
});
