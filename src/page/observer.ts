import config from '../common/config';

import { video } from './element';
import { insetLyricsBtn } from './btn';

export const WIDTH = 640;
export const HEIGHT = 640;
export interface Query {
  name: string;
  artists: string;
}

const weakMap = new WeakMap<Element, MutationObserver>();

export default async function songObserver(callback: (query: Query) => any) {
  const { ALBUM_COVER_SELECTOR, TRACK_INFO_SELECTOR, TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await config;

  const getQueryObj = (): Query => {
    const name = document.querySelector(TRACK_NAME_SELECTOR)?.textContent;
    const artists = document.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;
    return { name: name || '', artists: artists || '' };
  };

  const checkElement = () => {
    const element = document.querySelector(TRACK_INFO_SELECTOR);

    if (element && !weakMap.has(element)) {
      const cover = document.querySelector(ALBUM_COVER_SELECTOR) as HTMLImageElement;
      // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
      cover.crossOrigin = 'anonymous';
      const coverCanvas = document.createElement('canvas');
      coverCanvas.width = WIDTH;
      coverCanvas.height = HEIGHT;
      const ctx = coverCanvas.getContext('2d');
      if (!ctx) return;
      const stream = coverCanvas.captureStream();
      video.srcObject = stream;
      cover.addEventListener('load', () => {
        ctx.imageSmoothingEnabled = false;
        const blur = 10;
        ctx.filter = `blur(${blur}px)`;
        ctx.drawImage(cover, -blur * 2, -blur * 2, WIDTH + 4 * blur, HEIGHT + 4 * blur);

        // https://github.com/mantou132/Spotify-Lyrics/issues/26#issuecomment-638019333
        const largeUrl = cover.src.replace('00004851', '0000b273');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => {
          ctx.filter = `blur(0px)`;
          ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
        });
        img.src = largeUrl;
      });
      insetLyricsBtn();
      // init observer
      callback(getQueryObj());
      const observer = new MutationObserver(() => {
        callback(getQueryObj());
      });
      observer.observe(element, { childList: true, characterData: true, subtree: true });
      weakMap.set(element, observer);
    }
  };

  checkElement();
  // allow `document.documentElement` rerender
  const observer = new MutationObserver(checkElement);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
