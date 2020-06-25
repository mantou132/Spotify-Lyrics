import { LocalStorageKeys } from './consts';

export const lyricsPositions = ['page', 'pip'] as const;

type CheckboxValue = 'on' | 'off';

export class Options {
  'only-cover': CheckboxValue;
  'clean-lyrics': CheckboxValue;
  'show-on': typeof lyricsPositions[number];

  constructor(o: Partial<Options> = {}) {
    this['only-cover'] = o['only-cover'] || 'off';
    this['clean-lyrics'] = o['clean-lyrics'] || 'off';
    this['show-on'] = o['show-on'] || 'pip';
  }

  static init(): Options {
    const result = new Options();
    const localOptionsStr = localStorage.getItem(LocalStorageKeys.CONFIG);
    if (localOptionsStr) {
      try {
        Object.assign(result, JSON.parse(localOptionsStr));
      } catch {
        //
      }
    }
    return result;
  }
}
