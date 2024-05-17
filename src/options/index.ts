// Firefox 不能在内容脚本中使用自定义元素
// https://bugs.chromium.org/p/chromium/issues/detail?id=390807
import '@webcomponents/webcomponentsjs';
import { render, html } from '@mantou/gem/lib/element';
import { kebabToCamelCase } from '@mantou/gem/lib/utils';

import { isWebApp } from '../common/constants';
import { fontStyle } from '../common/font';
import { captureException } from '../common/bg';

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

  window.addEventListener('error', (e) => {
    captureException(e);
  });
} else {
  // hack content script custom element
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
    value: function attachInternals() {
      return {
        states: {
          has: (v: string) => kebabToCamelCase(v) in this.dataset,
          add: (v: string) => (this.dataset[kebabToCamelCase(v)] = ''),
          delete: (v: string) => delete this.dataset[kebabToCamelCase(v)],
        },
      };
    },
  });
}
