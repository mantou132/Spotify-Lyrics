// https://bugs.chromium.org/p/chromium/issues/detail?id=390807
import '@webcomponents/webcomponentsjs';
import { browser } from 'webextension-polyfill-ts';
import { render, html } from '@mantou/gem/lib/element';

import { isWebApp } from '../common/constants';
import { fontStyle } from '../common/font';

import './app';
import './modal';

if (!isWebApp) {
  render(
    html`
      ${fontStyle}
      <style>
        html {
          font-size: 62.5%;
          background: white;
        }
        body {
          font-size: inherit;
          margin: 0;
        }
        @media (min-width: 45rem) {
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2.5rem;
          }
          options-app {
            width: 40rem;
            border: 2px solid;
          }
        }
      </style>
      <options-app></options-app>
    `,
    document.body,
  );

  browser.runtime.getBackgroundPage().then((win) => {
    window.addEventListener('error', (e) => {
      win?.Sentry?.captureException(e);
    });
  });
}
