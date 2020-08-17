import { sify, tify } from 'chinese-conv';

import config from './config';
import { captureException } from './utils';

export interface Query {
  name: string;
  artists: string;
}

export interface Artist {
  name: string;
  alias: string[];
  transNames?: string[];
}
export interface Album {
  name: string;
}
export interface Song {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration?: number; // ms
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

interface SongResult {
  lrc?: {
    lyric?: string;
  };
}

const normalize = (s: string, emptySymbol = true) => {
  const result = s
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/【/g, '[')
    .replace(/】/g, ']')
    .replace(/，/g, ',')
    .replace(/。/g, '.')
    .replace(/：/g, ':')
    .replace(/？/g, '?')
    .replace(/！/g, '!')
    .replace(/、/g, ',')
    .replace(/・/g, '·')
    .replace(/‘|’/g, "'")
    .replace(/“|”/g, '"')
    .replace(/　/g, ' ');
  if (emptySymbol) {
    result.replace(/-/g, ' ').replace(/\//g, ' ');
  }
  return result.replace(/\s+/g, ' ').trim();
};

const plainText = (s: string) => {
  return s
    .replace(/[\(\)\[\]\-.,?!:'"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
const ignoreAccented = (s: string) => {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const removeSongFeat = (s: string) => {
  return s.replace(/\(?(feat|with)\.?\s.*\)?$/i, '').trim();
};

const getText = (s: string) => {
  return s
    .replace(/\(.*?\)|\[.*?\]|\sremix$|\sversion$/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

async function fetchChineseName(s: string) {
  const { API_HOST } = await config;
  const singerAlias: Record<string, string> = {};
  const searchQuery = new URLSearchParams({
    keywords: s,
    type: '100',
    limit: '100',
  });
  try {
    const { result }: SearchArtistsResult = await (
      await fetch(`${API_HOST}/search?${searchQuery}`)
    ).json();
    const artists = result?.artists || [];
    artists.forEach((artist) => {
      const alia = [...artist.alias, ...(artist.transNames || [])]
        .map((e) => sify(e).toLowerCase())
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

async function fetchSongList(s: string): Promise<Song[]> {
  const { API_HOST } = await config;
  const searchQuery = new URLSearchParams({
    keywords: s,
    type: '1',
    limit: '100',
  });
  const { result }: SearchSongsResult = await (
    await fetch(`${API_HOST}/search?${searchQuery}`)
  ).json();
  return result?.songs || [];
}

interface MatchingLyricsOptions {
  onlySearchName?: boolean;
  getAudioElement?: () => Promise<HTMLAudioElement>;
  fetchData?: (s: string) => Promise<Song[]>;
  fetchTransName?: (s: string) => Promise<Record<string, string>>;
}
export async function matchingLyrics(
  query: Query,
  options: MatchingLyricsOptions = {},
): Promise<{ list: Song[]; id: number; score: number }> {
  const {
    getAudioElement,
    onlySearchName = false,
    fetchData = fetchSongList,
    fetchTransName = fetchChineseName,
  } = options;

  let audio: HTMLAudioElement | null = null;
  if (getAudioElement) {
    audio = await getAudioElement();
    if (!audio.duration) {
      await new Promise((res) => audio!.addEventListener('loadedmetadata', res, { once: true }));
    }
  }
  const { SINGER } = await config;
  const { name = '', artists = '' } = query;

  const queryName = normalize(name);
  const queryName1 = queryName.toLowerCase();
  const queryName2 = sify(queryName1);
  const queryName3 = plainText(queryName2);
  const queryName4 = ignoreAccented(queryName3);
  const queryName5 = removeSongFeat(queryName4);
  const queryName6 = getText(removeSongFeat(ignoreAccented(queryName2)));
  const queryArtistsArr = artists
    .split(',')
    .map((e) => normalize(e.trim()))
    .sort();
  const queryArtistsArr1 = queryArtistsArr.map((e) => e.toLowerCase());
  const queryArtistsArr2 = queryArtistsArr1.map((e) => sify(e));
  const queryArtistsArr3 = queryArtistsArr2.map((e) => ignoreAccented(plainText(e)));

  const singerAlias = await fetchTransName(queryArtistsArr2.join());

  const queryArtistsArr4 = queryArtistsArr1
    .map((e) => singerAlias[e] || (SINGER as Record<string, string>)[e] || e)
    .map((e) => sify(e).toLowerCase());

  const searchString = onlySearchName ? queryName5 : `${queryArtistsArr4.join()} ${queryName5}`;
  const songs = await fetchData(searchString);
  const list: Song[] = [];
  const listIdSet = new Set<number>();

  let id = 0;
  let score = 0;
  songs.forEach((song) => {
    const DURATION_WEIGHT = 5;
    let currentScore = audio ? 0 : DURATION_WEIGHT;

    if (audio && song.duration && Math.abs(audio.duration - song.duration / 1000) < 2) {
      currentScore += DURATION_WEIGHT;
    }

    let songName = normalize(song.name);
    if (songName === queryName) {
      currentScore += 10;
    } else {
      songName = songName.toLowerCase();
      if (songName === queryName1) {
        currentScore += 9.1;
      } else {
        songName = sify(songName);
        if (
          songName === queryName2 ||
          songName.endsWith(`(${queryName2})`) ||
          queryName2.endsWith(`(${songName})`)
        ) {
          currentScore += 9;
        } else {
          songName = plainText(songName);
          if (songName === queryName3) {
            currentScore += 8.2;
          } else {
            songName = ignoreAccented(songName);
            if (songName === queryName4) {
              currentScore += 8.1;
            } else {
              songName = removeSongFeat(songName);
              if (songName === queryName5) {
                currentScore += 8;
              } else {
                songName = getText(
                  removeSongFeat(ignoreAccented(sify(normalize(song.name).toLowerCase()))),
                );
                if (songName === queryName6) {
                  // name & name (abc)
                  // name & name remix
                  currentScore += 7;
                } else if (songName.startsWith(queryName6) || queryName6.startsWith(songName)) {
                  currentScore += 6;
                } else if (songName.includes(queryName6) || queryName6.includes(songName)) {
                  currentScore += 3;
                }
              }
            }
          }
        }
      }
    }

    let songArtistsArr = song.artists.map((e) => normalize(e.name)).sort();
    const len = queryArtistsArr.length + songArtistsArr.length;
    if (queryArtistsArr.join() === songArtistsArr.join()) {
      currentScore += 6;
    } else {
      songArtistsArr = songArtistsArr.map((e) => e.toLowerCase());
      if (
        queryArtistsArr1.join() === songArtistsArr.join() ||
        queryArtistsArr4.join() === songArtistsArr.join()
      ) {
        currentScore += 5.5;
      } else if (new Set([...queryArtistsArr1, ...songArtistsArr]).size < len) {
        currentScore += 5.4;
      } else {
        songArtistsArr = songArtistsArr.map((e) => sify(e));
        if (queryArtistsArr2.join() === songArtistsArr.join()) {
          currentScore += 5.3;
        } else {
          songArtistsArr = songArtistsArr.map((e) => ignoreAccented(plainText(e)));
          if (queryArtistsArr3.join() === songArtistsArr.join()) {
            currentScore += 5.1;
          } else {
            if (
              new Set([...queryArtistsArr2, ...songArtistsArr]).size < len ||
              new Set([...queryArtistsArr4, ...songArtistsArr]).size < len
            ) {
              currentScore += 5;
            } else {
              songArtistsArr = songArtistsArr.map((e) => getText(e));
              if (
                songArtistsArr.some(
                  (artist) =>
                    queryName2.includes(artist) ||
                    queryArtistsArr2.join().includes(artist) ||
                    queryArtistsArr4.join().includes(artist),
                )
              ) {
                currentScore += 3;
              }
            }
          }
        }
      }
    }

    if (currentScore > score) {
      if (currentScore > 10 + DURATION_WEIGHT) {
        id = song.id;
      }
      score = currentScore;
    }
    if (currentScore > 0) {
      list.push(song);
      listIdSet.add(song.id);
    }
  });
  if (!onlySearchName) {
    const {
      id: idForMissingName,
      list: listForMissingName,
      score: scoreForMissingName,
    } = await matchingLyrics(query, {
      getAudioElement,
      onlySearchName: true,
      fetchData,
      fetchTransName: async () => singerAlias,
    });
    listForMissingName.forEach((song) => {
      if (!listIdSet.has(song.id)) {
        list.push(song);
      }
    });
    const resultId = scoreForMissingName > score ? idForMissingName : id;
    const resultScore = Math.max(scoreForMissingName, score);
    return { id: resultId, list, score: resultScore };
  }
  return { id, list, score };
}

export async function fetchLyric(songId: number) {
  const { API_HOST } = await config;
  const { lrc }: SongResult = await (
    await fetch(`${API_HOST}/lyric?${new URLSearchParams({ id: String(songId) })}`)
  ).json();
  return lrc?.lyric || '';
}

class Line {
  startTime: number | null = null;
  text = '';
}

export type Lyric = Line[] | null;

export interface ParseLyricsOptions {
  cleanLyrics?: boolean;
  useTChinese?: boolean;
}

function capitalize(s: string) {
  return s.replace(/^(\w)/, ($1) => $1.toUpperCase());
}

export function parseLyrics(lyricStr: string, options: ParseLyricsOptions = {}) {
  const text1 = `作?\\s*词|作?\\s*曲|编\\s*曲?|监\\s*制?`;
  const text2 = '.*编写|.*和音|.*和声|.*提琴|.*录|.*工程|.*工作室|.*设计|.*剪辑';
  const text3 = '制作|发行|出品|混音|缩混|后期|翻唱|题字|文案|海报|古筝|二胡|钢琴|吉他|贝斯|笛子';
  const text4 = 'lrc|publish|vocal|guitar|program|produce|write';
  const otherInfoRegexp = new RegExp(`^(${text1}|${text2}|${text3}|${text4}).*(:|：)`, 'i');

  const lines = lyricStr.split('\n').map((line) => line.trim());
  const lyrics = lines
    .map((line) => {
      // ["[ar:Beyond]"]
      // ["[03:10]"]
      // ["[03:10]", "永远高唱我歌"]
      // ["永远高唱我歌"]
      // ["[03:10]", "[03:10]", "永远高唱我歌"]
      const matchResult = line.match(/(\[.*?\])|([^\[\]]+)/g) || [line];
      const textIndex = matchResult.findIndex((slice) => !slice.endsWith(']'));
      let text = '';
      if (textIndex > -1) {
        text = matchResult.splice(textIndex, 1)[0];
        text = capitalize(text.trim()).replace(/（/g, '(').replace(/）/g, ')');
        text = sify(text);
      }
      return matchResult.map((slice) => {
        const result = new Line();
        const matchResut = slice.match(/[^\[\]]+/g);
        const [key, value] = matchResut?.[0].split(':') || [];
        const [min, sec] = [parseFloat(key), parseFloat(value)];
        if (!isNaN(min)) {
          if (options.cleanLyrics && otherInfoRegexp.test(text)) {
            result.text = '';
          } else {
            result.startTime = min * 60 + sec;
            result.text = options.useTChinese ? tify(text) : text;
          }
        } else {
          result.text = options.cleanLyrics ? '' : `${key?.toUpperCase()}: ${value}`;
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
    })
    .filter(({ text }, index, arr) => {
      if (index) {
        const prevEle = arr[index - 1];
        if (prevEle.text === text && text === '') {
          return false;
        }
      }
      return true;
    });

  return lyrics.length ? lyrics : null;
}

export function correctionLyrics(lyrics: Lyric, str: string) {
  // ignore traditional Chinese
  if (!lyrics) return lyrics;
  const normalizeStr = normalize(str, false);
  const regularization = (s: string) =>
    new RegExp(
      normalize(s, false)
        .toLowerCase()
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]'),
      'i',
    );
  return lyrics.map(({ startTime, text }) => {
    let match: RegExpMatchArray | null = null;
    if (text.replace(/\*/g, '').length > 5) {
      try {
        match = normalizeStr.match(regularization(text));
      } catch {}
    }
    return {
      startTime,
      text: capitalize(match?.[0] || text),
    };
  });
}
