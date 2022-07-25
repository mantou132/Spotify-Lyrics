import { parseLyrics, Lyric, matchingLyrics, Song } from './lyrics';

describe('parse lyrics', () => {
  test('edge case', async () => {
    expect(await parseLyrics('')).toEqual<Lyric>(null);
    expect(await parseLyrics(' ')).toEqual<Lyric>(null);
    expect(await parseLyrics('\n')).toEqual<Lyric>(null);
    expect(await parseLyrics('BY:MT')).toEqual<Lyric>(null);
    expect(await parseLyrics('BY:MT\nBY:MT')).toEqual<Lyric>(null);
    expect(await parseLyrics('[ar:Beyond]')).toEqual<Lyric>([
      { startTime: null, text: 'AR: Beyond' },
    ]);
    expect(await parseLyrics('[invalid]')).toEqual<Lyric>([{ startTime: null, text: '' }]);
  });
  test('lyrics line', async () => {
    expect(await parseLyrics('Text', { keepPlainText: true })).toEqual<Lyric>([
      { startTime: null, text: 'Text' },
    ]);
    expect(await parseLyrics('[02:01]\n')).toEqual<Lyric>([{ startTime: 121, text: '' }]);
    expect(await parseLyrics('[02:01]编')).toEqual<Lyric>([{ startTime: 121, text: '编' }]);
    expect(await parseLyrics('[02:01]编：xx')).toEqual<Lyric>([{ startTime: 121, text: '编: xx' }]);
    expect(await parseLyrics('[02:01]编：', { useTChinese: true })).toEqual<Lyric>([
      { startTime: 121, text: '編:' },
    ]);
    expect(await parseLyrics('[02:01]编：', { cleanLyrics: true })).toEqual<Lyric>([
      { startTime: null, text: '' },
    ]);
  });
});

describe('matching track', async () => {
  test('basic', async () => {
    const query = { name: '夜雪', artists: 'Dicky Cheung' };
    const songs: Song[] = [
      { id: 1, artists: [{ name: '张卫健', alias: [] }], name: '夜雪(Live)', album: { name: '' } },
      { id: 2, artists: [{ name: '张卫健', alias: [] }], name: '夜雪', album: { name: '' } },
    ];
    let search = '';
    const fetchData = async (s: string) => {
      if (!search) search = s;
      return songs;
    };
    const fetchTransName = async () => ({});
    const result = await matchingLyrics(query, { fetchData, fetchTransName });
    expect(search).toBe('张卫健 夜雪');
    expect(result.id).toBe(2);
  });
});
