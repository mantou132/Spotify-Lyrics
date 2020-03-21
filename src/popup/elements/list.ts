import { html, customElement, connectStore, GemElement } from '@mantou/gem';

import './item';
import { store, changeSong } from '../store';

@connectStore(store)
@customElement('app-track-list')
export class SongList extends GemElement {
  render() {
    if (store.list.length === 0) {
      return null;
    }
    return html`
      <style>
        app-track-item:hover {
          background: rgba(var(--text-rgb), 0.1);
        }
      </style>
      ${store.list.map(
        song =>
          html`
            <app-track-item @click=${() => changeSong(song.id)} .song=${song}></app-track-item>
          `,
      )}
    `;
  }
}
