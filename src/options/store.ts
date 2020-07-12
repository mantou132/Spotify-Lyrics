import { LocalStorageKeys } from '../common/consts';

export const lyricsPositions = ['page', 'pip'] as const;

type CheckboxValue = 'on' | 'off';

const validateOrigin = () => {
  if (location.protocol.startsWith('http')) throw new Error('origin error');
};

export class Options {
  'strict-mode': CheckboxValue;
  'only-cover': CheckboxValue;
  'clean-lyrics': CheckboxValue;
  'show-on': typeof lyricsPositions[number];
  'cid': string;

  constructor(o: Partial<Options> = {}) {
    validateOrigin();
    this['strict-mode'] = o['strict-mode'] || 'off';
    this['only-cover'] = o['only-cover'] || 'off';
    this['clean-lyrics'] = o['clean-lyrics'] || 'off';
    this['show-on'] = o['show-on'] || 'pip';
    this.cid = `${Date.now()}-${Math.random()}`;
  }

  static init(): Options {
    validateOrigin();
    const result = new Options();
    const localOptionsStr = localStorage.getItem(LocalStorageKeys.CONFIG);
    if (localOptionsStr) {
      try {
        Object.assign(result, JSON.parse(localOptionsStr));
        localStorage.setItem(LocalStorageKeys.CONFIG, JSON.stringify(result));
      } catch {
        //
      }
    }
    return result;
  }
}
