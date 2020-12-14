import { Event, Message } from '../common/consts';

let cspError = false;

let reqId = 0;

export interface Res {
  reqId: number;
  ok: boolean;
  data: any;
}

export interface Req {
  reqId: number;
  uri: string;
  options: any;
}

async function bgFetch(uri: string, options: RequestInit = {}) {
  // ignore abort signal
  const { body, headers, method } = options;
  reqId++;
  const data: Req = { reqId, uri, options: { body, headers, method } };
  window.postMessage({ type: Event.SEND_REQUEST, data }, '*');
  return new Promise((res, rej) => {
    const getRes = ({ data: response }: MessageEvent<Message<Res>>) => {
      const { type, data } = response || {};
      if (type === Event.SEND_RESPONSE && data?.reqId === reqId) {
        if (data.ok) {
          res(data.data);
        } else {
          rej(new Error(data.data));
        }
        window.removeEventListener('message', getRes);
      }
    };
    window.addEventListener('message', getRes);
  });
}

export async function request(uri: string, options: RequestInit = {}) {
  if (cspError) {
    return bgFetch(uri, options);
  } else {
    try {
      const res = await fetch(uri, {
        mode: 'cors',
        ...options,
      });

      if (res.status === 0) throw new Error('Request fail');
      if (res.status >= 400) throw new Error(res.statusText);
      const res2 = res.clone();
      try {
        return await res.json();
      } catch {
        return await res2.text();
      }
    } catch (err) {
      document.addEventListener(
        'securitypolicyviolation',
        ({ blockedURI }) => {
          if (blockedURI === uri) cspError = true;
        },
        { once: true },
      );
      await new Promise((res) => setTimeout(res));
      if (cspError) {
        return bgFetch(uri, options);
      } else {
        throw err as Error;
      }
    }
  }
}
