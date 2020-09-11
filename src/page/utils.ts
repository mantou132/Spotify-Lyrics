import { Message, Event, isProd } from '../common/consts';

export function raw(arr: TemplateStringsArray, ...args: any[]) {
  return arr.reduce((prev, current, index) => prev + (args[index - 1] || '') + current);
}
export const svg = raw;
export const html = raw;
export const css = raw;

export function getSVGDataUrl(s: string) {
  return `data:image/svg+xml,${encodeURIComponent(s)}`;
}

/**
 * Simulation https://developer.mozilla.org/en-US/docs/Web/CSS/:has
 * @example
 * ```ts
 * documentQueryHasSelector('div:has(.lyrics)');
 * ```
 */
export function documentQueryHasSelector(s: string) {
  if (!s.includes(':has')) return document.querySelector(s);
  const parentSelector = s.replace(/:has\(.*\)/, '');
  const childSelector = s.replace(/:has\((.*)\)/, ' $1');
  const child = document.querySelector(childSelector);
  return child?.closest(parentSelector);
}

export const headReady = new Promise((res) => {
  if (document.head) res();
  document.addEventListener('readystatechange', () => {
    if (document.head) res();
  });
});

export async function appendStyle(s: string) {
  if (s === '') return;
  await headReady;
  const style = document.createElement('style');
  style.textContent = s;
  document.head.append(style);
}

export function captureException(err: Error, extra: any = { herf: location.href }) {
  if (!isProd) console.error(err, extra);
  const msg: Message = {
    type: Event.CAPTURE_EXCEPTION,
    data: {
      name: err.name,
      message: err.message,
      stack: err.stack,
      extra,
    },
  };
  window.postMessage(msg, '*');
}
