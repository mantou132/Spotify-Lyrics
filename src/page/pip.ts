// https://w3c.github.io/picture-in-picture
// https://bugzilla.mozilla.org/show_bug.cgi?id=pip
import config from '../common/config';

// https://github.com/mantou132/Spotify-Lyrics/issues/31
if (!document.pictureInPictureEnabled) {
  // sync write
  const style = document.createElement('style');
  style.textContent = `
    [role='contentinfo'] > div:nth-child(1) > button {
      display: none;
    }
  `;
  document.head.append(style);

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

  HTMLVideoElement.prototype.requestPictureInPicture = async function() {
    const { LYRICS_CONTAINER_SELECTOR } = await config;
    const container = document.querySelector(LYRICS_CONTAINER_SELECTOR);
    if (container) {
      this.setAttribute('style', 'width: 100%; position: relative;');
      container.append(this);
      document.pictureInPictureElement = this;
      this.dispatchEvent(new CustomEvent('enterpictureinpicture'));
      return;
    } else {
      throw new Error();
    }
  };

  document.exitPictureInPicture = async function() {
    const video = document.pictureInPictureElement;
    video?.remove();
    document.pictureInPictureElement = null;
    video?.dispatchEvent(new CustomEvent('leavepictureinpicture'));
    return;
  };
}
