import config from '../config';

export interface Query {
  name: string;
  artists: string;
}

const weakMap = new WeakMap<Element, MutationObserver>();

export default async function songObserver(callback: (query: Query) => any) {
  const { TRACK_INFO_SELECTOR, TRACK_NAME_SELECTOR, TRACK_ARTIST_SELECTOR } = await config;

  const getQueryObj = (): Query => {
    const name = document.querySelector(TRACK_NAME_SELECTOR)?.textContent;
    const artists = document.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;
    return { name: name || '', artists: artists || '' };
  };

  const checkElement = () => {
    const element = document.querySelector(TRACK_INFO_SELECTOR);

    if (element && !weakMap.has(element)) {
      // init observer
      callback(getQueryObj());
      const observer = new MutationObserver(() => {
        callback(getQueryObj());
      });
      observer.observe(element, { childList: true, characterData: true, subtree: true });
      weakMap.set(element, observer);
    }
  };

  checkElement();
  // allow `document.documentElement` rerender
  const observer = new MutationObserver(checkElement);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
