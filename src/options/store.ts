import browser from 'webextension-polyfill';

import { sendMessage } from '../common/bg';
import { Event, Options, isWebApp, LyricsFontFamily } from '../common/constants';

const uiLanguage = browser.i18n.getUILanguage();

const defaultOptions: Options = {
  cid: `${Date.now()}-${Math.random()}`,
  'only-cover': 'off',
  'hd-cover': 'filter' in OffscreenCanvasRenderingContext2D.prototype ? 'off' : 'on',
  'clean-lyrics': 'on',
  'show-on': 'pip',
  'lyrics-align': 'left',
  'font-size': '48',
  'font-family': LyricsFontFamily[0],
  'use-unreviewed-lyrics': 'on',
  'toggle-shortcut': 'l',
  'traditional-chinese-lyrics': uiLanguage === 'zh-TW' || uiLanguage === 'zh-HK' ? 'on' : 'off',
  'lyrics-transform': 'Origin',
  'lyrics-server': 'NetEase',
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
    window.postMessage({ type: Event.SEND_OPTIONS, data: options }, '*');
  } else {
    sendMessage({ type: Event.SEND_OPTIONS, data: options });
  }
  return options;
}
