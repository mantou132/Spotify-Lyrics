import config from './config';

import { video, canvas } from './element';
import { insetLyricsBtn } from './btn';
import { sharedData } from './share-data';

let loginResolve: (value?: unknown) => void;
export const loggedPromise = new Promise(res => (loginResolve = res));

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
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // May load multiple times in a short time
      // Need to remember the last cover image
      let largeImage: HTMLImageElement;
      cover.addEventListener('load', () => {
        const drawSmallCover = () => {
          ctx.imageSmoothingEnabled = false;
          const blur = 10;
          ctx.filter = `blur(${blur}px)`;
          ctx.drawImage(cover, -blur * 2, -blur * 2, video.width + 4 * blur, video.height + 4 * blur);
        };
        // https://github.com/mantou132/Spotify-Lyrics/issues/26#issuecomment-638019333
        const reg = /00004851(?=\w{24}$)/;
        if (cover.naturalWidth >= 480) {
          ctx.drawImage(cover, 0, 0, video.width, video.height);
        } else if (!reg.test(cover.src)) {
          drawSmallCover();
        } else {
          const largeUrl = cover.src.replace(reg, '0000b273');
          largeImage = new Image();
          largeImage.crossOrigin = 'anonymous';
          largeImage.addEventListener('load', function() {
            if (this !== largeImage) return;
            ctx.filter = `blur(0px)`;
            ctx.drawImage(largeImage, 0, 0, video.width, video.height);
          });
          largeImage.addEventListener('error', drawSmallCover);
          largeImage.src = largeUrl;
        }
      });
      cover.addEventListener('error', () => {
        ctx.fillRect(0, 0, video.width, video.height);
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
