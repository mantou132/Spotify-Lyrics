import { tify } from 'chinese-conv';

import { Message, Event, isProd } from '../common/consts';

const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
const Kuroshiro = require('kuroshiro');
const Aromanize = require('aromanize');

export function raw(arr: TemplateStringsArray, ...args: any[]) {
  return arr.reduce((prev, current, index) => prev + (args[index - 1] || '') + current);
}
export const svg = raw;
export const html = raw;
export const css = raw;

export const kutil = Kuroshiro.default.Util;

// initialize kuroshiro
let kuroshiro: any;
window.addEventListener('message', async ({ data }: MessageEvent) => {
  const { type } = data || {};
  if (type === Event.GET_EXTURL) {
    const url = data.data as string;

    kuroshiro = new Kuroshiro.default();
    await kuroshiro.init(new KuromojiAnalyzer.default({ dictPath: url }));

    // const content = '本当の夢のカタチに気づく';

    // console.debug('kuromoji test: ', await jpToRomanji(content));
    // console.debug('aromanize test: ', krToRomaji(content));
  }
});

export async function jpToRomanji(source: string): Promise<string> {
  if (!kuroshiro) throw new Error('kuroshiro is not loaded!');
  if (!hasJapanese(source)) return source;
  return await kuroshiro.convert(source, { mode: 'spaced', to: 'romaji' });
}

export function krToRomaji(source: string): string {
  if (!Aromanize) throw new Error('Aromanize is not loaded!');
  if (!hasKorean(source)) return source;
  let result = '';
  [...source].map((c, i) => {
    result += c;
    const next = source.charAt(i + 1);
    if (isKorean(c) && isKorean(next)) {
      result += source.lastIndexOf(c) == source.length - 1 ? '' : ' ';
    }
  });
  return Aromanize.romanize(result);
}

export function getSVGDataUrl(s: string) {
  return `data:image/svg+xml,${encodeURIComponent(s)}`;
}

export function hasJapanese(s: string): boolean {
  return (kutil.hasHiragana(s) || kutil.hasKatakana(s)) && kutil.hasJapanese(s);
}

export function hasKorean(s: string): boolean {
  const krReg = /[\u3130-\u318F\uAC00-\uD7AF]/g;
  return krReg.test(s);
}

function isKorean(s: string): boolean {
  const krReg = /^[\u3130-\u318F\uAC00-\uD7AF]{1}$/g;
  return krReg.test(s);
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

export const headReady = new Promise<void>((res) => {
  if (document.head) res();
  document.addEventListener('readystatechange', () => {
    if (document.head) res();
  });
});

const styledMap = new Map<string, HTMLStyleElement>();
export async function appendStyle(s: string) {
  const oldStyle = styledMap.get(s);
  if (oldStyle) return oldStyle;

  await headReady;
  const style = document.createElement('style');
  style.textContent = s;
  document.head.append(style);
  styledMap.set(s, style);
  return style;
}

export function captureException(err: Error, extra?: any) {
  if (!isProd) console.error(err, extra);
  const msg: Message = {
    type: Event.CAPTURE_EXCEPTION,
    data: {
      name: err.name,
      message: err.message,
      stack: err.stack,
      extra: { herf: location.href, ...extra },
    },
  };
  window.postMessage(msg, '*');
}
