// https://w3c.github.io/picture-in-picture
// https://bugzilla.mozilla.org/show_bug.cgi?id=pip
import { configPromise, localConfig } from './config';
import { appendStyle, querySelector } from './utils';
import { optionsPromise } from './options';
import { lyricVideo } from './element';

const nativeExitPictureInPicture = document.exitPictureInPicture?.bind(document);

if (document.exitPictureInPicture) {
  // Only allow extensions to exit lyrics pip
  document.exitPictureInPicture = async function () {
    if (document.pictureInPictureElement !== lyricVideo) {
      await nativeExitPictureInPicture();
    }
  };
}

export const openLyrics = async function () {
  const options = await optionsPromise;
  if (options['show-on'] === 'pip' && document.pictureInPictureEnabled) {
    return await lyricVideo.requestPictureInPicture();
  }

  const { LYRICS_CONTAINER_SELECTOR, PAGE_PIP_STYLE } = await configPromise;
  const container = querySelector(LYRICS_CONTAINER_SELECTOR);
  if (container) {
    lyricVideo.setAttribute('style', PAGE_PIP_STYLE);
    container.append(lyricVideo);
    lyricVideo.hidden = false;
    lyricVideo.dispatchEvent(new CustomEvent('enterpictureinpicture'));
    return;
  } else {
    throw new Error('Page PiP container not found');
  }
};

export const closeLyrics = async function () {
  if (lyricVideo.getBoundingClientRect().width) {
    lyricVideo.hidden = true;
    lyricVideo.dispatchEvent(new CustomEvent('leavepictureinpicture'));
    return;
  }

  return await nativeExitPictureInPicture();
};

// https://github.com/mantou132/Spotify-Lyrics/issues/31
if (!document.pictureInPictureEnabled) {
  appendStyle(localConfig.NO_PIP_STYLE);
}
