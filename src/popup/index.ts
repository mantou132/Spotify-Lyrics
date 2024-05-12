import { browser } from 'webextension-polyfill-ts';
import { render, html } from '@mantou/gem';

import { theme } from '../common/theme';
import { fontStyle } from '../common/font';
import { sendEvent, events } from '../common/ga';
import { getOptions } from '../options/store';
import { i18n } from '../i18n';

import './elements/root';

function main(fontSize: number) {
  render(
    html`
      ${fontStyle}
      <style>
        :root {
          font-size: ${fontSize}px;
        }
        body {
          box-sizing: border-box;
          border: 1px solid rgba(${theme.textRGB}, 0.2);
          width: 20rem;
          height: 30rem;
          margin: 0;
          overflow: hidden;
          background: rgb(${theme.backgroundRGB});
          color: rgb(${theme.textRGB});
          font-size: 1rem;
        }
        app-root {
          height: 100%;
        }
      </style>
      <app-root>${i18n.popupMissMatch()}</app-root>
    `,
    document.body,
  );
}

const getFontSize = () => {
  return Number(localStorage.getItem('fontSize')) || 16;
};

const setFontSize = (fontSize: number) => {
  localStorage.setItem('fontSize', String(fontSize));
  main(fontSize);
};

main(getFontSize());

window.addEventListener('keydown', (evt) => {
  const { key, ctrlKey, metaKey } = evt;
  if (!ctrlKey && !metaKey) return;
  const scale = (n: number) => {
    evt.preventDefault();
    setFontSize(getFontSize() * n);
  };
  if (key === '=' || key === '+') {
    scale(1.2);
  }
  if (key === '-') {
    scale(1 / 1.2);
  }
});

setTimeout(() => {
  // fix firefox overflow menu
  if (matchMedia('(min-width: 20.001rem)').matches) {
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
