import { html, customElement, connectStore, GemElement, property } from '@mantou/gem';

import { store } from '../store';

import { Song } from '../../page/lyrics';

@connectStore(store)
@customElement('app-track-item')
export class SongItem extends GemElement {
  @property song: Song | undefined;

  render() {
    if (!this.song) return null;
    const { id, name, artists, album } = this.song;
    const checked = id === store.id;
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          padding: 0.75rem 0.875em;
          cursor: default;
          background: rgba(var(--text-rgb), 0);
          color: rgba(var(--text-rgb), 1);
        }
        .track-info {
          line-height: 1.375;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .track-info div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .artist-name {
          font-size: 0.875rem;
          color: rgba(var(--text-rgb), 0.5);
        }
        .status {
          padding-left: 1rem;
        }
      </style>
      <div class="track-info">
        <div class="track-name">${name}</div>
        <div class="artist-name">
          <span>${artists.map(({ name }) => name).join(',')}</span> • <span>${album.name}</span>
        </div>
      </div>
      ${checked ? html`<div class="status">✓</div>` : null}
    `;
  }

  mounted() {
    this.effect(
      () => {
        if (this.song?.id === store.id) {
          this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      },
      () => [store.id],
    );
  }
}
