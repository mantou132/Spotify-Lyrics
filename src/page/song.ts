const TRACK_INFO_SELECTOR = '.track-info';
const TRACK_NAME_SELECTOR = '.track-info__name';
const TRACK_ARTIST_SELECTOR = '.track-info__artists';

export interface Query {
  name: string;
  artists: string;
}

function getQueryObj(element: Element): Query {
  const name = element.querySelector(TRACK_NAME_SELECTOR)?.textContent;
  const artists = element.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;
  return { name: name || '', artists: artists || '' };
}

const weakMap = new WeakMap<Element, MutationObserver>();

export default function songObserver(callback: (query: Query) => any) {
  const checkElement = () => {
    const element = document.querySelector(TRACK_INFO_SELECTOR);

    if (element && !weakMap.has(element)) {
      // init observer
      callback(getQueryObj(element));
      const observer = new MutationObserver(() => {
        callback(getQueryObj(element));
      });
      observer.observe(element, { childList: true, characterData: true, subtree: true, attributes: true });
      weakMap.set(element, observer);
    }
  };
  checkElement();

  // allow `document.documentElement` rerender
  const observer = new MutationObserver(checkElement);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
