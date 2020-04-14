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
  cid: '555',
};

interface EventOptionalParams {
  el?: string;
  ev?: string;
}

interface EventRequiredParams {
  ec: string;
  ea: string;
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
  selectTrack: {
    ec: 'Click',
    ea: 'ManuallySelectTrack',
  },
  autoSelectTrack: {
    ec: 'Click',
    ea: 'AutoSelectTrack',
  },
};

export function sendEvent(e: Event, options?: EventOptionalParams) {
  postReq({
    t: 'event',
    ...gaRequiredPayload,
    ...e,
    ...options,
  } as Record<string, string>);
}
