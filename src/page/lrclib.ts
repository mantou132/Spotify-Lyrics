import type { SongLyricResult, Song } from './netease';
import { request } from './request';

const API_HOST = `https://lrclib.net/api`;

export const LRCLIB_ID_TOKEN = 0.1;

interface LrcLibLyricRes {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  syncedLyrics: string;
}

export async function fetchLRCLIBSongList(s: string, fetchOptions?: RequestInit): Promise<Song[]> {
  const searchQuery = new URLSearchParams({ q: s });
  const fetchPromise: Promise<LrcLibLyricRes[]> = request(
    `${API_HOST}/search?${searchQuery}`,
    fetchOptions,
  );
  const list = await fetchPromise;
  return list
    .filter((e) => !!e.syncedLyrics)
    .map((e) => ({
      album: { name: e.albumName },
      artists: e.artistName.split(',').map((name) => ({ name, alias: [] })),
      id: e.id + LRCLIB_ID_TOKEN,
      name: e.trackName,
      duration: e.duration * 1000,
    }));
}

export async function fetchLRCLIBLyric(
  songId: number,
  fetchOptions?: RequestInit,
): Promise<SongLyricResult> {
  const { syncedLyrics = '' }: LrcLibLyricRes = await request(
    `${API_HOST}/get/${songId}`,
    fetchOptions,
  );
  return { lrc: { lyric: syncedLyrics } };
}
