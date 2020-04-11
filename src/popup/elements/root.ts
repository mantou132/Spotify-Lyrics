import { html, customElement, connectStore, GemElement } from '@mantou/gem';

import './list';
import { store, changeSong } from '../store';

@connectStore(store)
@customElement('app-root')
export class SongList extends GemElement {
  render() {
    if (store.list.length === 0) {
      return html`
        <style>
          :host {
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
          justify-content: center;
          align-items: center;
          padding: 0.75rem 0;
          margin: 0 0.875rem;
          border-top: 1px solid rgba(var(--text-rgb), 0.1);
        }
        .footer button {
          background: rgba(var(--primary-rgb), 0.9);
          color: rgba(var(--text-rgb), 1);
          transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
          padding: 0.75rem 2rem;
          line-height: 1;
          border-radius: 5rem;
          border: none;
          font-family: inherit;
          color: rgba(var(--text-rgb), 1);
          text-transform: uppercase;
        }
        .footer button:hover,
        .footer button:focus {
          background: rgba(var(--primary-rgb), 1);
          outline: none;
          transform: scale(1.06);
        }
      </style>
      <div class="main">
        <div class="notice">
          If your lyrics are not displayed or wrong, you can manually select the correct track to reload the lyrics
        </div>
        <app-track-list class="list"></app-track-list>
      </div>
      <div class="footer"><button @click=${() => changeSong(0)}>Auto select</button></div>
    `;
  }
}
