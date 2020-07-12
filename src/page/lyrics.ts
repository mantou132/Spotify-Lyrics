import sify from 'chinese-conv/tongwen/tongwen-ts';

import { Message, Event } from '../common/consts';
import { events, sendEvent } from '../common/ga';

import config from './config';

import { Query } from './observer';
import { getSongId } from './store';
import { optionsPromise } from './options';

export interface Artist {
  name: string;
}
export interface Album {
  name: string;
}
export interface Song {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
}

interface SearchResult {
  result?: {
    songs?: Song[];
  };
}

export interface SharedData {
  // current track name
  name: string;
  // current track artists
  artists: string;
  // track list
  list: Song[];
  // selected track
  id: number;
}

interface SongResult {
  lrc?: {
    lyric?: string;
  };
}

const getText = (s: string) => {
  const text = s.replace(/\(.*\)|（.*）|- .*remix$/i, '').trim();
  return text.length > 2 ? text : s;
};

const getHalfSizeText = (s: string) => {
  return s
    .replace(/，/g, ',')
    .replace(/。/g, '.')
    .replace(/、/g, ',')
    .replace(/‘|’/g, "'");
};

const removeSongFeat = (s: string) => {
  return s.replace(/\(feat\..*\)$/i, '').trim();
};

const sharedData: SharedData = { list: [], id: 0, name: '', artists: '' };
export function sendMatchedData(data?: Partial<SharedData>) {
  if (data) Object.assign(sharedData, data);
  const msg: Message = { type: Event.SEND_SONGS, data: sharedData };
  window.postMessage(msg, '*');
}

async function searchSong(query: Query) {
  const options = await optionsPromise;
  sendEvent(options.cid, events.searchLyrics);
  const { name = '', artists = '' } = query;
  const simplifiedName = sify(name);
  const simplifiedArtists = sify(artists);
  const { API_HOST } = await config;
  const searchQuery = new URLSearchParams({ type: '1 ', keywords: `${artists} ${removeSongFeat(name)}`, limit: '100' });
  let songId = 0;
  let songs: Song[] = [];
  try {
    const { result }: SearchResult = await (await fetch(`${API_HOST}/search?${searchQuery}`)).json();
    songs = result?.songs || [];
    let score = 0;
    songs.forEach(song => {
      let currentScore = options['strict-mode'] === 'on' ? 0 : 3;

      if (song.name === name) {
        currentScore += 10;
      } else if (song.name.toLowerCase() === name.toLowerCase()) {
        currentScore += 9;
      } else if (song.name === simplifiedName) {
        currentScore += 8;
      } else if (
        getHalfSizeText(song.name) === getHalfSizeText(name) ||
        getHalfSizeText(song.name) === getHalfSizeText(simplifiedName)
      ) {
        currentScore += 7;
        if (getHalfSizeText(song.name).length > 2) {
          currentScore += 1;
        }
      } else if (getText(song.name) === getText(name)) {
        currentScore += 7;
      }

      const queryArtistsArr = artists.split(',').sort();
      const artistsArr = song.artists.map(e => e.name).sort();
      const simplifiedQueryArtistsArr = simplifiedArtists.split(',').sort();
      const simplifiedArtistsArr = song.artists.map(e => sify(e.name)).sort();
      const l = queryArtistsArr.length + artistsArr.length;
      if (queryArtistsArr.join(',') === artistsArr.join(',')) {
        currentScore += 9;
      } else if (
        simplifiedArtists
          .split(',')
          .sort()
          .join(',') === artistsArr.join(',')
      ) {
        currentScore += 9;
      } else if (new Set([...queryArtistsArr, ...artistsArr]).size < l) {
        currentScore += 8;
      } else if (
        new Set([...queryArtistsArr.map(e => e.toLowerCase()), ...artistsArr.map(e => e.toLowerCase())]).size < l
      ) {
        currentScore += 7;
      } else if (new Set([...simplifiedQueryArtistsArr, ...simplifiedArtistsArr]).size < l) {
        currentScore += 7;
      }

      if (currentScore > score) {
        if (currentScore > 10) {
          songId = song.id;
        }
        score = currentScore;
      }
    });
    const saveId = await getSongId(query);
    if (saveId) songId = saveId;
    if (!songId) {
      console.log('Not matched:', { query, songs, rank: score });
      sendEvent(options.cid, events.notMatch, { el: 'TrackInfo', ev: `${artists} ${name}` });
    }
  } finally {
    sendMatchedData({ list: songs, id: songId, name, artists });
    return songId;
  }
}

async function fetchLyric(songId: number) {
  const { API_HOST } = await config;
  const options = await optionsPromise;
  if (!songId) return '';
  try {
    const { lrc }: SongResult = await (
      await fetch(`${API_HOST}/lyric?${new URLSearchParams({ id: String(songId) })}`)
    ).json();
    if (!lrc?.lyric) sendEvent(options.cid, events.noLyrics, { el: 'TrackID', ev: String(songId) });
    return lrc?.lyric || '';
  } catch {
    return '';
  }
}

class Line {
  startTime: number | null = null;
  text = '';
}

export type Lyric = Line[];

export let lyric: Lyric = [];
export async function updateLyric(query: Query | number) {
  lyric = [];
  let songId = 0;
  if (typeof query === 'number') {
    songId = query;
    sendMatchedData({ id: songId });
  } else {
    songId = await searchSong(query);
  }

  if (!songId) return;
  const lyricStr = await fetchLyric(songId);
  if (!lyricStr) return;

  const options = await optionsPromise;

  const lines = lyricStr.split('\n').map(line => line.trim());
  lyric = lines
    .map(line => {
      // ["[ar:Beyond]"]
      // ["[03:10]"]
      // ["[03:10]", "永远高唱我歌"]
      // ["永远高唱我歌"]
      // ["[03:10]", "[03:10]", "永远高唱我歌"]
      const matchResult = line.match(/(\[.*?\])|([^\[\]]+)/g) || [line];
      const textIndex = matchResult.findIndex(slice => !slice.endsWith(']'));
      let text = ' ';
      if (textIndex > -1) {
        text = matchResult.splice(textIndex, 1)[0];
      }
      return matchResult.map(slice => {
        const result = new Line();
        const [key, value] = slice.match(/[^\[\]]+/g)?.[0].split(':') || [];
        const [min, sec] = [parseFloat(key), parseFloat(value)];
        if (!isNaN(min)) {
          result.startTime = min * 60 + sec;
          result.text = text?.trim();
        } else {
          result.text = options['clean-lyrics'] === 'on' ? '' : `${key?.toUpperCase()}: ${value}`;
        }
        return result;
      });
    })
    .flat()
    .sort((a, b) => {
      if (a.startTime === null) {
        return 0;
      }
      if (b.startTime === null) {
        return 1;
      }
      return a.startTime - b.startTime;
    });
}
