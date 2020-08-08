export interface Lyric {
  name: string;
  artists: string;
  platform: string;
  user: string;
  neteaseID?: number;
  lyric?: string;
}

export interface LyricsResponse<T> {
  data?: T;
  message: string;
}
