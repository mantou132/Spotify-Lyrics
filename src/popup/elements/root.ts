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
          font-weight: 400;
        }
        :host::after {
          content: '';
          display: block;
          height: 4rem;
        }
        .notice {
          padding: 0.75rem 0;
          margin: 0 0.875em;
          color: rgba(var(--text-rgb), 0.5);
          border-bottom: 1px solid rgba(var(--text-rgb), 0.2);
          font-size: 0.875rem;
        }
        .footer {
          position: absolute;
          bottom: 0;
          left: -1rem;
          width: calc(100% + 2rem);
          display: flex;
          padding: 0.75rem;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0.125rem 0.375rem black;
          background: rgb(var(--background-rgb));
        }
        .footer button {
          background: rgba(var(--text-rgb), 0.1);
          padding: 0.75rem 2rem;
          line-height: 1;
          border: none;
          color: rgba(var(--text-rgb), 1);
        }
        .footer button:hover {
          background: rgba(var(--text-rgb), 0.2);
        }
        .footer button:focus {
          outline: none;
        }
      </style>
      <div class="notice">
        If your lyrics are not displayed or wrong, you can manually select the correct track to reload the lyrics
      </div>
      <app-track-list class="list"></app-track-list>
      <div class="footer"><button @click=${() => changeSong(0)}>Auto select</button></div>
    `;
  }
}
