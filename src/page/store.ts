/**
 * temporary plan: Stored in webpage localStorage
 */

import { Query } from './lyrics';

const KEY = 'spotify.lyrics.extension';
let store: Record<string, number> = {};

try {
  store = JSON.parse(localStorage[KEY]);
} catch {}

export async function getSongId(data: Query) {
  return store[`${data.name}-${data.artists}`] || 0;
}

export async function setSongId(data: Query & { id: number }) {
  const key = `${data.name}-${data.artists}`;
  if (data.id === 0) {
    delete store[key];
  } else {
    store[key] = data.id;
  }
  localStorage[KEY] = JSON.stringify(store);
}
