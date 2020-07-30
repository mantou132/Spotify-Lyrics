import config from './config';

import { coverCtx } from './element';
import { insetLyricsBtn } from './btn';
import { sharedData } from './share-data';
import { generateCover } from './cover';

let loginResolve: (value?: unknown) => void;
export const loggedPromise = new Promise((res) => (loginResolve = res));

const weakMap = new WeakMap<Element, MutationObserver>();

config.then(({ ALBUM_COVER_SELECTOR, TRACK_INFO_SELECTOR, LOGGED_MARK_SELECTOR }) => {
  let infoElement: Element | null = null;

  const checkElement = () => {
    if (document.querySelector(LOGGED_MARK_SELECTOR)) loginResolve();
    // https://github.com/mantou132/Spotify-Lyrics/issues/30
    insetLyricsBtn();
    const prevInfoElement = infoElement;
    infoElement = document.querySelector(TRACK_INFO_SELECTOR);
    if (!infoElement) return;
    if (!prevInfoElement) sharedData.updateTrack();

    if (!weakMap.has(infoElement)) {
      const cover = document.querySelector(ALBUM_COVER_SELECTOR) as HTMLImageElement;
      // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
      // YouTube video has no cors
      cover.crossOrigin = 'anonymous';
      // May load multiple times in a short time
      // Need to remember the last cover image
      let largeImage: HTMLImageElement;
      cover.addEventListener('load', () => {
        const drawSmallCover = () => {
          coverCtx.save();
          coverCtx.imageSmoothingEnabled = false;
          const blur = 10;
          coverCtx.filter = `blur(${blur}px)`;
          coverCtx.drawImage(
            cover,
            -blur * 2,
            -blur * 2,
            coverCtx.canvas.width + 4 * blur,
            coverCtx.canvas.height + 4 * blur,
          );
          coverCtx.restore();
        };
        // https://github.com/mantou132/Spotify-Lyrics/issues/26#issuecomment-638019333
        const reg = /00004851(?=\w{24}$)/;
        if (cover.naturalWidth >= 480) {
          coverCtx.drawImage(cover, 0, 0, coverCtx.canvas.width, coverCtx.canvas.height);
        } else if (reg.test(cover.src)) {
          const largeUrl = cover.src.replace(reg, '0000b273');
          largeImage = new Image();
          largeImage.crossOrigin = 'anonymous';
          largeImage.addEventListener('load', function () {
            if (this !== largeImage) return;
            coverCtx.drawImage(largeImage, 0, 0, coverCtx.canvas.width, coverCtx.canvas.height);
          });
          largeImage.addEventListener('error', drawSmallCover);
          largeImage.src = largeUrl;
        } else if ('filter' in coverCtx) {
          drawSmallCover();
        } else {
          generateCover(coverCtx);
        }
      });
      cover.addEventListener('error', () => {
        generateCover(coverCtx);
      });
      const infoEleObserver = new MutationObserver(() => {
        sharedData.updateTrack();
      });
      infoEleObserver.observe(infoElement, { childList: true, characterData: true, subtree: true });
      weakMap.set(infoElement, infoEleObserver);
    }
  };

  checkElement();
  // allow `document.documentElement` rerender
  const htmlEleObserver = new MutationObserver(checkElement);
  htmlEleObserver.observe(document.documentElement, { childList: true, subtree: true });
});
