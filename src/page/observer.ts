import config from './config';

import { coverCtx, coverHDCtx } from './element';
import { insetLyricsBtn } from './btn';
import { sharedData } from './share-data';
import { generateCover } from './cover';
import { captureException } from './utils';

// May load multiple times in a short time
// Need to remember the last cover image
let largeImage: HTMLImageElement;
function coverLoadHandler(this: HTMLImageElement) {
  const drawSmallCover = (ctx: CanvasRenderingContext2D) => {
    if (!('filter' in ctx)) {
      return generateCover([coverCtx]);
    }
    const { width, height } = ctx.canvas;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    const blur = 10;
    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(this, -blur * 2, -blur * 2, width + 4 * blur, height + 4 * blur);
    ctx.restore();
  };
  drawSmallCover(coverCtx);

  const { width, height } = coverHDCtx.canvas;
  // https://github.com/mantou132/Spotify-Lyrics/issues/26#issuecomment-638019333
  const reg = /00004851(?=\w{24}$)/;
  if (this.naturalWidth >= 480) {
    coverHDCtx.drawImage(this, 0, 0, width, height);
  } else if (reg.test(this.src)) {
    const largeUrl = this.src.replace(reg, '0000b273');
    largeImage = new Image();
    largeImage.crossOrigin = 'anonymous';
    largeImage.addEventListener('load', function () {
      if (this !== largeImage) return;
      coverHDCtx.drawImage(largeImage, 0, 0, width, height);
    });
    largeImage.addEventListener('error', () => drawSmallCover(coverHDCtx));
    largeImage.src = largeUrl;
  } else {
    drawSmallCover(coverHDCtx);
  }
}
function coverErrorHandler(this: HTMLImageElement) {
  generateCover([coverCtx, coverHDCtx]);
}

let loginResolve: (value?: unknown) => void;
export const loggedPromise = new Promise((res) => (loginResolve = res));

const weakMap = new WeakMap<Element, MutationObserver>();

config.then(
  ({ ALBUM_COVER_SELECTOR, TRACK_INFO_SELECTOR, LOGGED_MARK_SELECTOR, BTN_LIKE_SELECTOR }) => {
    let infoElement: Element | null = null;

    const update = () => {
      const likeBtn = document.querySelector(BTN_LIKE_SELECTOR);
      const likeBtnRect = likeBtn?.getBoundingClientRect();
      if (!likeBtnRect?.width || !likeBtnRect.height) {
        // advertisement
        return sharedData.resetData();
      }

      sharedData.updateTrack();

      // Assuming that cover is loaded after the song information is updated
      const cover = document.querySelector(ALBUM_COVER_SELECTOR) as HTMLImageElement | null;
      if (cover) {
        // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
        // YouTube video has no cors
        cover.crossOrigin = 'anonymous';
        cover.addEventListener('load', coverLoadHandler);
        cover.addEventListener('error', coverErrorHandler);
      } else {
        captureException(new Error('Cover not found'));
      }
    };

    const checkElement = () => {
      if (document.querySelector(LOGGED_MARK_SELECTOR)) loginResolve();
      // https://github.com/mantou132/Spotify-Lyrics/issues/30
      insetLyricsBtn();
      const prevInfoElement = infoElement;
      infoElement = document.querySelector(TRACK_INFO_SELECTOR);
      if (!infoElement) return;
      if (!prevInfoElement) update();

      if (!weakMap.has(infoElement)) {
        const infoEleObserver = new MutationObserver(update);
        infoEleObserver.observe(infoElement, {
          childList: true,
          characterData: true,
          subtree: true,
        });
        weakMap.set(infoElement, infoEleObserver);
      }
    };

    checkElement();
    // allow `document.documentElement` rerender
    const htmlEleObserver = new MutationObserver(checkElement);
    htmlEleObserver.observe(document.documentElement, { childList: true, subtree: true });
  },
);
