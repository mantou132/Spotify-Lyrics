import { html, customElement, connectStore, GemElement, property } from '@mantou/gem';

import { store } from '../store';

import { Song } from '../../page/lyrics';

@connectStore(store)
@customElement('song-item')
export class SongItem extends GemElement {
  @property song: Song;

  render() {
    if (!this.song) {
      return html`
        <slot></slot>
      `;
    }
    const { id, name } = this.song;
    return html`
      <style>
        :host {
          display: block;
          cursor: default;
        }
      </style>
      ${id === store.id ? '✅ ' : ''}${name}
    `;
  }
}
