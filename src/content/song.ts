const TRACK_INFO_SELECTOR = '.track-info';

const weakMap = new WeakMap<Element, MutationObserver>();

export default function songObserver(callback: Function) {
  let trackInfo: Element | null = null;
  const observer = new MutationObserver(() => {
    const element = document.querySelector(TRACK_INFO_SELECTOR);
    if (!element) {
      if (trackInfo) {
        const ob = weakMap.get(trackInfo);
        ob?.disconnect();
      }
    } else if (!weakMap.has(element)) {
      callback();
      const observer = new MutationObserver(() => {
        callback();
      });
      observer.observe(element, { childList: true, characterData: true, subtree: true, attributes: true });
      weakMap.set(element, observer);
    }
    trackInfo = element;
  });
  observer.observe(document.body, { childList: true });
}
