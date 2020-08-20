declare module 'chinese-conv' {
  export const sify: (s: string) => string;
  export const tify: (s: string) => string;
}

interface HTMLCanvasElement {
  captureStream: (frameRate?: number) => MediaStream;
}
interface CanvasCaptureMediaStream extends MediaStream {
  canvas: HTMLCanvasElement;
}
interface CanvasCaptureMediaStreamTrack extends MediaStreamTrack {
  canvas: HTMLCanvasElement;
}

interface HTMLVideoElement {
  requestPictureInPicture: () => Promise<unknown>;
}

interface Document {
  pictureInPictureEnabled: boolean;
  pictureInPictureElement: HTMLVideoElement | null;
  exitPictureInPicture: () => Promise<void>;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}
