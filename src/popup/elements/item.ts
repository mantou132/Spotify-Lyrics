import { html, customElement, connectStore, GemElement, property } from '@mantou/gem';

import { store } from '../store';

import { Song } from '../../page/lyrics';
import { theme } from '../../common/theme';

@connectStore(store)
@customElement('app-track-item')
export class SongItem extends GemElement {
  @property song: Song | undefined;

  render() {
    if (!this.song) return null;
    const { id, name, artists, album, duration } = this.song;
    const durationText = duration
      ? `${Math.floor(duration / 1000 / 60)}:${(Math.floor(duration / 1000) % 60)
          .toString()
          .padStart(2, '0')}`
      : '';
    const checked = id === store.id;
    const artist = artists.map(({ name }) => name).join(',');
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          padding: 0.75rem 0.875em;
          cursor: default;
          background: rgba(${theme.textRGB}, 0);
          color: rgba(${theme.textRGB}, 1);
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
          color: rgba(${theme.textRGB}, 0.5);
        }
        .status {
          padding-left: 1rem;
        }
      </style>
      <div class="track-info">
        <div title=${name} class="track-name">${name}</div>
        <div class="artist-name">
          <span title="id: ${id}">${durationText}</span>
          • <span title=${artist}>${artist}</span> •
          <span title=${album.name}>${album.name}</span>
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
