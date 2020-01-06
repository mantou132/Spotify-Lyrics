import generateSVG from './svg';
import songObserver from './song';
import { video, audio } from './element';
import { lyric, updateLyric } from './lyrics';

songObserver(updateLyric);

declare global {
  interface HTMLCanvasElement {
    captureStream: (frameRate?: number) => MediaStream;
  }
  interface CanvasCaptureMediaStreamTrack extends MediaStreamTrack {
    canvas: HTMLCanvasElement;
  }
}

const WIDTH = 640;
const HEIGHT = 640;

const weakMap = new WeakMap<MediaStream, CanvasCaptureMediaStreamTrack>();
const lyricCanvas = document.createElement('canvas');
const ctx = lyricCanvas.getContext('2d');
// Firefox Issue: NS_ERROR_NOT_INITIALIZED
// https://bugzilla.mozilla.org/show_bug.cgi?id=1572422
const lyricTrack = lyricCanvas.captureStream().getVideoTracks()[0] as CanvasCaptureMediaStreamTrack;
lyricCanvas.width = WIDTH;
lyricCanvas.height = HEIGHT;
if (ctx) {
  const update = () => {
    const url = `data:image/svg+xml,${encodeURIComponent(generateSVG(lyric, audio?.currentTime))}`;
    const img = new Image(WIDTH, HEIGHT);
    img.src = url;
    img.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      if (video?.srcObject && video.srcObject instanceof MediaStream) {
        let coverTrck = weakMap.get(video.srcObject);
        if (!coverTrck) {
          const stream = new MediaStream([lyricTrack]);
          coverTrck = video.srcObject.getVideoTracks()[0] as CanvasCaptureMediaStreamTrack;
          weakMap.set(stream, coverTrck);
          video.srcObject = stream;
        }
        ctx.drawImage(coverTrck.canvas, 0, 0, WIDTH, HEIGHT);
        if (lyric.length > 0) {
          ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
        }
      }
      requestAnimationFrame(update);
    };
    img.onerror = () => requestAnimationFrame(update);
  };
  update();
} else {
  throw new Error('lytics canvas context fail');
}
// debug
// window.onload = () => {
//   Object.assign(lyricTrack.canvas.style, {
//     width: '300px',
//     height: '300px',
//     position: 'absolute',
//     zIndex: 123123123123123,
//   });
//   document.body.append(lyricTrack.canvas);
// };
