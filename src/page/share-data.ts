/**
 * Used to update the data and synchronize with Popup and Lyrics Editor,
 * while the data is rendered into the PIP
 */
import { Cache } from 'duoyun-ui/lib/cache';

import { Message, Event } from '../common/constants';
import { sendEvent, events } from '../common/ga';

import { PopupStore } from '../popup/store';

import { Song, Lyric, fetchLyric, parseLyrics, matchingLyrics, correctionLyrics } from './lyrics';
import { fetchSongList, fetchGeniusLyrics } from './genius';
import { setSong, getSong } from './store';
import { optionsPromise } from './options';
import { captureException, querySelector } from './utils';
import { audioPromise } from './element';
import { configPromise } from './config';
import { fetchNetEaseSongList } from './netease';
import { fetchLRCLIBSongList } from './lrclib';

interface CacheReq {
  name: string;
  artists: string;
  duration: number;
  getLyrics?: (fetchOptions: RequestInit) => Promise<string>;
}

interface CacheItem {
  name: string;
  artists: string;
  resolveDuration: (duration: number) => void;
  durationPromise: Promise<number>;
  getLyrics: (fetchOptions: RequestInit) => Promise<string>;
}

const cacheStore = new Cache<CacheItem>({ max: 100, renewal: true });
const getCache = (name: string, artists: string) => {
  return cacheStore.get([name, artists].join(), () => {
    let _resolveDuration = (_: number) => {
      //
    };
    const _durationPromise = new Promise<number>((res) => (_resolveDuration = res));
    return {
      name,
      artists,
      resolveDuration: _resolveDuration,
      durationPromise: _durationPromise,
      getLyrics: async () => '',
    };
  });
};

export class SharedData {
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
    return { name: this._name, artists: this._artists };
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
    this._aId = 0;
    this._list = [];
    this._text = '';
    this._highlightLyrics = [];
  }

  private async _getParseLyricsOptions() {
    const options = await optionsPromise;
    return {
      cleanLyrics: options['clean-lyrics'] === 'on',
      lyricsTransform: options['lyrics-transform'],
    };
  }

  private async _getLyricsFromAPI(fetchOptions: RequestInit) {
    if (this._id === 0) {
      return null;
    }
    const options = await optionsPromise;
    const lyricsStr = await fetchLyric(this._id, fetchOptions);
    if (lyricsStr === '') {
      sendEvent(options.cid, events.noLyrics, { cd1: this.cd1, cd2: this.cd2 });
      return null;
    }
    return parseLyrics(lyricsStr, await this._getParseLyricsOptions());
  }

  private async _getLyricsFromBuiltIn(fetchOptions: RequestInit) {
    const lrc = await getCache(this.name, this.artists).getLyrics(fetchOptions);
    return parseLyrics(lrc, await this._getParseLyricsOptions());
  }

  private async _fetchHighlight(fetchOptions: RequestInit) {
    const fetchTransName = async () => ({});
    const { id } = await matchingLyrics(this.req, {
      onlySearchName: false,
      fetchSongList,
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

  cacheTrackAndLyrics(info: CacheReq) {
    const cache = getCache(info.name, info.artists);
    cache.resolveDuration(info.duration);
    if (info.getLyrics) cache.getLyrics = info.getLyrics;
  }

  // can only modify `lyrics`/`id`/`aId`/`list`
  private async _matching(fetchOptions: RequestInit) {
    const audio = await audioPromise;
    const startTime = audio.currentSrc ? performance.now() : null;
    const options = await optionsPromise;
    const parseLyricsOptions = await this._getParseLyricsOptions();
    const [{ list, id }, remoteData] = await Promise.all([
      matchingLyrics(this.req, {
        fetchSongList:
          options['lyrics-server'] === 'NetEase' ? fetchNetEaseSongList : fetchLRCLIBSongList,
        getDuration: async () => {
          const audioMetadataLoaded = new Promise<any>((res) =>
            audio.addEventListener('loadedmetadata', res, { once: true }),
          );
          return Promise.any<number>([
            getCache(this._name, this._artists).durationPromise,
            audio.duration || (await audioMetadataLoaded) || audio.duration,
          ]);
        },
        fetchOptions,
      }),
      getSong(this.req, fetchOptions),
    ]);
    this._list = list;
    const reviewed = options['use-unreviewed-lyrics'] === 'on' || remoteData?.reviewed;
    const isSelf = remoteData?.user === options.cid;

    // 1. use uploaded lyrics
    if (isSelf && remoteData?.lyric) {
      this._lyrics = parseLyrics(remoteData.lyric, parseLyricsOptions);
      sendEvent(options.cid, events.useRemoteLyrics);
    }

    // 2. use selected lyrics
    else if (isSelf && remoteData?.neteaseID) {
      this._id = remoteData.neteaseID;
      this._aId = this._id;
      this._lyrics = await this._getLyricsFromAPI(fetchOptions);
    }

    // 3. use other user upload lyrics
    else if (reviewed && remoteData?.lyric) {
      this._lyrics = parseLyrics(remoteData.lyric, parseLyricsOptions);
      sendEvent(options.cid, events.useRemoteLyrics);
    }

    // **default behavior**
    // 4. use build-in lyrics or netease lyrics
    else {
      this._id = (reviewed ? remoteData?.neteaseID || id : id || remoteData?.neteaseID) || 0;
      this._aId = this._id;
      // Allow adjustment order
      const getLyricsList = [
        this._getLyricsFromAPI.bind(this),
        this._getLyricsFromBuiltIn.bind(this),
      ];
      try {
        this._lyrics = await getLyricsList[0](fetchOptions);
      } catch {
        //
      }
      if (this._lyrics === null) {
        this._lyrics = await getLyricsList[1](fetchOptions);
      }
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

    // 5. use song highlight
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
        this._lyrics = await this._getLyricsFromAPI(fetchOptions);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        this._error = e;
      }
    }
  }

  async dispatchTrackElementUpdateEvent(isUserAction = false) {
    const { TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await configPromise;
    const name = querySelector(TRACK_NAME_SELECTOR)?.textContent;
    const artists = querySelector(TRACK_ARTIST_SELECTOR)?.textContent;

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
      await this._matching({ signal: this._abortController.signal });
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
