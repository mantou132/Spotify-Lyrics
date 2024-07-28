/**
 * The default is Spotify configuration
 */
import { isProd, Platform } from '../common/constants';

import { request } from './request';
import { css, svg, getSVGDataUrl } from './utils';
import config from './config.json';

// Identify platform
// Identify the platform, the platform should be the same as in config.json
export const currentPlatform: Platform = (() => {
  const { host } = location;
  if (host.includes('youtube')) return 'YOUTUBE';
  if (host.includes('deezer')) return 'DEEZER';
  if (host.includes('tidal')) return 'TIDAL';
  if (host.includes('apple')) return 'APPLE';
  return 'SPOTIFY';
})();

async function getConfig() {
  let result = config;
  if (isProd) {
    try {
      result = await request(
        `https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/src/page/config.json?t=${Date.now()}`,
      );
    } catch {}
  }
  return currentPlatform === 'SPOTIFY' ? result : Object.assign(result, result[currentPlatform]);
}

// Remote configuration, the modification takes effect immediately
export const configPromise = getConfig();

// For some configurations of the service, they need to be repackaged and released to take effect
interface LocalConfig {
  // If necessary, inject the service worker in advance
  SERVICE_WORKER: string;
  // Some fixed styles, they will be inserted into the page as quickly as possible, avoid page flickering
  STATIC_STYLE: string;
  // lyrics button host style
  BTN_CONTINER_STYLE?: string;
  // The style that should be added when the lyrics will be displayed on the page
  NO_PIP_STYLE: string;
  // CSS class Name of the lyrics button
  LYRICS_CLASSNAME: string;
  // CSS class Name of the lyrics button is active
  LYRICS_ACTIVE_CLASSNAME: string;
  USE_AUDIO_SELECTOR?: boolean;
}

export const localConfig: LocalConfig = (() => {
  const LYRICS_CLASSNAME = 'extension-lyrics-button';
  const LYRICS_ACTIVE_CLASSNAME = 'active';

  const microphoneIconUrl = getSVGDataUrl(svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <path d="M5.663 4.25l2.138 2.138-4.702 3.847-1.283-1.282L5.663 4.25zM1.389 9.735l.855.855-.855.427-.427-.427.427-.855zM6.09 3.396a2.565 2.565 0 1 1 2.566 2.565L6.09 3.396z">
      </path>
    </svg>
  `);

  switch (currentPlatform) {
    case 'YOUTUBE': {
      const iconUrl = getSVGDataUrl(svg`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="white" width="48px" height="48px">
          <path d="M11.85 38.65q-1.1 0-1.8-.7t-.7-1.8v-8.3q0-1.1.725-1.85t1.775-.75q1.1 0 1.85.75t.75 1.85v8.3q0 1.1-.75 1.8t-1.85.7Zm12.15 0q-1.1 0-1.8-.7t-.7-1.8v-24.3q0-1.1.725-1.85T24 9.25q1.1 0 1.85.75t.75 1.85v24.3q0 1.1-.75 1.8t-1.85.7Zm12.15 0q-1.1 0-1.8-.7t-.7-1.8v-14.3q0-1.1.725-1.85t1.775-.75q1.1 0 1.85.75t.75 1.85v14.3q0 1.1-.75 1.8t-1.85.7Z"/>
        </svg>
      `);
      return {
        SERVICE_WORKER: '',
        STATIC_STYLE: css`
          yt-bubble-hint-renderer {
            display: none !important;
          }
          ytmusic-player {
            --ytmusic-mini-player-height: 0px !important;
          }
          .${LYRICS_CLASSNAME} {
            margin-left: var(--ytmusic-like-button-renderer-button-spacing, 8px);
          }
          .${LYRICS_CLASSNAME} tp-yt-iron-icon {
            background: var(--ytmusic-text-secondary);
            transform: rotate(90deg) scale(1.1);
            -webkit-mask: url(${iconUrl}) center / 100% no-repeat;
            mask: url(${iconUrl}) center / 100% no-repeat;
          }
          .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME} tp-yt-iron-icon {
            background: var(--ytmusic-text-primary);
          }
        `,
        NO_PIP_STYLE: '',
        LYRICS_CLASSNAME,
        LYRICS_ACTIVE_CLASSNAME,
      };
    }
    case 'DEEZER': {
      return {
        SERVICE_WORKER: '',
        STATIC_STYLE: css`
          main.has-ads-bottom .page-content,
          main.has-ads-bottom-with-audio .page-content {
            padding-bottom: 0;
          }
          .page-sidebar .sidebar-header,
          .has-ads-bottom .ads.ads-bottom,
          .has-ads-bottom-with-audio .ads.ads-bottom {
            display: none;
          }
          .${LYRICS_CLASSNAME} {
            order: 100;
          }
          .${LYRICS_CLASSNAME} button svg path {
            display: none;
          }
          .${LYRICS_CLASSNAME} button svg {
            background: var(--text-primary);
            -webkit-mask: url(${microphoneIconUrl}) center / 100% no-repeat;
            mask: url(${microphoneIconUrl}) center / 100% no-repeat;
          }
          .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME} button svg {
            background: var(--color-accent);
          }
        `,
        NO_PIP_STYLE: '',
        LYRICS_CLASSNAME,
        LYRICS_ACTIVE_CLASSNAME,
      };
    }
    case 'APPLE': {
      return {
        SERVICE_WORKER: '',
        STATIC_STYLE: css`
          /* logo */
          .navigation__header .logo,
          /* nav native links */
          .navigation__native-cta,
          /* page footer */
          footer,
          /* footer banner */
          cwc-music-upsell-banner-web {
            display: none !important;
          }
        `,
        BTN_CONTINER_STYLE: css`
          .${LYRICS_CLASSNAME} {
            --playback-control-button-width: var(--shuffle-repeat-button-width, 32px);
            --playback-control-icon-height: var(--shuffle-repeat-icon-height, 28px);
            appearance: none;
            width: var(--playback-control-button-width, 30px);
            height: var(--playback-control-button-height, 30px);
            display: flex;
            flex: 0 0 auto;
            align-items: stretch;
            justify-content: stretch;
            position: relative;
            font-size: 0;
            border: none;
            padding: 0;
            background: var(--systemSecondary);
            -webkit-mask: url(${microphoneIconUrl}) center / 45% no-repeat;
            mask: url(${microphoneIconUrl}) center / 45% no-repeat;
          }
          .${LYRICS_CLASSNAME} * {
            display: none;
          }
          .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME} {
            background: var(--keyColor, var(--musicKeyColor, var(--systemBlue)));
          }
        `,
        NO_PIP_STYLE: '',
        LYRICS_CLASSNAME,
        LYRICS_ACTIVE_CLASSNAME,
        USE_AUDIO_SELECTOR: true,
      };
    }
    case 'TIDAL': {
      return {
        SERVICE_WORKER: '',
        STATIC_STYLE: css`
          .${LYRICS_CLASSNAME} svg path {
            display: none;
          }
          .${LYRICS_CLASSNAME} svg {
            background: currentColor;
            -webkit-mask: url(${microphoneIconUrl}) center / 75% no-repeat;
            mask: url(${microphoneIconUrl}) center / 75% no-repeat;
          }
          .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME} svg {
            background: #0ff;
          }
        `,
        NO_PIP_STYLE: '',
        LYRICS_CLASSNAME,
        LYRICS_ACTIVE_CLASSNAME,
      };
    }
    default: {
      return {
        SERVICE_WORKER: 'https://open.spotify.com/service-worker.js',
        STATIC_STYLE: css`
          /* not logged in, cookie banner */
          #onetrust-consent-sdk,
          /* webpage: upgrade button */
          .Root [data-testid="topbar"] [data-testid="upgrade-button"],
          /* webpage: download link */
          .Root [data-testid="topbar"] [href*=download] {
            display: none;
          }
          .${LYRICS_CLASSNAME} {
            order: 100;
          }
          .${LYRICS_CLASSNAME} svg {
            fill: transparent;
            background: var(--text-subdued, rgb(106, 106, 106));
            -webkit-mask: url(${microphoneIconUrl}) center / 100% no-repeat;
            mask: url(${microphoneIconUrl}) center / 100% no-repeat;
          }
          .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME} svg {
            background: var(--text-bright-accent, rgb(17, 122, 55));
          }
        `,
        // hidden album expand button
        NO_PIP_STYLE: css`
          [role='contentinfo'] > div:nth-child(1) > button {
            display: none;
          }
        `,
        LYRICS_CLASSNAME,
        LYRICS_ACTIVE_CLASSNAME,
      };
    }
  }
})();
