import { browser } from 'webextension-polyfill-ts';
import { render, html } from '@mantou/gem';

import './app';
import { sendEvent, events } from '../common/ga';
import { theme } from '../common/theme';

import { getOptions } from './store';

render(
  html`
    <style>
      html {
        font-size: 62.5%;
        font-family: Roboto, system-ui, sans-serif;
      }
      body {
        margin: 0;
        color: rbg(${theme.blackRGB});
      }
      options-app {
        padding: 0.8rem 1.6rem 1.6rem;
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

sendEvent(getOptions().cid, events.openOptionsPage);

browser.runtime.getBackgroundPage().then((win) => {
  window.addEventListener('error', (e) => {
    win?.Sentry?.captureException(e);
  });
});
