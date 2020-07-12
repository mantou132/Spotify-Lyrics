/**
 * temporary plan: Stored in webpage localStorage
 */

import { Query } from './lyrics';

const KEY = 'spotify.lyrics.extension';

export async function getSongId(data: Query) {
  try {
    const store = JSON.parse(localStorage[KEY] || '{}');
    return store[`${data.name}-${data.artists}`] || 0;
  } catch {
    return 0;
  }
}

export async function setSongId(data: Query & { id: number }) {
  try {
    const store = JSON.parse(localStorage[KEY] || '{}');
    store[`${data.name}-${data.artists}`] = data.id;
    localStorage[KEY] = JSON.stringify(store);
  } catch {}
}
