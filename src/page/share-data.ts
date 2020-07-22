import { Message, Event } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { Song, Lyric, fetchLyric, parseLyrics, matchingLyrics } from './lyrics';
import config from './config';
import { setSongId, getSongId } from './store';
import { optionsPromise } from './options';
import { captureException } from './utils';

export class SharedData {
  name = '';
  artists = '';
  id = 0;
  list: Song[] = [];
  lyrics: Lyric = [];

  get cd1() {
    return `${this.name} - ${this.artists}`;
  }

  get cd2() {
    return `${this.id}`;
  }

  removeLyrics() {
    this.lyrics = [];
  }

  // can only modify `lyrics`
  async fetchLyrics() {
    const options = await optionsPromise;
    if (this.id === 0) {
      this.lyrics = null;
    } else {
      const lyricsStr = await fetchLyric(this.id);
      if (lyricsStr === '') {
        sendEvent(options.cid, events.noLyrics, { cd1: this.cd1, cd2: this.cd2 });
        this.lyrics = null;
      } else {
        this.lyrics = parseLyrics(lyricsStr, options['clean-lyrics'] === 'on');
      }
    }
  }

  // can only modify `lyrics`/`id`/`list`
  async matchingLyrics() {
    const options = await optionsPromise;
    const query = { name: this.name, artists: this.artists };
    sendEvent(options.cid, events.searchLyrics, { cd1: this.cd1 });
    const { list, id } = await matchingLyrics(query);
    if (id === 0) {
      sendEvent(options.cid, events.notMatch, { cd1: this.cd1 });
    }
    this.id = id;
    this.list = list;
    const saveId = await getSongId(query);
    if (saveId) this.id = saveId;
    await this.fetchLyrics();
  }

  async chooseLyricsTrack({ id, name, artists }: PopupStore) {
    if (name !== this.name || artists !== this.artists) return;
    this.id = id;
    this.lyrics = [];
    await setSongId({ name, artists, id });
    if (id === 0) {
      // auto matching
      await this.matchingLyrics();
      this.sendToContentScript();
    } else {
      await this.fetchLyrics();
    }
  }

  async updateTrack(isTrust = false) {
    if (!document.pictureInPictureElement) return;

    const { TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await config;
    const name = document.querySelector(TRACK_NAME_SELECTOR)?.textContent;
    const artists = document.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;
    if (!name || !artists) {
      if (isTrust) {
        captureException(new Error(`Can't find track info`));
      }
      return;
    }
    this.name = name;
    this.artists = artists;
    this.id = 0;
    this.list = [];
    this.lyrics = [];
    try {
      await this.matchingLyrics();
    } finally {
      this.sendToContentScript();
    }
  }

  sendToContentScript() {
    const msg: Message<PopupStore> = {
      type: Event.SEND_SONGS,
      data: {
        name: this.name,
        artists: this.artists,
        id: this.id,
        list: this.list,
      },
    };
    window.postMessage(msg, '*');
  }
}

export const sharedData = new SharedData();
