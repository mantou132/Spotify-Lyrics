import { expect, test } from 'vitest';

import { getWords } from './canvas-renderer';

test('line break', () => {
  expect(getWords('你好，这是中文。')).toEqual(['你', '好，', '这', '是', '中', '文。']);
  expect(getWords('Hello, this is english.')).toEqual([
    'Hello,',
    ' ',
    'this',
    ' ',
    'is',
    ' ',
    'english.',
  ]);
  expect(getWords(`cause i can't read`)).toEqual(['cause', ' ', 'i', ' ', `can't`, ' ', 'read']);
  expect(getWords(`callin' you`)).toEqual([`callin'`, ' ', 'you']);
  expect(getWords(`callin 'you`)).toEqual(['callin', ' ', `'you`]);

  expect(getWords('ฉันจะพาเธอไป ที่ไม่ใช่ที่ไหน')).toEqual([
    'ฉันจะพาเธอไป',
    ' ',
    'ที่ไม่ใช่ที่ไหน',
  ]);
});
