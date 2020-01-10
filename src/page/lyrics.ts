/* eslint-disable @typescript-eslint/camelcase */
import { MessageCallType } from '../common';

import { Query } from './song';
import { contentScriptCall } from './utils';

interface Artist {
  name: string;
}
interface Song {
  id: number;
  name: string;
  artists: Artist[];
}

interface SearchResult {
  result?: {
    songs?: Song[];
  };
}

interface SongResult {
  lrc?: {
    lyric?: string;
  };
}

// https://github.com/Binaryify/NeteaseCloudMusicApi
const getApiHost = () => fetch('https://xianqiao.wang/netease-cloud-music-api-host').then(res => res.text());

const getSimplified = async (s: string) => {
  // Firefox issue: not support Unicode property escapes
  if (/\p{sc=Han}/gu.test(s)) {
    return await contentScriptCall(MessageCallType.GET_SIMPLIFIED, s);
  } else {
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

async function fetchLyric(query: Query) {
  const { name, artists } = query;
  const simplifiedName = await getSimplified(name);
  const simplifiedArtists = await getSimplified(artists);
  try {
    const apiHost = await getApiHost();
    const searchQuery = new URLSearchParams({ type: '1 ', keywords: `${artists} ${name}`, limit: '100' });
    const { result }: SearchResult = await (await fetch(`${apiHost}/search?${searchQuery}`)).json();
    const songs = result?.songs || [];
    // TODO: Support pinyin matching
    let songId = 0;
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
    if (!songId) {
      console.log('Not matched:', { query, songs, rank });
      return '';
    }
    const { lrc }: SongResult = await (
      await fetch(`${apiHost}/lyric?${new URLSearchParams({ id: String(songId) })}`)
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
export async function updateLyric(query: Query) {
  lyric = [];
  const lyricStr = await fetchLyric(query);
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
          result.text = text;
        } else {
          result.text = `${key}:${value}`;
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
