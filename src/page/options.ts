import { Event, Message, Options } from '../common/consts';

const options = {} as Options;

export const optionsPromise = new Promise<Options>((res) => {
  // get config from content script
  window.postMessage({ type: Event.GET_OPTIONS } as Message, '*');
  window.addEventListener('message', ({ data }) => {
    const msg = data as Message<Options> | null;
    if (msg?.type === Event.SEND_OPTIONS) {
      Object.assign(options, msg.data);
      // promise only completed once
      res(options);
    }
  });
});
