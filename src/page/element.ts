const createElement: typeof document.createElement = document.createElement.bind(document);

let video: HTMLVideoElement | null = null;
let audio: HTMLAudioElement | null = null;
document.createElement = function<K extends keyof HTMLElementTagNameMap>(tagName: K, options: ElementCreationOptions) {
  const element = createElement(tagName, options);
  if (tagName === 'video') {
    if (!audio) {
      audio = element as HTMLAudioElement;
    } else {
      video = element as HTMLVideoElement;
    }
  }
  return element;
};

export { video, audio };
