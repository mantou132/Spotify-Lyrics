import { browser } from 'webextension-polyfill-ts';
import { html, customElement, connectStore, GemElement } from '@mantou/gem';

import './list';

import { store, changeSong } from '../store';
import { events, sendEvent } from '../../common/ga';
import { I18nMsgKeys } from '../../common/consts';

@connectStore(store)
@customElement('app-root')
export class SongList extends GemElement {
  autoSelect = () => {
    sendEvent(events.autoSelectTrack);
    changeSong(0);
  };
  render() {
    if (store.list.length === 0) {
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
        <slot></slot>
      `;
    }
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          font-weight: 400;
        }
        .main {
          overflow: auto;
          flex-grow: 1;
          scrollbar-width: none;
        }
        .main::-webkit-scrollbar {
          display: none;
        }
        .notice {
          padding: 0.75rem 0;
          margin: 0 0.875rem;
          color: rgba(var(--text-rgb), 0.5);
          border-bottom: 1px solid rgba(var(--text-rgb), 0.1);
          font-size: 0.875rem;
        }
        .footer {
          display: flex;
          flex-shrink: 0;
          justify-content: center;
          align-items: center;
          padding: 0.75rem 0;
          margin: 0 0.875rem;
          border-top: 1px solid rgba(var(--text-rgb), 0.1);
        }
        .footer button {
          cursor: pointer;
          background: rgba(var(--primary-rgb), 0.9);
          color: rgba(var(--text-rgb), 1);
          transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
          padding: 0.8rem 2rem;
          line-height: 1;
          border-radius: 5rem;
          border: none;
          font-family: inherit;
          color: rgba(var(--text-rgb), 1);
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.11rem;
        }
        .footer button:hover {
          background: rgba(var(--primary-rgb), 1);
          transform: scale(1.06);
        }
        .footer button:active {
          transform: scale(1);
        }
        .footer button:focus {
          outline: none;
        }
      </style>
      <div class="main">
        <div class="notice">
          ${browser.i18n.getMessage(I18nMsgKeys.popupMatchDescription)}
        </div>
        <app-track-list class="list"></app-track-list>
      </div>
      <div class="footer">
        <button @click=${this.autoSelect}>${browser.i18n.getMessage(I18nMsgKeys.popupAutoMatch)}</button>
      </div>
    `;
  }
}
