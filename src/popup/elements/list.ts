import { html, customElement, connectStore, GemElement } from '@mantou/gem';

import './item';
import { store, changeSong } from '../store';
import { events, sendEvent } from '../../common/ga';
import { getOptions } from '../../options/store';
import { theme } from '../../common/theme';

@connectStore(store)
@customElement('app-track-list')
export class SongList extends GemElement {
  select = async (id: number) => {
    const { cid } = await getOptions();
    sendEvent(cid, events.selectTrack);
    changeSong(id);
  };
  render() {
    if (store.list.length === 0) {
      return null;
    }
    return html`
      <style>
        app-track-item:hover {
          background: rgba(${theme.textRGB}, 0.1);
        }
      </style>
      ${store.list.map(
        (song) =>
          html`
            <app-track-item @click=${() => this.select(song.id)} .song=${song}></app-track-item>
          `,
      )}
    `;
  }
}
