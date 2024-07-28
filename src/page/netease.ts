import { configPromise } from './config';
import { fetchLRCLIBSongList } from './lrclib';
import { request } from './request';

interface Artist {
  name: string;
  alias: string[];
  transNames?: string[];
}

interface Album {
  name: string;
}

export interface Song {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  /**ms */
  duration?: number;
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

export interface SongLyricResult {
  lrc?: {
    lyric?: string;
  };
  tlyric?: {
    lyric?: string;
  };
}

export async function fetchNetEaseChineseName(
  s: string,
  fetchOptions?: RequestInit,
): Promise<SearchArtistsResult> {
  const { API_HOST } = await configPromise;
  const searchQuery = new URLSearchParams({
    keywords: s,
    type: '100',
    limit: '100',
  });
  return request(`${API_HOST}/search?${searchQuery}`, fetchOptions);
}

// auto swtch to lrclib
let down = false;
export async function fetchNetEaseSongList(s: string, fetchOptions?: RequestInit) {
  if (down) return fetchLRCLIBSongList(s, fetchOptions);

  const { API_HOST } = await configPromise;
  const searchQuery = new URLSearchParams({
    keywords: s,
    type: '1',
    limit: '100',
  });

  try {
    const res: SearchSongsResult = await request(`${API_HOST}/search?${searchQuery}`, fetchOptions);
    return res.result?.songs || [];
  } catch (err) {
    down = true;
    return fetchLRCLIBSongList(s, fetchOptions);
  }
}

export async function fetchNetEaseLyric(
  songId: number,
  fetchOptions?: RequestInit,
): Promise<SongLyricResult> {
  const { API_HOST } = await configPromise;
  return request(`${API_HOST}/lyric?${new URLSearchParams({ id: String(songId) })}`, fetchOptions);
}
