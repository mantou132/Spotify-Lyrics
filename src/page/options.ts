import { Event, Message, Options } from '../common/consts';
// The I18n Extension API cannot be used directly in the webpage
import type { i18nMap } from '../i18n';

import { localConfig } from './config';
import { appendStyle } from './utils';

export type OptionsAndI18n = Options & { i18nMap: typeof i18nMap };

const options = {} as OptionsAndI18n;

export const optionsPromise = new Promise<OptionsAndI18n>((res) => {
  // get config from content script
  window.postMessage({ type: Event.GET_OPTIONS } as Message, '*');
  window.addEventListener('message', async ({ data }) => {
    const msg = data as Message<OptionsAndI18n> | null;
    if (msg?.type === Event.SEND_OPTIONS) {
      Object.assign(options, msg.data);
      // promise only completed once
      res(options);

      const style = await appendStyle(localConfig.NO_PIP_STYLE);
      if (options['show-on'] === 'pip' && document.pictureInPictureEnabled) {
        style.remove();
      }
    }
  });
});
