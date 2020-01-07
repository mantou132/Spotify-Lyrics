import generateSVG from './svg';
import songObserver from './song';
import { video, audio } from './element';
import { lyric, updateLyric, Lyric } from './lyrics';

songObserver(updateLyric);

declare global {
  interface HTMLCanvasElement {
    captureStream: (frameRate?: number) => MediaStream;
  }
  interface CanvasCaptureMediaStreamTrack extends MediaStreamTrack {
    canvas: HTMLCanvasElement;
  }
  interface Document {
    pictureInPictureElement: HTMLVideoElement | null;
  }
}

const WIDTH = 640;
const HEIGHT = 640;
const INTERVAL = 80;

const weakMap = new WeakMap<MediaStream, CanvasCaptureMediaStreamTrack>();
const contentWeakMap = new WeakMap<CanvasCaptureMediaStreamTrack, string>();
const lyricWeakMap = new WeakMap<CanvasCaptureMediaStreamTrack, Lyric>();
const prevTimeWeakMap = new WeakMap<CanvasCaptureMediaStreamTrack, number>();
const lyricCanvas = document.createElement('canvas');
const ctx = lyricCanvas.getContext('2d');
// Firefox Issue: NS_ERROR_NOT_INITIALIZED
// https://bugzilla.mozilla.org/show_bug.cgi?id=1572422
const lyricTrack = lyricCanvas.captureStream().getVideoTracks()[0] as CanvasCaptureMediaStreamTrack;
lyricCanvas.width = WIDTH;
lyricCanvas.height = HEIGHT;
if (ctx) {
  const update = () => {
    if (!video || !audio || !(video.srcObject instanceof MediaStream) || !document.pictureInPictureElement) {
      return setTimeout(update, INTERVAL);
    }
    if (!weakMap.get(video.srcObject)) {
      // song change
      // change coverTrack
      const coverTrack = video.srcObject.getVideoTracks()[0] as CanvasCaptureMediaStreamTrack;
      const stream = new MediaStream([lyricTrack]);
      video.srcObject = stream;
      weakMap.set(video.srcObject, coverTrack);
    }
    const coverTrack = weakMap.get(video.srcObject) as CanvasCaptureMediaStreamTrack;
    const prevTime = prevTimeWeakMap.get(coverTrack) || 0;
    const url = `data:image/svg+xml,${encodeURIComponent(
      generateSVG(lyricWeakMap.get(coverTrack) || lyric, audio.currentTime > prevTime ? audio.currentTime : prevTime),
    )}`;
    prevTimeWeakMap.set(coverTrack, audio.currentTime);
    const img = new Image(WIDTH, HEIGHT);
    img.src = url;
    img.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      if (video?.srcObject && video.srcObject instanceof MediaStream) {
        ctx.drawImage(coverTrack.canvas, 0, 0, WIDTH, HEIGHT);
        contentWeakMap.set(coverTrack, url);
        if (lyric.length > 0) {
          if (coverTrack) lyricWeakMap.set(coverTrack, lyric);
          ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
        }
      }
      setTimeout(update, INTERVAL);
    };
    img.onerror = () => setTimeout(update, INTERVAL);
  };
  update();
} else {
  throw new Error('lytics canvas context fail');
}
