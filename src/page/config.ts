/**
 * The default is Spotify configuration
 */
import { isProd, Platform } from '../common/consts';

import config from './config.json';
import { css, svg, getSVGDataUrl } from './utils';

const REMOTE_URL =
  'https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/src/page/config.json';

// Identify platform
// Identify the platform, the platform should be the same as in config.json
export const currentPlatform: Platform = (() => {
  const { host } = location;
  if (host.includes('youtube')) return 'YOUTUBE';
  if (host.includes('deezer')) return 'DEEZER';
  return 'SPOTIFY';
})();

async function getConfig() {
  let result = config;
  if (isProd) {
    try {
      result = (await (await fetch(REMOTE_URL)).json()) as typeof config;
    } catch {}
  }
  return currentPlatform === 'SPOTIFY' ? result : Object.assign(result, result[currentPlatform]);
}

// Remote configuration, the modification takes effect immediately
export default getConfig();

// For some configurations of the service, they need to be repackaged and released to take effect
interface LocalConfig {
  // If necessary, inject the service worker in advance
  SERVICE_WORKER: string;
  // Some fixed styles, they will be inserted into the page as quickly as possible, avoid page flickering
  STATIC_STYLE: string;
  // The style that should be added when the lyrics will be displayed on the page
  NO_PIP_STYLE: string;
  // CSS class Name of the lyrics button
  LYRICS_CLASSNAME: string;
  // CSS class Name of the lyrics button is actived
  LYRICS_ACTIVE_CLASSNAME: string;
}

export const localConfig: LocalConfig = (() => {
  const LYRICS_CLASSNAME = 'extension-lyrics-button';
  const LYRICS_ACTIVE_CLASSNAME = 'active';

  if (currentPlatform === 'YOUTUBE') {
    const iconUrl = getSVGDataUrl(svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
        <path d="M12 20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 1.1.9 2 2 2zm-6 0c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2zm10-9v7c0 1.1.9 2 2 2s2-.9 2-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2z"/>
      </svg>
    `);
    return {
      SERVICE_WORKER: '',
      STATIC_STYLE: css`
        yt-bubble-hint-renderer.ytmusic-popup-container {
          display: none;
        }
        ytmusic-player {
          --ytmusic-mini-player-height: 0px !important;
        }
        .${LYRICS_CLASSNAME} {
          margin-left: var(--ytmusic-like-button-renderer-button-spacing, 8px);
        }
        .${LYRICS_CLASSNAME} iron-icon {
          background: var(--ytmusic-icon-inactive);
          transform: rotate(90deg) scale(1.2);
          -webkit-mask: url(${iconUrl}) center / 100% no-repeat;
          mask: url(${iconUrl}) center / 100% no-repeat;
        }
        .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME} iron-icon {
          background: var(--ytmusic-text-primary);
        }
      `,
      NO_PIP_STYLE: '',
      LYRICS_CLASSNAME,
      LYRICS_ACTIVE_CLASSNAME,
    };
  } else if (currentPlatform === 'DEEZER') {
    const iconUrl = getSVGDataUrl(svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
        <path d="M5.663 4.25l2.138 2.138-4.702 3.847-1.283-1.282L5.663 4.25zM1.389 9.735l.855.855-.855.427-.427-.427.427-.855zM6.09 3.396a2.565 2.565 0 1 1 2.566 2.565L6.09 3.396z">
        </path>
      </svg>
    `);
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
          -webkit-mask: url(${iconUrl}) center / 100% no-repeat;
          mask: url(${iconUrl}) center / 100% no-repeat;
        }
        .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME} button svg {
          background: var(--color-accent);
        }
      `,
      NO_PIP_STYLE: '',
      LYRICS_CLASSNAME,
      LYRICS_ACTIVE_CLASSNAME,
    };
  } else {
    return {
      SERVICE_WORKER: 'https://open.spotify.com/service-worker.js',
      STATIC_STYLE: css`
        /* not logged in */
        [data-testid='cookie-notice'],
        /* webpage: download link */
        .Rootlist ~ div a[href*=download],
        /* webpage: logo */
        [role='banner'] {
          display: none;
        }
        .${LYRICS_CLASSNAME}::before {
          content: '\\f345';
          font-size: 16px;
          transform: rotate(90deg);
          color: #b3b3b3;
        }
        .${LYRICS_CLASSNAME}.${LYRICS_ACTIVE_CLASSNAME}::before {
          color: #1db954;
        }
      `,
      NO_PIP_STYLE: css`
        [role='contentinfo'] > div:nth-child(1) > button {
          display: none;
        }
      `,
      LYRICS_CLASSNAME,
      LYRICS_ACTIVE_CLASSNAME,
    };
  }
})();
