// https://w3c.github.io/picture-in-picture
// https://bugzilla.mozilla.org/show_bug.cgi?id=pip
import config, { localConfig } from './config';

import { appendStyle } from './utils';
import { optionsPromise } from './options';

let polyfilled = false;
const polyfill = () => {
  if (polyfilled) return;
  polyfilled = true;
  appendStyle(localConfig.NO_PIP_STYLE);

  Object.defineProperties(document, {
    pictureInPictureElement: {
      configurable: true,
      enumerable: true,
      writable: true,
    },
    exitPictureInPicture: {
      configurable: true,
      enumerable: true,
      writable: true,
    },
  });

  HTMLVideoElement.prototype.requestPictureInPicture = async function () {
    const { LYRICS_CONTAINER_SELECTOR, PAGE_PIP_STYLE } = await config;
    const container = document.querySelector(LYRICS_CONTAINER_SELECTOR);
    if (container) {
      this.setAttribute('style', PAGE_PIP_STYLE);
      container.append(this);
      this.hidden = false;
      document.pictureInPictureElement = this;
      this.dispatchEvent(new CustomEvent('enterpictureinpicture'));
      return;
    } else {
      throw new Error('Page PiP container not found');
    }
  };

  document.exitPictureInPicture = async function () {
    const video = document.pictureInPictureElement;
    if (video) video.hidden = true;
    document.pictureInPictureElement = null;
    video?.dispatchEvent(new CustomEvent('leavepictureinpicture'));
    return;
  };
};

// https://github.com/mantou132/Spotify-Lyrics/issues/31
if (!document.pictureInPictureEnabled) {
  polyfill();
}

optionsPromise.then((options) => {
  // Rewrite PIP WebAPI
  if (options['show-on'] === 'page') {
    polyfill();
  }
});
