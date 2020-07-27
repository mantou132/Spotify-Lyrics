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
});
