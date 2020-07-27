// Cannot be used in webpage

import { LocalStorageKeys, Options } from '../common/consts';

let optionsCache: Options | null = null;

export function getOptions() {
  if (optionsCache) return optionsCache;
  optionsCache = {} as Options;
  optionsCache['lyrics-smooth-scroll'] = 'off';
  optionsCache['only-cover'] = 'off';
  optionsCache['clean-lyrics'] = 'off';
  optionsCache['show-on'] = 'pip';
  optionsCache.cid = `${Date.now()}-${Math.random()}`;
  const localOptionsStr = localStorage.getItem(LocalStorageKeys.CONFIG);
  if (localOptionsStr) {
    try {
      Object.assign(optionsCache, JSON.parse(localOptionsStr));
      localStorage.setItem(LocalStorageKeys.CONFIG, JSON.stringify(optionsCache));
    } catch {}
  }
  return optionsCache;
}

export function updateOptions(value: Partial<Options>) {
  optionsCache = Object.assign(getOptions(), value);
  localStorage.setItem(LocalStorageKeys.CONFIG, JSON.stringify(optionsCache));
}

window.addEventListener('storage', () => {
  const localOptionsStr = localStorage.getItem(LocalStorageKeys.CONFIG);
  if (localOptionsStr) {
    try {
      optionsCache = Object.assign({}, optionsCache, JSON.parse(localOptionsStr));
    } catch {}
  }
});
