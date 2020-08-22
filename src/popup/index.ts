import { browser } from 'webextension-polyfill-ts';
import { render, html } from '@mantou/gem';

import { theme } from '../common/theme';
import { fontStyle } from '../common/font';

import { sendEvent, events } from '../common/ga';

import './elements/root';
import { getOptions } from '../options/store';
import { i18n } from '../i18n';

render(
  html`
    ${fontStyle}
    <style>
      body {
        box-sizing: border-box;
        border: 1px solid rgba(${theme.textRGB}, 0.2);
        width: 20rem;
        height: 30rem;
        margin: 0;
        overflow: hidden;
        font-size: 16px;
        background: rgb(${theme.backgroundRGB});
        color: rgb(${theme.textRGB});
      }
      app-root {
        height: 100%;
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
