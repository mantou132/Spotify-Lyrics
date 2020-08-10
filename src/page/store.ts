/**
 * temporary plan: Stored in webpage localStorage
 */
import type { Lyric, LyricsResponse } from '../../functions/src/type';

import { Query } from './lyrics';
import { optionsPromise } from './options';
import { currentPlatform } from './config';

// const API_HOST = 'http://localhost:5001/spotify-lyrics-ef482/us-central1';
const API_HOST = 'https://us-central1-spotify-lyrics-ef482.cloudfunctions.net';

async function request(pathname: string, params: Lyric | Lyric[]) {
  return await fetch(`${API_HOST}${pathname}`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
  });
}

// Legacy code, remove for later
optionsPromise.then(async ({ cid }) => {
  const KEY = 'spotify.lyrics.extension';
  let store: Record<string, number> = {};

  try {
    store = JSON.parse(localStorage[KEY]);
  } catch {}
  const storeMap = Object.entries(store);
  const data: Lyric[] = storeMap.map(([key, value]) => {
    const [_, name, artists] = key.match(/(.*)-(.*)/)!;
    return { name, artists, platform: currentPlatform, user: cid, neteaseID: value };
  });

  if (!data.length || (await request('/addLyrics', data)).ok) {
    localStorage.removeItem(KEY);
  }
});

export async function getSong(data: Query) {
  const { cid } = await optionsPromise;
  const res: LyricsResponse<Lyric | undefined> = await (
    await request('/getLyric', {
      name: data.name,
      artists: data.artists,
      user: cid,
      platform: currentPlatform,
    })
  ).json();
  return res.data;
}

export async function setSong(data: Query & { id?: number; lyric?: string }) {
  const { cid } = await optionsPromise;
  await request('/setLyric', {
    name: data.name,
    artists: data.artists,
    neteaseID: data.id,
    lyric: data.lyric,
    user: cid,
    platform: currentPlatform,
  });
}
