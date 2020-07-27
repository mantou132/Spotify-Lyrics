import { browser } from 'webextension-polyfill-ts';

import i18nEnMessages from '../public/_locales/en/messages.json';

type Keys<T> = {
  [K in keyof T]: (...rest: string[]) => string;
};

export const i18n = Object.keys(i18nEnMessages).reduce((p, c: keyof typeof i18nEnMessages) => {
  p[c] = (...rest) => browser.i18n.getMessage(c, ...rest);
  return p;
}, {} as Keys<typeof i18nEnMessages>);
