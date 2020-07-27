import { parseLyrics, Lyric, matchingLyrics, Song } from './lyrics';

describe('parse lyrics', () => {
  test('edge case', () => {
    expect(parseLyrics('')).toEqual<Lyric>([]);
    expect(parseLyrics(' ')).toEqual<Lyric>([]);
    expect(parseLyrics('\n')).toEqual<Lyric>([]);
    expect(parseLyrics('BY:MT')).toEqual<Lyric>([]);
    expect(parseLyrics('[ar:Beyond]')).toEqual<Lyric>([{ startTime: null, text: 'AR: Beyond' }]);
  });
  test('lyrics line', () => {
    expect(parseLyrics('[02:01]\n')).toEqual<Lyric>([{ startTime: 121, text: ' ' }]);
    expect(parseLyrics('[02:01]编')).toEqual<Lyric>([{ startTime: 121, text: '编' }]);
    expect(parseLyrics('[02:01]编：')).toEqual<Lyric>([{ startTime: 121, text: '编：' }]);
    expect(parseLyrics('[02:01]编：', true)).toEqual<Lyric>([{ startTime: null, text: '' }]);
  });
});

describe('matching track', () => {
  test('basic', async () => {
    const query = { name: '夜雪', artists: 'Dicky Cheung' };
    const songs: Song[] = [
      { id: 1, artists: [{ name: '张卫健', alias: [] }], name: '夜雪(Live)', album: { name: '' } },
      { id: 2, artists: [{ name: '张卫健', alias: [] }], name: '夜雪', album: { name: '' } },
    ];
    let search = '';
    const getData = async (s: string) => {
      search = s;
      return songs;
    };
    const result = await matchingLyrics(query, getData);
    expect(search).toBe('张卫健 夜雪');
    expect(result.id).toBe(2);
  });
});
