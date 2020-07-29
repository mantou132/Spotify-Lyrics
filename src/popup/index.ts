import { browser } from 'webextension-polyfill-ts';
import { render, html } from '@mantou/gem';

import { theme } from '../common/theme';

import { sendEvent, events } from '../common/ga';

import './elements/root';
import { getOptions } from '../options/store';
import { i18n } from '../i18n';

render(
  html`
    <style>
      body {
        box-sizing: border-box;
        border: 1px solid rgba(${theme.textRGB}, 0.2);
        width: 20rem;
        height: 30rem;
        margin: 0;
        overflow: hidden;
        font-family: spotify-circular, Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro,
          Meiryo, MS Gothic, sans-serif;
        font-size: 16px;
        background: rgb(${theme.backgroundRGB});
        color: rgb(${theme.textRGB});
      }
      app-root {
        height: 100%;
      }
      @font-face {
        font-family: spotify-circular;
        src: url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Light.afd9ab26.woff2)
            format('woff2'),
          url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Light.2a78c017.woff) format('woff'),
          url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Light.89e4be2e.ttf) format('truetype');
        font-weight: 200;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: spotify-circular;
        src: url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.3466e0ec.woff2) format('woff2'),
          url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.ea8d19db.woff) format('woff'),
          url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.a357677a.ttf) format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: spotify-circular;
        src: url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.8d0a45cc.woff2) format('woff2'),
          url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.10e93738.woff) format('woff'),
          url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.7eb7d0f7.ttf) format('truetype');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
    </style>
    <app-root>${i18n.popupMissMatch()}</app-root>
  `,
  document.body,
);

setTimeout(() => {
  // fix firefox overflow menu
  if (matchMedia('(min-width: 20.1rem)').matches) {
    document.body.style.width = '100%';
  }
}, 200);

getOptions().then(({ cid }) => {
  sendEvent(cid, events.openPopupPage);
});

browser.runtime.getBackgroundPage().then((win) => {
  window.addEventListener('error', (e) => {
    win?.Sentry?.captureException(e);
  });
});
