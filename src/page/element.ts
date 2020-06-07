const video = document.createElement('video');
const createElement: typeof document.createElement = document.createElement.bind(document);

let audio: HTMLAudioElement | null = null;
document.createElement = function<K extends keyof HTMLElementTagNameMap>(tagName: K, options: ElementCreationOptions) {
  const element = createElement(tagName, options);
  if (tagName === 'video') {
    if (!audio) {
      audio = element as HTMLAudioElement;
      if (navigator.mediaSession) {
        const mediaSession = navigator.mediaSession;
        audio.addEventListener('play', () => {
          video.play().catch(() => {
            //
          });
          mediaSession.playbackState = 'playing';
        });
        audio.addEventListener('pause', () => {
          video.pause();
          mediaSession.playbackState = 'paused';
        });
      }
    }
  }
  return element;
};

export { video, audio };
