import { html, customElement, connectStore, GemElement } from '@mantou/gem';

import { store, changeSong, confirmedMId, cancelMId } from '../store';
import { events, sendEvent } from '../../common/ga';
import { getOptions } from '../../options/store';
import { theme } from '../../common/theme';
import { i18n } from '../../i18n';

import './list';

window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'i') {
    const id = Number(prompt('Enter NetEase Cloud Music ID:'));
    if (id) changeSong(id);
  }
});

@connectStore(store)
@customElement('app-root')
export class SongList extends GemElement {
  autoSelect = async () => {
    const { cid } = await getOptions();
    sendEvent(cid, events.autoSelectTrack);
    changeSong(0);
  };

  // https://github.com/mantou132/Spotify-Lyrics/issues/105
  // 不知道为什么第一次不能渲染内容
  // 让他延时渲染内容就可以了
  // ？？？？？？？？？？？？？？？？？？？？？？
  #rendered = false;
  mounted = () => {
    setTimeout(() => {
      this.#rendered = true;
      this.update();
    }, 200);
  };
  render() {
    if (store.list.length === 0 && !store.id) {
      return html`
        <style>
          :host {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
          }
        </style>
        ${this.#rendered ? html`<slot></slot>` : ''}
      `;
    }
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          font-weight: 400;
        }
        .header {
          display: flex;
          flex-shrink: 0;
          padding: 1rem 0;
          margin: 0 0.875rem;
          border-bottom: 1px solid rgba(${theme.textRGB}, 0.2);
          color: rgba(${theme.textRGB}, 0.5);
        }
        .header p {
          margin: 0;
          flex-grow: 1;
        }
        .highlight {
          color: rgba(${theme.primaryRGB}, 1);
        }
        .header .button {
          border-bottom: 1px dotted;
        }
        .header .button:hover {
          cursor: default;
          color: rgba(${theme.textRGB}, 1);
        }
        .header button {
          background: transparent;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0;
          margin-left: 0.5rem;
          line-height: 1rem;
          letter-spacing: 0.1em;
          border: none;
          color: inherit;
        }
        .header button:hover {
          color: rgba(${theme.textRGB}, 1);
        }
        .header button:focus {
          outline: none;
        }
        .main {
          overflow: auto;
          flex-grow: 1;
          scrollbar-width: none;
        }
        .main::-webkit-scrollbar {
          display: none;
        }
      </style>
      <div class="header">
        ${store.id && store.id !== store.aId
          ? html`
              <p class="highlight">${i18n.popupConfirmTip()}</p>
              <button @click=${cancelMId}>${i18n.popupConfirmCancel()}</button>
              <button @click=${confirmedMId}>${i18n.popupConfirmSave()}</button>
            `
          : html`
              <p>
                ${i18n.popupMatchDescription1()}
                <span @click=${this.autoSelect} class="button">
                  ${i18n.popupMatchDescription2()}
                </span>
                ${i18n.popupMatchDescription3()}
              </p>
            `}
      </div>
      <div class="main">
        <app-track-list class="list"></app-track-list>
      </div>
    `;
  }
}
