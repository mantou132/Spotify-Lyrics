// Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1656732
import { customElement, html, GemElement } from '@mantou/gem';

import { Event } from '../common/consts';

import './app';

@customElement('options-modal')
class OptionsModal extends GemElement {
  static instance: OptionsModal | null = null;

  static open() {
    if (this.instance) return;
    this.instance = new this();
    document.body.append(this.instance);
  }

  static close() {
    this.instance?.remove();
    this.instance = null;
  }

  render() {
    return html`
      <style>
        .root {
          font-size: 10px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2147483647;
        }
        .body {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
        }
        .close-btn {
          cursor: pointer;
          position: absolute;
          top: -2em;
          right: -2em;
          height: 2em;
          width: 2em;
        }
        .close-btn::before,
        .close-btn::after {
          position: absolute;
          content: '';
          background: white;
          transform-origin: center;
          width: 1.5em;
          height: 0.2em;
          top: 0.9em;
          left: 0.25em;
        }
        .close-btn::before {
          transform: rotate(-45deg);
        }
        .close-btn::after {
          transform: rotate(45deg);
        }
        options-app {
          width: 45em;
          max-height: 80%;
          overflow: scroll;
        }
      </style>
      <div class="root">
        <div class="body">
          <options-app></options-app>
          <div class="close-btn" @click=${() => OptionsModal.close()}></div>
        </div>
      </div>
    `;
  }
}

window.addEventListener('message', ({ data }) => {
  if (data?.type === Event.OPEN_OPTIONS) {
    OptionsModal.open();
  }
});
