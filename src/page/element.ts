const createElement: typeof document.createElement = document.createElement.bind(document);

let video: HTMLVideoElement | null = null;
let audio: HTMLAudioElement | null = null;
document.createElement = function<K extends keyof HTMLElementTagNameMap>(tagName: K, options: ElementCreationOptions) {
  const element = createElement(tagName, options);
  if (tagName === 'video') {
    video = element as HTMLVideoElement;
  }
  if (tagName === 'audio') {
    audio = element as HTMLAudioElement;
  }
  return element;
};

export { video, audio };
