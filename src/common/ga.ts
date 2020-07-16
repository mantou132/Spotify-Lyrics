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

interface EventParams {
  ec: string; // event category
  ea: string; // event action
}

export const events = {
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

export function sendEvent(cid: string, payload: EventParams) {
  postReq({
    cid,
    t: 'event',
    ...gaRequiredPayload,
    ...payload,
  });
}

interface PageViewParams {
  pathname?: string;
  search?: string | URLSearchParams;
}

export function sendPageView(cid: string, payload: PageViewParams) {
  const { pathname = '/', search = '' } = payload;
  postReq({
    cid,
    t: 'pageview',
    dh: location.host,
    dl: `${location.origin}${pathname}?${search}`,
    dp: pathname,
    ...gaRequiredPayload,
  });
}
