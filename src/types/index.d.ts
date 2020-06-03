declare module 'chinese-conv/tongwen/tongwen-ts' {
  const TS: (s: string) => string;
  export default TS;
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
