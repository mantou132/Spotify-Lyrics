/* eslint-disable @typescript-eslint/camelcase */
import sify from 'chinese-conv/tongwen/tongwen-ts';

import config from '../config';
import { Message, Event } from '../consts';

import { Query } from './song';
import { getSongId } from './store';

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

const getSimplified = (s: string) => {
  // Firefox issue: not support Unicode property escapes
  try {
    if (new RegExp('\\p{sc=Han}', 'gu').test(s)) {
      return sify(s);
    } else {
      return '';
    }
  } catch {
    return '';
  }
};

// Exclude deductions
const getText = (s: string) => {
  const text = s.replace(/\(|（.*）|\)/, '').trim();
  return s.length > 2 ? text : s;
};

// Exclude deductions
const getHalfSizeText = (s: string) => {
  return s
    .replace(/，/g, ',')
    .replace(/。/g, '.')
    .replace(/、/g, ',')
    .replace(/‘|’/g, "'");
};

const sharedData: SharedData = { list: [], id: 0, name: '', artists: '' };
export function sendMatchedData(data?: Partial<SharedData>) {
  if (data) Object.assign(sharedData, data);
  const msg: Message = { type: Event.SEND_SONGS, data: sharedData };
  window.postMessage(msg, '*');
}

async function searchSong(query: Query) {
  const { name = '', artists = '' } = query;
  const simplifiedName = getSimplified(name);
  const simplifiedArtists = getSimplified(artists);
  const { API_HOST } = await config;
  const searchQuery = new URLSearchParams({ type: '1 ', keywords: `${artists} ${name}`, limit: '100' });
  let songId = 0;
  let songs: Song[] = [];
  try {
    const { result }: SearchResult = await (await fetch(`${API_HOST}/search?${searchQuery}`)).json();
    songs = result?.songs || [];
    let rank = 0; // Maximum score
    songs.forEach(song => {
      let currentRank = 0;
      if (song.name === name) {
        currentRank += 1000;
      } else if (song.name.toLowerCase() === name.toLowerCase()) {
        currentRank += 100;
      } else if (simplifiedName && song.name === simplifiedName) {
        currentRank += 100;
      } else if (
        getHalfSizeText(song.name) === getHalfSizeText(name) ||
        getHalfSizeText(song.name) === getHalfSizeText(simplifiedName)
      ) {
        currentRank += 10;
        if (getHalfSizeText(song.name).length > 2) {
          currentRank += 10;
        }
      } else if (getText(song.name) === getText(name)) {
        currentRank += 10;
      }
      const queryArtistsArr = artists.split(',').sort();
      const artistsArr = song.artists.map(e => e.name).sort();
      if (queryArtistsArr.join(',') === artistsArr.join(',')) {
        currentRank += 1000;
      } else if (
        simplifiedArtists &&
        simplifiedArtists
          .split(',')
          .sort()
          .join(',') === artistsArr.join(',')
      ) {
        currentRank += 100;
      } else if (new Set([...queryArtistsArr, ...artistsArr]).size < queryArtistsArr.length + artistsArr.length) {
        currentRank += 100;
      } else if (
        new Set([...queryArtistsArr.map(e => e.toLowerCase()), ...artistsArr.map(e => e.toLowerCase())]).size <
        queryArtistsArr.length + artistsArr.length
      ) {
        currentRank += 10;
      }
      if (currentRank > 10 && currentRank > rank) {
        songId = song.id;
      }
      if (currentRank > rank) {
        rank = currentRank;
      }
    });
    const saveId = await getSongId(query);
    if (saveId) songId = saveId;
    if (!songId) {
      console.log('Not matched:', { query, songs, rank });
    }
  } finally {
    sendMatchedData({ list: songs, id: songId, name, artists });
    return songId;
  }
}

async function fetchLyric(songId: number) {
  const { API_HOST } = await config;
  if (!songId) return '';
  try {
    const { lrc }: SongResult = await (
      await fetch(`${API_HOST}/lyric?${new URLSearchParams({ id: String(songId) })}`)
    ).json();
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
          result.text = `${key?.toUpperCase()}: ${value}`;
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
