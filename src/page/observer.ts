import { configPromise } from './config';
import { coverCtx, coverHDCtx, lyricVideoIsOpen } from './element';
import { insetLyricsBtn } from './btn';
import { sharedData } from './share-data';
import { generateCover } from './cover';
import { captureException, documentQueryHasSelector } from './utils';
import { SpotifyTrackLyrics, SpotifyTrackMetadata } from './types';

let loginResolve: (value?: unknown) => void;
export const loggedPromise = new Promise((res) => (loginResolve = res));

const weakMap = new WeakMap<Element, MutationObserver>();

configPromise.then(
  ({
    ALBUM_COVER_SELECTOR,
    ALBUM_COVER_LARGE_REGEXP_REPLACE,
    TRACK_INFO_SELECTOR,
    LOGGED_MARK_SELECTOR,
    BTN_LIKE_SELECTOR,
  }) => {
    function getLargeCoverUrl(src: string) {
      const [regText, replaceText] = ALBUM_COVER_LARGE_REGEXP_REPLACE;
      const reg = new RegExp(regText);
      return reg.test(src) ? src.replace(reg, replaceText) : null;
    }

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
      const largeUrl = getLargeCoverUrl(this.src);
      if (this.naturalWidth >= 480) {
        coverHDCtx.drawImage(this, 0, 0, width, height);
      } else if (largeUrl) {
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
    function coverUpdated(this: HTMLImageElement) {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
      // YouTube video cover has no cors
      // TIDAL some cover has no cors
      const anonymous = new Image();
      anonymous.crossOrigin = 'anonymous';
      anonymous.addEventListener('load', coverLoadHandler);
      anonymous.addEventListener('error', coverErrorHandler);
      anonymous.src = this.currentSrc || this.src;
    }

    const infoElementUpdate = () => {
      // Assuming that cover is loaded after the song information is updated
      const cover = document.querySelector(ALBUM_COVER_SELECTOR) as HTMLImageElement | null;
      if (cover) {
        cover.addEventListener('load', coverUpdated);
      }

      if (!lyricVideoIsOpen) return;
      const likeBtn = documentQueryHasSelector(BTN_LIKE_SELECTOR);
      const likeBtnRect = likeBtn?.getBoundingClientRect();
      if (!likeBtnRect?.width || !likeBtnRect.height) {
        // advertisement
        return sharedData.resetData();
      }

      sharedData.dispatchTrackElementUpdateEvent();

      if (!cover) {
        captureException(new Error('Cover not found'));
      }
    };

    let infoElement: Element | null = null;

    const checkElement = () => {
      if (document.querySelector(LOGGED_MARK_SELECTOR)) loginResolve();
      // https://github.com/mantou132/Spotify-Lyrics/issues/30
      insetLyricsBtn();
      const prevInfoElement = infoElement;
      infoElement = document.querySelector(TRACK_INFO_SELECTOR);
      if (!infoElement) return;
      if (!prevInfoElement || prevInfoElement !== infoElement) infoElementUpdate();

      if (!weakMap.has(infoElement)) {
        const infoEleObserver = new MutationObserver(infoElementUpdate);
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

const originFetch = globalThis.fetch;

let latestHeader = new Headers();

// Priority to detect track switching through API
// Priority to use build-in lyrics through API
globalThis.fetch = async (...rest) => {
  const res = await originFetch(...rest);
  const url = new URL(rest[0] instanceof Request ? rest[0].url : rest[0], location.origin);
  latestHeader = new Headers(rest[0] instanceof Request ? rest[0].headers : rest[1]?.headers);
  const spotifyAPI = 'https://spclient.wg.spotify.com';
  if (url.origin === spotifyAPI && url.pathname.startsWith('/metadata/4/track/')) {
    const metadata: SpotifyTrackMetadata = await res.clone().json();
    const { name = '', artist = [], duration = 0, canonical_uri, has_lyrics } = metadata || {};
    const trackId = canonical_uri?.match(/spotify:track:([^:]*)/)?.[1];
    // match artists element textContent
    const artists = artist?.map((e) => e?.name).join(', ');
    sharedData.cacheTrackAndLyrics({
      name,
      artists,
      duration: duration / 1000,
      getLyrics: has_lyrics
        ? async () => {
            const res = await fetch(`${spotifyAPI}/lyrics/v1/track/${trackId}?market=from_token`, {
              headers: latestHeader,
            });
            const spLyrics: SpotifyTrackLyrics = await res.json();
            if (spLyrics.kind === 'LINE') {
              return spLyrics.lines
                .map(({ time, words }) =>
                  words.map(({ string }) => ({
                    startTime: time / 1000,
                    text: string,
                  })),
                )
                .flat();
            }
          }
        : undefined,
    });
  }
  return res;
};
