// https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
// Support extension origin and spotify origin, And share ga cid

import { isProd, isWebApp, VERSION } from './consts';

const postReq = (params: Record<string, string>) => {
  fetch('https://www.google-analytics.com/collect', {
    method: 'post',
    body: new URLSearchParams(params),
    mode: 'cors',
  });
};

const gaRequiredPayload = {
  v: '1', // protocol version
  tid: isProd ? 'UA-163443161-1' : 'UA-88601817-2', // measurement id
};

interface EventRequiredParams {
  ec: string; // event category
  ea: string; // event action
}

interface EventOptionalParams {
  el: string; // event label
  ev: string; // event value
}
type EventFullParams = EventRequiredParams & EventOptionalParams;
type EventParams = EventRequiredParams | EventFullParams;

export const events = {
  loadLyrics: {
    ec: 'Load',
    ea: 'LoadLyrics',
    el: 'LoadLyricsTime',
  },
  notMatch: {
    ec: 'Load',
    ea: 'NotMatchLyrics',
  },
  useRemoteMatch: {
    ec: 'Load',
    ea: 'UseRemoteMatch',
  },
  noLyrics: {
    ec: 'Load',
    ea: 'NoLyrics',
  },
  useRemoteLyrics: {
    ec: 'Load',
    ea: 'UseRemoteLyrics',
  },
  selectTrack: {
    ec: 'Click',
    ea: 'ManuallySelectTrack',
  },
  autoSelectTrack: {
    ec: 'Click',
    ea: 'AutoSelectTrack',
  },
  clickToggleLyrics: {
    ec: 'Click',
    ea: 'ClickToggleLyrics',
  },
  keypressToggleLyrics: {
    ec: 'Click',
    ea: 'KeypressToggleLyrics',
  },
  openEditor: {
    ec: 'Window',
    ea: 'OpenEditor',
  },
  openOptionsPage: {
    ec: 'Window',
    ea: 'OpenOptionsPage',
  },
  openPopupPage: {
    ec: 'Window',
    ea: 'OpenPopupPage',
  },
  startUp: {
    ec: 'UserAgent',
    ea: 'StartUp',
  },
  installAsPWA: {
    ec: 'UserAgent',
    ea: 'Install',
  },
};

export function sendEvent(
  cid: string,
  payload: EventParams,
  customOptions: Record<string, string> = {},
) {
  postReq({
    cid, // client id
    t: 'event', // hit type
    cn: VERSION, // campaign name
    ul: navigator.language.toLowerCase(), // user language
    sr: `${screen.width}x${screen.height}`, // screen resolution
    ...gaRequiredPayload,
    ...payload,
    ...customOptions,
    ...(isWebApp
      ? {
          vp: `${innerWidth}x${innerHeight}`, // viewport size
          cs: matchMedia('(display-mode: standalone), (display-mode: minimal-ui)').matches
            ? 'pwa'
            : 'webpage', // campaign source
          cm: location.host, // campaign medium
        }
      : {}),
  });
}
