import { Song } from './lyrics';
import { request } from './request';

interface GeniusArtist {
  name: string;
}

interface GeniusSong {
  id: number;
  title: string;
  primary_artist: GeniusArtist;
}

interface GeniusItem {
  type: string;
  result: GeniusSong;
}

interface SearchResponse {
  hits: GeniusItem[];
}

interface GeniusResponse<T> {
  response?: T;
}

const API_HOST = 'https://files.xianqiao.wang/https://api.genius.com';
const TOKEN = 'jjffIV35KV6yy1XYK1lDAdOjVmQX7Pf4MApr2-1Kmw4Sh6gJilaFEDsmv3VkBiWA';

export async function fetchSongList(q: string, fetchOptions?: RequestInit): Promise<Song[]> {
  const searchQuery = new URLSearchParams({ q, access_token: TOKEN });
  const { response }: GeniusResponse<SearchResponse> = await request(
    `${API_HOST}/search?${searchQuery}`,
    fetchOptions,
  );
  if (!response?.hits) return [];
  return response.hits
    .filter((e) => e.type === 'song')
    .map(({ result }) => {
      return {
        id: result.id,
        name: result.title,
        artists: [
          {
            name: result.primary_artist.name,
            alias: [],
          },
        ],
        album: { name: '' },
      };
    });
}

const domParser = new DOMParser();
export async function fetchGeniusLyrics(songId: number, fetchOptions?: RequestInit) {
  try {
    const html = await request(
      `https://files.xianqiao.wang/https://genius.com/songs/${songId}`,
      fetchOptions,
    );
    const doc = domParser.parseFromString(html, 'text/html');
    const lyricsEle = doc.querySelector('.lyrics') as HTMLElement | null;
    if (!lyricsEle) {
      throw new Error('Not found genius lyrics element');
    }
    const text = lyricsEle.innerText;
    const highlights = [...lyricsEle.querySelectorAll('a')]
      .map((e) => e.innerText.replace(/\.?\n/g, '. ').trim())
      .filter((e) => e.length > 30);
    return { text, highlights: highlights.length ? highlights : null };
  } catch {
    return { text: '', highlights: null };
  }
}
