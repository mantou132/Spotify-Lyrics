import { Message, Event, USER_SELECT_USE_LOCAL } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { Song, Lyric, fetchLyric, parseLyrics, matchingLyrics } from './lyrics';
import { fetchSongList, fetchHighlightLyrics } from './genius';
import { setSongId, getSongId } from './store';
import { optionsPromise } from './options';
import { captureException } from './utils';
import config from './config';

export class SharedData {
  name = '';
  artists = '';
  id = 0;
  aId = 0;
  list: Song[] = [];
  lyrics: Lyric = [];
  highlightLyrics: string[] | null = [];

  get cd1() {
    return `${this.name} - ${this.artists}`;
  }

  get cd2() {
    return `${this.id}`;
  }

  get query() {
    return { name: this.name, artists: this.artists };
  }

  removeLyrics() {
    this.lyrics = [];
    this.highlightLyrics = [];
  }

  // can only modify `lyrics`
  async updateLyrics() {
    const options = await optionsPromise;
    if (this.id === 0) {
      this.lyrics = null;
    } else {
      const lyricsStr = await fetchLyric(this.id);
      if (lyricsStr === '') {
        sendEvent(options.cid, events.noLyrics, { cd1: this.cd1, cd2: this.cd2 });
        this.lyrics = null;
      } else {
        this.lyrics = parseLyrics(lyricsStr, {
          cleanLyrics: options['clean-lyrics'] === 'on',
          useTChinese: options['traditional-chinese-lyrics'] === 'on',
        });
      }
    }
    if (!this.lyrics) {
      await this.fetchHighlight();
    }
  }

  async fetchHighlight() {
    const fetchTransName = async () => ({});
    const { id } = await matchingLyrics(this.query, false, fetchSongList, fetchTransName);
    if (id === 0) {
      this.highlightLyrics = null;
    } else {
      this.highlightLyrics = await fetchHighlightLyrics(id);
    }
  }

  // can only modify `lyrics`/`id`/`aId`/`list`
  async matching() {
    const options = await optionsPromise;
    sendEvent(options.cid, events.searchLyrics, { cd1: this.cd1 });
    const { list, id } = await matchingLyrics(this.query);
    if (id === 0) {
      sendEvent(options.cid, events.notMatch, { cd1: this.cd1 });
    }
    this.list = list;
    this.id = (await getSongId(this.query)) || id;
    this.aId = this.id;
    await this.updateLyrics();
  }

  async confirmedMId() {
    const { name, artists, id } = this;
    await setSongId({ name, artists, id });
    this.aId = id;
    this.sendToContentScript();
  }

  async chooseLyricsTrack({ id, name, artists }: PopupStore) {
    if (id === this.id) return;
    if (name !== this.name || artists !== this.artists) return;
    this.id = id;
    this.lyrics = [];
    if (id === 0) {
      // reset
      await setSongId({ name, artists, id });
      await this.matching();
      this.sendToContentScript();
    } else {
      if (USER_SELECT_USE_LOCAL) this.confirmedMId();
      await this.updateLyrics();
    }
  }

  async updateTrack(isTrust = false) {
    if (!document.pictureInPictureElement) return;

    const { TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR, BTN_LIKE_SELECTOR } = await config;
    const name = document.querySelector(TRACK_NAME_SELECTOR)?.textContent;
    const artists = document.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;
    if (!name || !artists) {
      if (isTrust) {
        captureException(new Error(`Track info not found`));
      }
      return;
    }
    this.name = name;
    this.artists = artists;
    this.id = 0;
    this.aId = 0;
    this.list = [];
    this.removeLyrics();

    const likeBtn = document.querySelector(BTN_LIKE_SELECTOR);
    const likeBtnRect = likeBtn?.getBoundingClientRect();
    if (!likeBtnRect?.width || !likeBtnRect.height) {
      return;
    }

    try {
      await this.matching();
    } catch (e) {
      captureException(e);
    }
    this.sendToContentScript();
  }

  sendToContentScript() {
    const { name, artists, id, aId, list } = this;
    const msg: Message<PopupStore> = {
      type: Event.SEND_SONGS,
      data: {
        name,
        artists,
        id,
        aId,
        list,
      },
    };
    window.postMessage(msg, '*');
  }
}

export const sharedData = new SharedData();
