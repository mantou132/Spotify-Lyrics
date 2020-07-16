// https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
// Support extension origin and spotify origin, And share ga cid

const postReq = (params: Record<string, string>) => {
  fetch('https://www.google-analytics.com/collect', {
    method: 'post',
    body: new URLSearchParams(params),
    mode: 'cors',
  });
};

const gaRequiredPayload = {
  v: '1',
  tid: process.env.NODE_ENV === 'production' ? 'UA-163443161-1' : 'UA-88601817-2',
};

interface EventOptionalParams {
  el?: string; // event label
  ev?: string; // event value
}

interface EventRequiredParams {
  ec: string; // event category
  ea: string; // event action
}

type Event = EventRequiredParams & EventOptionalParams;

export const events = {
  searchLyrics: {
    ec: 'Load',
    ea: 'LoadLyrics',
  },
  notMatch: {
    ec: 'Load',
    ea: 'NotMatchLyrics',
  },
  noLyrics: {
    ec: 'Load',
    ea: 'NoLyrics',
  },
  selectTrack: {
    ec: 'Click',
    ea: 'ManuallySelectTrack',
  },
  autoSelectTrack: {
    ec: 'Click',
    ea: 'AutoSelectTrack',
  },
  openOptionsPage: {
    ec: 'Window',
    ea: 'OpenOptionsPage',
  },
  openPopupPage: {
    ec: 'Window',
    ea: 'OpenPopupPage',
  },
  installAsPWA: {
    ec: 'UserAgent',
    ea: 'Install',
  },
};

export function sendEvent(cid: string, e: Event, options?: EventOptionalParams) {
  postReq({
    cid,
    t: 'event',
    ...gaRequiredPayload,
    ...e,
    ...options,
  } as Record<string, string>);
}

export function sendAppInfo(cid: string, isPWA: boolean) {
  postReq({
    cid,
    t: 'screenview',
    ...gaRequiredPayload,
    an: isPWA ? 'standalone-pwa' : 'webpage',
  });
}
