import { browser } from 'webextension-polyfill-ts';

import { Message, Event, Options, isWebApp } from '../common/consts';

const uiLanguage = browser.i18n.getUILanguage();

const defaultOptions: Options = {
  cid: `${Date.now()}-${Math.random()}`,
  'only-cover': 'off',
  'hd-cover': 'filter' in CanvasRenderingContext2D.prototype ? 'off' : 'on',
  'clean-lyrics': 'on',
  'show-on': 'pip',
  'lyrics-align': 'left',
  'font-size': '48',
  'use-unreviewed-lyrics': 'on',
  'toggle-shortcut': 'l',
  'traditional-chinese-lyrics': uiLanguage === 'zh-TW' || uiLanguage === 'zh-HK' ? 'on' : 'off',
};

export async function getOptions() {
  const options = (await browser.storage.sync.get(defaultOptions)) as Options;
  if (options.cid === defaultOptions.cid) {
    await browser.storage.sync.set({ cid: options.cid });
  }
  return options;
}

export async function updateOptions(value: Partial<Options>) {
  await browser.storage.sync.set(value);
  const options = await getOptions();
  if (isWebApp) {
    window.postMessage({ type: Event.SEND_OPTIONS, data: await getOptions() }, '*');
  } else {
    const manifest = browser.runtime.getManifest() as typeof import('../../public/manifest.json');
    const tabs = await browser.tabs.query({ url: manifest.content_scripts[0].matches });
    tabs.forEach((tab) => {
      if (tab.id) {
        browser.tabs.sendMessage(tab.id, {
          type: Event.SEND_OPTIONS,
          data: options,
        } as Message);
      }
    });
  }
  return options;
}
