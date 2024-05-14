import browser from 'webextension-polyfill';

import i18nEnMessages from '../public/_locales/en/messages.json';

type Keys<T> = {
  [K in keyof T]: (...rest: string[]) => string;
};
/**
 * @example
 * ```ts
 * const extensionName = i18n.extensionName()
 * ```
 */
export const i18n = Object.keys(i18nEnMessages).reduce(
  (p, c: keyof typeof i18nEnMessages) => {
    p[c] = (...rest) => browser.i18n.getMessage(c, ...rest);
    return p;
  },
  {} as Keys<typeof i18nEnMessages>,
);

type KeysMap<T> = {
  [K in keyof T]: string;
};
/**
 * @example
 * ```ts
 * const extensionName = i18nMap.extensionName
 * ```
 */
export const i18nMap = Object.keys(i18nEnMessages).reduce(
  (p, c: keyof typeof i18nEnMessages) => {
    p[c] = browser.i18n.getMessage(c);
    return p;
  },
  {} as KeysMap<typeof i18nEnMessages>,
);
