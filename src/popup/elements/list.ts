import { html, customElement, connectStore, GemElement } from '@mantou/gem';

import './item';
import { store, changeSong } from '../store';

@connectStore(store)
@customElement('song-list')
export class SongList extends GemElement {
  render() {
    if (store.list.length === 0) {
      return html`
        <slot></slot>
      `;
    }
    return html`
      <style>
        :host {
          width: 100%;
          height: 100%;
          overflow: auto;
        }
        div {
          font-style: italic;
        }
        song-item,
        div {
          padding: 0.2em 0.5em;
          border-bottom: 1px solid #ccc;
        }
        song-item:hover {
          background: #eee;
        }
      </style>
      <div>
        If your lyrics are not displayed or wrong, you can manually select the correct track to reload the lyrics
      </div>
      <div><button @click=${() => changeSong(0)}>Auto select</button></div>
      ${store.list.map(
        song =>
          html`
            <song-item @click=${() => changeSong(song.id)} .song=${song}></song-item>
          `,
      )}
    `;
  }
}
