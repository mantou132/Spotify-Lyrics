import { html, customElement, connectStore, GemElement } from '@mantou/gem';

import { store } from '../store';

import { Song } from '../../page/lyrics';

// TODO: update current lyrics

@connectStore(store)
@customElement('song-list')
export class SongList extends GemElement {
  renderItem = (song: Song) => {
    return html`
      <div>${song.id === store.id ? '🐶' : ''}${song.name}</div>
    `;
  };

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
      </style>
      ${store.list.map(this.renderItem)}
    `;
  }
}
