import { Message, Event } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { Song, Lyric, fetchLyric, parseLyrics, matchingLyrics, correctionLyrics } from './lyrics';
import { fetchSongList, fetchGeniusLyrics } from './genius';
import { setSong, getSong } from './store';
import { optionsPromise } from './options';
import { captureException } from './utils';
import { audioPromise, lyricVideoIsOpen } from './element';
import config from './config';

export class SharedData {
  private _name = '';
  private _artists = '';
  private _id = 0;
  private _aId = 0;
  private _list: Song[] = [];
  private _lyrics: Lyric = [];
  private _error: Error | null = null;
  private _text = '';
  private _highlightLyrics: string[] | null = [];
  private _abortController = new AbortController();

  get cd1() {
    return `${this._name} - ${this._artists}`;
  }

  get cd2() {
    return `${this._id}`;
  }

  get query() {
    return { name: this._name, artists: this._artists };
  }

  get text() {
    return this._text;
  }

  get highlightLyrics() {
    return this._highlightLyrics;
  }

  get error() {
    return this._error;
  }

  get lyrics() {
    return this._lyrics;
  }

  get name() {
    return this._name;
  }

  get artists() {
    return this._artists;
  }

  setLyrics(lyrics: Lyric) {
    this._lyrics = lyrics && [...lyrics];
  }

  resetLyrics() {
    this._lyrics = [];
    this._error = null;
    this._abortController.abort();
    this._abortController = new AbortController();
  }

  resetData() {
    this.resetLyrics();
    this._id = 0;
    this._name = '';
    this._artists = '';
    this._aId = 0;
    this._list = [];
    this._text = '';
    this._highlightLyrics = [];
  }

  // can only modify `lyrics`
  async updateLyrics(fetchOptions: RequestInit) {
    if (this._id === 0) {
      this._lyrics = null;
    } else {
      const options = await optionsPromise;
      const lyricsStr = await fetchLyric(this._id, fetchOptions);
      if (lyricsStr === '') {
        sendEvent(options.cid, events.noLyrics, { cd1: this.cd1, cd2: this.cd2 });
        this._lyrics = null;
      } else {
        this._lyrics = await parseLyrics(lyricsStr, {
          cleanLyrics: options['clean-lyrics'] === 'on',
          useTChinese: options['traditional-chinese-lyrics'] === 'on',
        });
      }
    }
  }

  async fetchHighlight(fetchOptions: RequestInit) {
    const fetchTransName = async () => ({});
    const { id } = await matchingLyrics(this.query, {
      onlySearchName: false,
      fetchData: fetchSongList,
      fetchTransName,
      fetchOptions,
    });
    if (id === 0) {
      this._highlightLyrics = null;
    } else {
      const { text, highlights } = await fetchGeniusLyrics(id, fetchOptions);
      this._lyrics = correctionLyrics(this._lyrics, text);
      this._text = text;
      this._highlightLyrics = highlights;
    }
  }

  // can only modify `lyrics`/`id`/`aId`/`list`
  async matching(fetchOptions: RequestInit) {
    const audio = await audioPromise;
    const startTime = audio.currentSrc ? performance.now() : null;
    const options = await optionsPromise;
    const parseLyricsOptions = {
      cleanLyrics: options['clean-lyrics'] === 'on',
      useTChinese: options['traditional-chinese-lyrics'] === 'on',
    };
    const { list, id } = await matchingLyrics(this.query, {
      getAudioElement: () => audio,
      fetchOptions,
    });
    this._list = list;
    const remoteData = await getSong(this.query, fetchOptions);
    const reviewed = options['use-unreviewed-lyrics'] === 'on' || remoteData?.reviewed;
    const isSelf = remoteData?.user === options.cid;
    if (isSelf && remoteData?.lyric) {
      this._lyrics = await parseLyrics(remoteData.lyric, parseLyricsOptions);
      sendEvent(options.cid, events.useRemoteLyrics);
    } else if (isSelf && remoteData?.neteaseID) {
      this._id = remoteData.neteaseID;
      this._aId = this._id;
      await this.updateLyrics(fetchOptions);
    } else if (reviewed && remoteData?.lyric) {
      this._lyrics = await parseLyrics(remoteData.lyric, parseLyricsOptions);
      sendEvent(options.cid, events.useRemoteLyrics);
    } else {
      this._id = (reviewed ? remoteData?.neteaseID || id : id || remoteData?.neteaseID) || 0;
      this._aId = this._id;
      await this.updateLyrics(fetchOptions);
    }
    if (this._lyrics && this._id !== id) {
      sendEvent(options.cid, events.useRemoteMatch);
    }
    if (!this._lyrics && id === 0) {
      sendEvent(options.cid, events.notMatch, { cd1: this.cd1 });
    }
    if (startTime) {
      const ev = (performance.now() - startTime).toFixed();
      sendEvent(options.cid, { ev, ...events.loadLyrics }, { cd1: this.cd1 });
    }
    this.fetchHighlight(fetchOptions);
  }

  async confirmedMId() {
    const { _name, _artists, _id } = this;
    try {
      if (this._lyrics) {
        await setSong({ name: _name, artists: _artists, id: _id });
      }
      this._aId = _id;
      this.sendToContentScript();
    } catch (e) {
      this._error = e;
    }
  }

  async chooseLyricsTrack({ id, name, artists }: PopupStore) {
    if (id === this._id) return;
    if (name !== this._name || artists !== this._artists) return;
    this._id = id;
    this.resetLyrics();
    try {
      const fetchOptions = { signal: this._abortController.signal };
      if (id === 0) {
        // reset
        await setSong({ name, artists, id });
        await this.matching(fetchOptions);
        this.sendToContentScript();
      } else {
        await this.updateLyrics(fetchOptions);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        this._error = e;
      }
    }
  }

  async updateTrack(isTrust = false) {
    if (!lyricVideoIsOpen) return;

    const { TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await config;
    const name = document.querySelector(TRACK_NAME_SELECTOR)?.textContent;
    const artists = document.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;

    try {
      if (this._name === name && this._artists === artists) {
        return;
      }
      if (!name || !artists) {
        if (isTrust) {
          throw new Error(`Track info not found`);
        }
        return;
      }
      this.resetData();
      this._name = name;
      this._artists = artists;
      await this.matching({ signal: this._abortController.signal });
    } catch (e) {
      if (e.name !== 'AbortError') {
        this._error = e;
        captureException(e);
      }
    }
    this.sendToContentScript();
  }

  sendToContentScript() {
    const { _name, _artists, _id, _aId, _list } = this;
    const msg: Message<PopupStore> = {
      type: Event.SEND_SONGS,
      data: {
        name: _name,
        artists: _artists,
        id: _id,
        aId: _aId,
        list: _list,
      },
    };
    window.postMessage(msg, '*');
  }
}

export const sharedData = new SharedData();
