import { Event, Message, Options } from '../common/consts';
// The I18n Extension API cannot be used directly in the webpage
import type { i18nMap } from '../i18n';

export type OptionsAndI18n = Options & { i18nMap: typeof i18nMap };

const options = {} as OptionsAndI18n;

export const optionsPromise = new Promise<OptionsAndI18n>((res) => {
  // get config from content script
  window.postMessage({ type: Event.GET_OPTIONS } as Message, '*');
  window.addEventListener('message', ({ data }) => {
    const msg = data as Message<OptionsAndI18n> | null;
    if (msg?.type === Event.SEND_OPTIONS) {
      Object.assign(options, msg.data);
      // promise only completed once
      res(options);
    }
  });
});
