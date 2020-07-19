// https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
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

interface EventParams {
  ec: string; // event category
  ea: string; // event action
}

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
  clickToggleLyrics: {
    ec: 'Click',
    ea: 'ClickToggleLyrics',
  },
  keypressToggleLyrics: {
    ec: 'Click',
    ea: 'KeypressToggleLyrics',
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

export function sendEvent(cid: string, payload: EventParams, customOptions: Record<string, string> = {}) {
  postReq({
    cid,
    t: 'event',
    ul: navigator.language.toLowerCase(),
    sr: `${screen.width}x${screen.height}`,
    ...gaRequiredPayload,
    ...payload,
    ...customOptions,
    ...(location.protocol.startsWith('http')
      ? {
          vp: `${innerWidth}x${innerHeight}`,
          cs: matchMedia('(display-mode: standalone)').matches ? 'pwa' : 'webpage',
        }
      : {}),
  });
}
