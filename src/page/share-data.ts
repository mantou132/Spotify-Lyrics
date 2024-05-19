/**
 * Used to update the data and synchronize with Popup and Lyrics Editor,
 * while the data is rendered into the PIP
 *
 * 1. The built -in lyrics cache through the API intercept
 *    (cannot be sure that this call is the current played song)
 * 2. Triggering lyrics update based on UI update
 *    1. get cache
 *    2. fetch NetEase data
 *    3. fetch Google Firebase data
 *    4. fetch Genius data
 * 3. Sync to popup，response popup user interaction
 * 4. Response lyrics editor user interaction
 */
import { Cache } from 'duoyun-ui/lib/cache';

import { Message, Event } from '../common/constants';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { Song, Lyric, fetchLyric, parseLyrics, matchingLyrics, correctionLyrics } from './lyrics';
import { fetchSongList, fetchGeniusLyrics } from './genius';
import { setSong, getSong } from './store';
import { optionsPromise } from './options';
import { captureException } from './utils';
import { audioPromise } from './element';
import { configPromise } from './config';

interface CacheItem {
  name: string;
  artists: string;
  duration: number;
  lyrics?: Lyric;
  promiseLyrics?: Promise<Lyric | undefined>;
  getLyrics?: () => Promise<Lyric | undefined>;
}

const cacheStore = new Cache<CacheItem>({ max: 100, renewal: true });
const setCache = (info: CacheItem) => cacheStore.set([info.name, info.artists].join(), info);
const getCache = (name: string, artists: string) => cacheStore.get([name, artists].join());

export class SharedData {
  // optional
  private _duration = 0;

  // Popup data
  private _name = '';
  private _artists = '';
  private _id = 0;
  private _aId = 0;
  private _list: Song[] = [];

  // PIP data
  private _text = '';
  private _highlightLyrics: string[] | null = [];
  // length 0 is loading
  // null is no lyrics
  private _lyrics: Lyric = [];
  private _error: Error | null = null;
  private _abortController = new AbortController();

  get cd1() {
    return `${this._name} - ${this._artists}`;
  }

  get cd2() {
    return `${this._id}`;
  }

  get req() {
    return { name: this._name, artists: this._artists, duration: this._duration };
  }

  get text() {
    return this._text;
  }

  get highlightLyrics() {
    return this._highlightLyrics;
  }

  get lyrics() {
    return this._lyrics;
  }

  get error() {
    return this._error;
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

  private _cancelRequest() {
    this._abortController.abort();
    this._abortController = new AbortController();
  }

  private _resetLyrics() {
    this._lyrics = [];
    this._error = null;
    this._cancelRequest();
  }

  resetData() {
    this._resetLyrics();
    this._id = 0;
    this._name = '';
    this._artists = '';
    this._duration = 0;
    this._aId = 0;
    this._list = [];
    this._text = '';
    this._highlightLyrics = [];
  }

  // can only modify `lyrics`
  private async _updateLyrics(fetchOptions: RequestInit) {
    if (this._id === 0) {
      this._lyrics = null;
    } else {
      const options = await optionsPromise;
      const lyricsStr = await fetchLyric(this._id, fetchOptions);
      if (lyricsStr === '') {
        sendEvent(options.cid, events.noLyrics, { cd1: this.cd1, cd2: this.cd2 });
        this._lyrics = null;
      } else {
        this._lyrics = parseLyrics(lyricsStr, {
          cleanLyrics: options['clean-lyrics'] === 'on',
          lyricsTransform: options['lyrics-transform'],
        });
      }
    }
  }

  private async _fetchHighlight(fetchOptions: RequestInit) {
    const fetchTransName = async () => ({});
    const { id } = await matchingLyrics(this.req, {
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
  private async _matching(fetchOptions: RequestInit) {
    const audio = await audioPromise;
    const startTime = audio.currentSrc ? performance.now() : null;
    const options = await optionsPromise;
    const parseLyricsOptions = {
      cleanLyrics: options['clean-lyrics'] === 'on',
      lyricsTransform: options['lyrics-transform'],
    };
    const [{ list, id }, remoteData] = await Promise.all([
      matchingLyrics(this.req, {
        getAudioElement: () => audio,
        fetchOptions,
      }),
      getSong(this.req, fetchOptions),
    ]);
    if (id === 0 && (await this._restoreLyrics(true))) return;
    this._list = list;
    const reviewed = options['use-unreviewed-lyrics'] === 'on' || remoteData?.reviewed;
    const isSelf = remoteData?.user === options.cid;
    if (isSelf && remoteData?.lyric) {
      this._lyrics = parseLyrics(remoteData.lyric, parseLyricsOptions);
      sendEvent(options.cid, events.useRemoteLyrics);
    } else if (isSelf && remoteData?.neteaseID) {
      this._id = remoteData.neteaseID;
      this._aId = this._id;
      await this._updateLyrics(fetchOptions);
    } else if (reviewed && remoteData?.lyric) {
      this._lyrics = parseLyrics(remoteData.lyric, parseLyricsOptions);
      sendEvent(options.cid, events.useRemoteLyrics);
    } else {
      this._id = (reviewed ? remoteData?.neteaseID || id : id || remoteData?.neteaseID) || 0;
      this._aId = this._id;
      await this._updateLyrics(fetchOptions);
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
    this._fetchHighlight(fetchOptions);
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
    this._resetLyrics();
    try {
      const fetchOptions = { signal: this._abortController.signal };
      if (id === 0) {
        // reset
        await setSong({ name, artists, id });
        await this._matching(fetchOptions);
        this.sendToContentScript();
      } else {
        await this._updateLyrics(fetchOptions);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        this._error = e;
      }
    }
  }

  async dispatchTrackElementUpdateEvent(isUserAction = false) {
    const { TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await configPromise;
    const name = document.querySelector(TRACK_NAME_SELECTOR)?.textContent;
    const artists = document.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;

    try {
      if (this._name === name && this._artists === artists) {
        return;
      }
      if (!name || !artists) {
        if (isUserAction) {
          throw new Error(`Track info not found`);
        }
        return;
      }
      this.resetData();
      this._name = name;
      this._artists = artists;
      // case1: spotify metadata API call before of UI update
      if (!(await this._restoreLyrics())) {
        await this._matching({ signal: this._abortController.signal });
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        this._error = e;
        captureException(e);
      }
    }
    this.sendToContentScript();
  }

  async cacheTrackAndLyrics(info: CacheItem) {
    if (getCache(info.name, info.artists)) return;
    setCache(info);
    // case2: spotify metadata API call after of UI update
    // current behavior
    if (this.name === info.name && this.artists === info.artists) {
      if (await this._restoreLyrics()) {
        this._cancelRequest();
      }
    }
  }

  private async _restoreLyrics(isForce = false) {
    const cache = getCache(this.name, this.artists);
    if (cache) {
      this._duration = cache.duration;
      if (cache.lyrics || cache.getLyrics) {
        try {
          const lyrics = cache.lyrics || (await (cache.promiseLyrics ||= cache.getLyrics?.()));
          if (lyrics) {
            cache.lyrics = lyrics;
            // 如果使用简体歌词，那么只更新缓存
            if (!isForce && (await optionsPromise)['lyrics-transform'] === 'Simplified') return;
            this._lyrics = lyrics;
            return true;
          }
        } catch {
          //
        }
      }
    }
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
