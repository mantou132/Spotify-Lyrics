// https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
// Support extension origin and spotify origin, And share ga cid

import type { Req } from '../page/request';

import { isProd, isWebApp, VERSION, Event } from './constants';

const postReq = (params: Record<string, string>) => {
  const uri = 'https://www.google-analytics.com/collect';
  const options: RequestInit = {
    method: 'post',
    body: new URLSearchParams(params).toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  };
  if (isWebApp) {
    const data: Req = { reqId: -1, uri, options };
    window.postMessage({ type: Event.SEND_REQUEST, data }, '*');
  } else {
    fetch(uri, options);
  }
};

const gaRequiredPayload = {
  v: '1', // protocol version
  tid: isProd ? 'UA-163443161-1' : 'UA-88601817-2', // measurement id
};

type EventCategory = 'Load' | 'Click' | 'Window';

interface EventRequiredParams {
  ec: EventCategory;
  ea: string; // event action
}

interface EventOptionalParams {
  el: string; // event label
  ev: string; // event value
}
type EventFullParams = EventRequiredParams & EventOptionalParams;
type EventParams = EventRequiredParams | EventFullParams;

export const events: Record<string, EventRequiredParams & { el?: string }> = {
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
