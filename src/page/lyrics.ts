import sify from 'chinese-conv/tongwen/tongwen-ts';

import { Message, Event } from '../common/consts';
import { sendEvent, events } from '../common/ga';

import config from './config';

import { getSongId } from './store';
import { optionsPromise } from './options';
import { captureException } from './utils';

export interface Query {
  name: string;
  artists: string;
}

export interface Artist {
  name: string;
  alias: string[];
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

interface SearchSongsResult {
  result?: {
    songs?: Song[];
  };
}

interface SearchArtistsResult {
  result?: {
    artists?: Artist[];
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

const charCodeTotal = (s: string) => {
  let code = 0;
  for (let i = 0; i < s.length; i++) {
    code += s.charCodeAt(i);
  }
  return code;
};

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
  return s.replace(/\(?(feat|with)\.?\s.*\)?$/i, '').trim();
};

const sharedData: SharedData = { list: [], id: 0, name: '', artists: '' };
export function sendMatchedData(data?: Partial<SharedData>) {
  if (data) Object.assign(sharedData, data);
  const msg: Message = { type: Event.SEND_SONGS, data: sharedData };
  window.postMessage(msg, '*');
}

async function fetchChineseName(s: string) {
  const { API_HOST } = await config;
  const singerAlias: Record<string, string> = {};
  const searchQuery = new URLSearchParams({
    keywords: s,
    type: '100',
    limit: '100',
  });
  try {
    const { result }: SearchArtistsResult = await (await fetch(`${API_HOST}/search?${searchQuery}`)).json();
    const artists = result?.artists || [];
    artists.forEach(artist => {
      const alia = artist.alias
        .map(e => e.toLowerCase())
        .sort()
        .join();
      // Chinese singer's English name as an alias
      if (alia && s.includes(alia)) {
        singerAlias[alia] = artist.name;
      }
    });
  } catch (e) {
    captureException(e);
  }
  return singerAlias;
}

async function searchSong(query: Query, onlySearchName = false): Promise<number> {
  const { API_HOST, SINGER } = await config;
  const options = await optionsPromise;
  const { name = '', artists = '' } = query;
  sendEvent(options.cid, events.searchLyrics, { cd1: `${name} - ${artists}` });
  const queryName = name;
  const queryName1 = queryName.toLowerCase();
  const queryName2 = sify(queryName1);
  const queryName3 = getHalfSizeText(queryName2);
  const queryName4 = removeSongFeat(queryName3);
  const queryName5 = getText(queryName3);
  const queryArtistsArr = artists.split(',').sort();
  const queryArtistsArr1 = queryArtistsArr.map(e => e.toLowerCase());
  const queryArtistsArr2 = queryArtistsArr1.map(e => sify(e));

  const singerAlias = await fetchChineseName(queryArtistsArr2.join());

  const queryArtistsArr3 = queryArtistsArr1.map(e => singerAlias[e] || (SINGER as any)[e] || e);

  let songId = 0;
  let songs: Song[] = [];
  try {
    const searchQuery = new URLSearchParams({
      keywords: onlySearchName ? queryName4 : `${sify(queryArtistsArr3.join())} ${queryName4}`,
      type: '1',
      limit: '100',
    });
    const { result }: SearchSongsResult = await (await fetch(`${API_HOST}/search?${searchQuery}`)).json();

    songs = result?.songs || [];

    let score = 0;
    songs.forEach(song => {
      let currentScore = options['strict-mode'] === 'on' ? 0 : 3;

      let songName = song.name;
      if (songName === queryName) {
        currentScore += 10;
      } else {
        songName = songName.toLowerCase();
        if (songName === queryName1) {
          currentScore += 9.1;
        } else {
          songName = sify(songName);
          if (songName === queryName2) {
            currentScore += 9;
          } else {
            songName = getHalfSizeText(songName);
            if (songName === queryName3) {
              currentScore += 8.1;
            } else {
              songName = removeSongFeat(songName);
              if (songName === queryName4) {
                currentScore += 8;
              } else {
                songName = getText(songName);
                if (songName === queryName5) {
                  currentScore += 7;
                } else if (
                  (songName.startsWith(queryName5) || queryName5.startsWith(songName)) &&
                  (songName.length > 5 || charCodeTotal(songName) > 5 * 128) &&
                  (queryName5.length > 5 || charCodeTotal(queryName5) > 5 * 128)
                ) {
                  currentScore += 6;
                }
              }
            }
          }
        }
      }

      let songArtistsArr = song.artists.map(e => e.name).sort();
      const len = queryArtistsArr.length + songArtistsArr.length;
      if (queryArtistsArr.join() === songArtistsArr.join()) {
        currentScore += 6;
      } else {
        songArtistsArr = songArtistsArr.map(e => e.toLowerCase());
        if (queryArtistsArr1.join() === songArtistsArr.join() || queryArtistsArr3.join() === songArtistsArr.join()) {
          currentScore += 5.3;
        } else if (new Set([...queryArtistsArr1, ...songArtistsArr]).size < len) {
          currentScore += 5.2;
        } else {
          songArtistsArr = songArtistsArr.map(e => sify(e));
          if (queryArtistsArr2.join() === songArtistsArr.join()) {
            currentScore += 5.1;
          } else if (
            new Set([...queryArtistsArr2, ...songArtistsArr]).size < len ||
            new Set([...queryArtistsArr3, ...songArtistsArr]).size < len
          ) {
            currentScore += 5;
          }
        }
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
      if (!onlySearchName) return await searchSong(query, true);
      console.log('Not matched:', { query, songs, rank: score });
      sendEvent(options.cid, events.notMatch, { cd1: `${name} - ${artists}` });
    }
  } catch (e) {
    captureException(e);
  }
  sendMatchedData({ list: songs, id: songId, name, artists });
  return songId;
}

async function fetchLyric(songId: number) {
  const { API_HOST } = await config;
  const options = await optionsPromise;
  if (!songId) return '';
  try {
    const { lrc }: SongResult = await (
      await fetch(`${API_HOST}/lyric?${new URLSearchParams({ id: String(songId) })}`)
    ).json();
    if (!lrc?.lyric) {
      sendEvent(options.cid, events.noLyrics, { cd1: `${sharedData.name} - ${sharedData.artists}`, cd2: `${songId}` });
    }
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

function isOtherInfo(text: string) {
  return /^(作?\s*(词|詞)|作?\s*曲|(编|編)\s*曲?|(监|監)\s*制?|制作|出品|混音|后期|翻唱|题字|文案|海报|古筝|二胡|钢琴|吉他|贝斯|.*编写|.*和声|.*提琴|.*录音|.*工程|.*混音|.*设计|.*剪辑|producers|writers).*(:|：)/i.test(
    text,
  );
}

function parseLyrics(lyricStr: string, enabledCleanLyrics = false) {
  const lines = lyricStr.split('\n').map(line => line.trim());
  return lines
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
        text = matchResult.splice(textIndex, 1)[0].trim();
      }
      return matchResult.map(slice => {
        const result = new Line();
        const [key, value] = slice.match(/[^\[\]]+/g)?.[0].split(':') || [];
        const [min, sec] = [parseFloat(key), parseFloat(value)];
        if (!isNaN(min)) {
          if (enabledCleanLyrics && isOtherInfo(text)) {
            result.text = '';
          } else {
            result.startTime = min * 60 + sec;
            result.text = text;
          }
        } else {
          result.text = enabledCleanLyrics ? '' : `${key?.toUpperCase()}: ${value}`;
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

export async function updateLyric(query?: Query | number) {
  lyric = [];

  if (!document.pictureInPictureElement) return;

  let songId = 0;
  if (typeof query === 'number') {
    songId = query;
    sendMatchedData({ id: songId });
  } else if (typeof query === 'object') {
    songId = await searchSong(query);
  } else {
    const { TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await config;
    const name = document.querySelector(TRACK_NAME_SELECTOR)?.textContent || '';
    const artists = document.querySelector(TRACK_ARTIST_SELECTOR)?.textContent || '';
    songId = await searchSong({ name, artists });
  }

  if (!songId) return;
  const lyricStr = await fetchLyric(songId);
  if (!lyricStr) return;

  const options = await optionsPromise;
  lyric = parseLyrics(lyricStr, options['clean-lyrics'] === 'on');
}
