/**
 * temporary plan: Stored in webpage localStorage
 */
import type { Lyric, LyricsResponse } from '../../functions/src/type';

import { Query } from './lyrics';
import { optionsPromise } from './options';
import { currentPlatform } from './config';
import { request } from './request';

// const API_HOST = 'http://localhost:5001/spotify-lyrics-ef482/us-central1';
const API_HOST =
  'https://files.xianqiao.wang/https://us-central1-spotify-lyrics-ef482.cloudfunctions.net';

async function fetchData(pathname: string, params: Lyric | Lyric[], fetchOptions?: RequestInit) {
  return await request(`${API_HOST}${pathname}`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
    ...fetchOptions,
  });
}

// Previously used localStorage
// const KEY = 'spotify.lyrics.extension';

export async function getSong(data: Query, fetchOptions: RequestInit) {
  const { cid } = await optionsPromise;
  const res: LyricsResponse<Lyric | undefined> = await fetchData(
    '/getLyric',
    {
      name: data.name,
      artists: data.artists,
      user: cid,
      platform: currentPlatform,
    },
    fetchOptions,
  );
  return res.data;
}

export async function setSong(data: Query & { id?: number; lyric?: string }) {
  const { cid } = await optionsPromise;
  await fetchData('/setLyric', {
    name: data.name,
    artists: data.artists,
    neteaseID: data.id,
    lyric: data.lyric,
    user: cid,
    platform: currentPlatform,
  });
}
