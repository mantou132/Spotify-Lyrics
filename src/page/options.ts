import { Event, Message } from '../common/consts';
import { Options } from '../common/options';

export const optionsPromise = new Promise<Options>(res => {
  // get config from content script
  window.postMessage({ type: Event.GET_OPTIONS } as Message, '*');
  window.addEventListener('message', ({ data }) => {
    const msg = data as Message<Options> | null;
    if (msg?.type === Event.SEND_OPTIONS) {
      // promise only completed once
      res(msg.data);
    }
  });
});
