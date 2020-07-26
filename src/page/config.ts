/**
 * The default is Spotify configuration
 */
import { isProd } from '../common/consts';

import config from './config.json';
import { css, svg, getSVGDataUrl } from './utils';

const REMOTE_URL = 'https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/src/page/config.json';

// Identify service name
// Identify the service name, the service name should be the same as in config.json
const currentService = (() => {
  if (location.host.includes('youtube')) return 'YOUTUBE';
  return 'SPOTIFY';
})();

async function getConfig() {
  let result = config;
  if (isProd) {
    try {
      result = (await (await fetch(REMOTE_URL)).json()) as typeof config;
    } catch {}
  }
  return currentService === 'SPOTIFY' ? result : Object.assign(result, result[currentService]);
}

// Remote configuration, the modification takes effect immediately
export default getConfig();

// For some configurations of the service, they need to be repackaged and released to take effect
interface LocalConfig {
  SERVICE_WORKER: string;
  // Some fixed styles, they will be inserted into the page as quickly as possible
  STATIC_STYLE: string;
  // The style that should be added when the lyrics will be displayed on the page
  NO_PIP_STYLE: string;
  // CSS class Name of the lyrics button
  LYRICS_CLASSNAME: string;
  // CSS class Name of the lyrics button is actived
  LYRICS_ACTIVE_CLASSNAME: string;
}

export const localConfig: LocalConfig = (() => {
  const LYRICS_CLASSNAME = 'spoticon-lyrics-16';
  const LYRICS_ACTIVE_CLASSNAME = 'active';

  if (currentService === 'YOUTUBE') {
    const iconUrl = getSVGDataUrl(svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
        <path d="M12 20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 1.1.9 2 2 2zm-6 0c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2zm10-9v7c0 1.1.9 2 2 2s2-.9 2-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2z"/>
      </svg>
    `);
    return {
      SERVICE_WORKER: 'https://open.spotify.com/service-worker.js',
      STATIC_STYLE: css`
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
  } else {
    return {
      SERVICE_WORKER: '',
      STATIC_STYLE: css`
        [data-testid='cookie-notice'],
        [data-testid='signup-bar'],
        /* download link */
        .NavBar__download-item,
        /* icon */
        [role='banner'],
        /* ad */
        [role='main'] ~ div {
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
