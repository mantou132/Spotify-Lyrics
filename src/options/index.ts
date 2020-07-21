import { browser } from 'webextension-polyfill-ts';
import { render, html } from '@mantou/gem';

import './app';
import { sendEvent, events } from '../common/ga';

import { getOptions } from './store';

render(
  html`
    <options-app></options-app>
  `,
  document.body,
);

sendEvent(getOptions().cid, events.openOptionsPage);

browser.runtime.getBackgroundPage().then(win => {
  window.addEventListener('error', e => {
    win?.Sentry?.captureException(e);
  });
});
