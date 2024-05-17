import browser from 'webextension-polyfill';
import * as Sentry from '@sentry/browser';

import {
  Message,
  Event,
  ContextItems,
  isProd,
  VERSION,
  isFirefox,
  isRateTest,
} from './common/constants';
import { sendMessage } from './common/bg';
import { getOptions } from './options/store';
import { i18n, i18nMap } from './i18n';
import type { Req, Res } from './page/request';

// popup, options, content page share a Sentry instance
// the submitted error event environment is background_page, such as console

Sentry.init({
  dsn: 'https://124df8398d8b466fbcf09ec64bcfe144@o55145.ingest.sentry.io/5353517',
  release: VERSION,
  environment: isProd ? 'prod' : 'dev',
});
getOptions().then(({ cid }) => Sentry.setUser({ id: cid }));

function disableBrowserAction() {
  browser.action.disable();
  browser.action.setTitle({ title: i18n.actionDisableTitle() });
}

function enableBrowserAction() {
  browser.action.enable();
  browser.action.setTitle({ title: i18n.actionEnableTitle() });
}

// enable on page message
disableBrowserAction();

browser.runtime.onMessage.addListener(async (msg: Message, sender) => {
  const { type, data } = msg || {};
  switch (type) {
    case Event.GET_OPTIONS: {
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Parameters
      return getOptions().then((options) => ({
        ...options,
        i18nMap,
      }));
    }
    case Event.POPUP_ACTIVE: {
      if (data === true) {
        enableBrowserAction();
      } else {
        disableBrowserAction();
      }
      return;
    }
    // breadcrumb and exception are cumulative
    case Event.CAPTURE_EXCEPTION: {
      const err = new Error(data.message);
      err.name = data.name;
      err.stack = data.stack;
      Sentry?.captureException(err, {
        extra: data.extra,
      });
      return;
    }
    case Event.SEND_REQUEST: {
      const { reqId, uri, options } = data as Req;
      const tabId = sender.tab?.id;
      if (!tabId) return;

      const sendRes = (data: Omit<Res, 'reqId'>) => {
        sendMessage<Res>(tabId, { type: Event.SEND_RESPONSE, data: { reqId, ...data } });
      };
      try {
        const res = await fetch(uri, options);
        if (res.status === 0) throw 'Request fail';
        if (res.status >= 400) throw res.statusText;
        const res2 = res.clone();
        let result: any;
        try {
          result = await res.json();
        } catch {
          result = await res2.text();
        }
        sendRes({ ok: true, data: result });
      } catch (err) {
        sendRes({ ok: false, data: String(err) });
      }
      return;
    }
  }
});

browser.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'toggle': {
      return sendMessage({ type: Event.TOGGLE });
    }
  }
});

browser.runtime.setUninstallURL('https://forms.gle/bUWyEqfSTCU9NEwEA');

browser.contextMenus.create({
  id: ContextItems.WELCOME,
  title: i18n.menusWelcome(),
  contexts: ['action'],
});

browser.contextMenus.create({
  id: ContextItems.FEEDBACK,
  title: i18n.menusFeedback(),
  contexts: ['action'],
});

const storeLinkMap: Record<string, string> = {
  '{d5bcc68d-856a-41e2-8021-d4c51f3b8e4a}':
    'https://addons.mozilla.org/en-US/firefox/addon/spotify-lyrics/',
  '{9bbdd06f-4fe2-4d05-8c2d-1ef6bf71f84d}': 'https://github.com/mantou132/Spotify-Lyrics',
  mkjfooclbdgjdclepjeepbmmjaclipod:
    'https://chrome.google.com/webstore/detail/spotify-lyrics/mkjfooclbdgjdclepjeepbmmjaclipod/reviews',
  aiehldpoaeaidnljjimhbojpblkbembm:
    'https://microsoftedge.microsoft.com/addons/detail/spotify-lyrics/aiehldpoaeaidnljjimhbojpblkbembm',
};
if (storeLinkMap[browser.runtime.id]) {
  browser.contextMenus.create({
    id: ContextItems.RATE_ME,
    title: i18n.menusRateMe(),
    contexts: ['action'],
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

if (isProd && !isFirefox) {
  browser.scripting
    .registerContentScripts([
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        world: 'MAIN',
        id: 'page',
        runAt: 'document_start',
        matches: browser.runtime.getManifest().content_scripts![0].matches,
        js: [isRateTest ? 'page/rate.js' : 'page/index.js'],
      },
    ])
    .catch(() => {
      //
    });
}
