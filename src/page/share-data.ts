import { Message, Event } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { Song, Lyric, fetchLyric, parseLyrics, matchingLyrics, correctionLyrics } from './lyrics';
import { fetchSongList, fetchGeniusLyrics } from './genius';
import { setSong, getSong } from './store';
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
  text = '';
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

  resetData() {
    this.id = 0;
    this.aId = 0;
    this.list = [];
    this.lyrics = [];
    this.text = '';
    this.highlightLyrics = [];
  }

  // can only modify `lyrics`
  async updateLyrics() {
    if (this.id === 0) {
      this.lyrics = null;
    } else {
      const options = await optionsPromise;
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
  }

  async fetchHighlight() {
    const fetchTransName = async () => ({});
    const { id } = await matchingLyrics(this.query, false, fetchSongList, fetchTransName);
    if (id === 0) {
      this.highlightLyrics = null;
    } else {
      const { text, highlights } = await fetchGeniusLyrics(id);
      this.lyrics = correctionLyrics(this.lyrics, text);
      this.text = text;
      this.highlightLyrics = highlights;
    }
  }

  // can only modify `lyrics`/`id`/`aId`/`list`
  async matching() {
    const options = await optionsPromise;
    const parseLyricsOptions = {
      cleanLyrics: options['clean-lyrics'] === 'on',
      useTChinese: options['traditional-chinese-lyrics'] === 'on',
    };
    sendEvent(options.cid, events.searchLyrics, { cd1: this.cd1 });
    const { list, id } = await matchingLyrics(this.query);
    if (id === 0) {
      sendEvent(options.cid, events.notMatch, { cd1: this.cd1 });
    }
    this.list = list;
    const remoteData = await getSong(this.query);
    const reviewed = options['use-unreviewed-lyrics'] === 'on' || remoteData?.reviewed;
    if (remoteData?.user === options.cid && remoteData.lyric) {
      this.lyrics = parseLyrics(remoteData.lyric, parseLyricsOptions);
    } else {
      this.id =
        (remoteData?.user === options.cid || reviewed
          ? remoteData?.neteaseID || id
          : id || remoteData?.neteaseID) || 0;
      this.aId = this.id;
      await this.updateLyrics();
    }
    if (this.lyrics && this.id !== id) {
      sendEvent(options.cid, events.useRemoteMatch);
    }
    // User-made lyrics need to be reviewed
    if (!this.lyrics && remoteData?.lyric && reviewed) {
      this.lyrics = parseLyrics(remoteData.lyric, parseLyricsOptions);
      sendEvent(options.cid, events.useRemoteLyrics);
    }
    await this.fetchHighlight();
  }

  async confirmedMId() {
    const { name, artists, id } = this;
    if (this.lyrics) {
      await setSong({ name, artists, id });
    }
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
      await setSong({ name, artists, id });
      await this.matching();
      this.sendToContentScript();
    } else {
      await this.updateLyrics();
    }
  }

  async updateTrack(isTrust = false) {
    if (!document.pictureInPictureElement) return;

    const { TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await config;
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
    this.resetData();

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
