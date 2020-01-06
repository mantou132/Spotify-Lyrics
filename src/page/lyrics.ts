/* eslint-disable @typescript-eslint/camelcase */
import { Query } from './song';

interface SearchResult {
  result?: {
    songs?: { id?: number }[];
  };
}

interface SongResult {
  lrc?: {
    lyric?: string;
  };
}

const API = 'https://api.imjad.cn/cloudmusic/';
async function fetchLyric(s: string) {
  try {
    const { result }: SearchResult = await (
      await fetch(`${API}?${new URLSearchParams({ type: 'search', search_type: '1', s })}`)
    ).json();
    // TODO: Optimize song matching
    const songId = result?.songs?.[0]?.id;
    if (!songId) return '';
    const { lrc }: SongResult = await (
      await fetch(`${API}?${new URLSearchParams({ type: 'lyric', id: String(songId) })}`)
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
export async function updateLyric({ name, artist }: Query) {
  lyric = [];
  const lyricStr = await fetchLyric(`${name}-${artist}`);
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
          result.text = `${key}-${value}`;
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
