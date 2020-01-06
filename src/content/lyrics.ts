const lyricExample = `
[ti:海阔天空]
[ar:Beyond]
[al:]
 
[00:00]Beyond：海阔天空
[01:40][00:07]今天我寒夜里看雪飘过
[01:48][00:24]怀着冷却了的心窝飘远方
[01:53][00:29]风雨里追赶
[01:57][00:33]雾里分不清影踪
[02:00][00:36]天空海阔你与我
[02:03][00:39]可会变(谁没在变)
[00:42]多少次迎着冷眼与嘲笑
[00:49]从没有放弃过心中的理想
[00:54]一刹那恍惚
[00:58]若有所失的感觉
[01:01]不知不觉已变淡
[01:04]心里爱(谁明白我)
[03:56][03:13][02:06][01:07]原谅我这一生不羁放纵爱自由
[04:01][03:24][02:12][01:13]也会怕有一天会跌倒
[04:06][03:44][03:29][02:19][01:20]被弃了理想谁人都可以
[04:14][03:49][03:37][02:26][01:26]那会怕有一天只你共我
[03:02]仍然自由自我
[03:10]永远高唱我歌
`;

class Line {
  startTime: number | null = null;
  text = '';
}

export type Lyric = Line[];

export let lyric: Lyric = [];
export function updateLyric() {
  const lyricStr = lyricExample;
  const lines = lyricStr.split('\n').map(line => line.trim());
  lyric = lines
    .map(line => {
      // ["[ar:Beyond]"]
      // ["[03:10]"]
      // ["[03:10]", "永远高唱我歌"]
      // ["永远高唱我歌"]
      // ["[03:10]", "[03:10]", "永远高唱我歌"]
      const matchResult = line.match(/(\[.*?\])|([^\[\]]+)/g) || [line];
      const textIndex = matchResult.findIndex(slice => !slice.endsWith(']'));
      let text = '';
      if (textIndex > -1) {
        text = matchResult.splice(textIndex, 1)[0];
      }
      return matchResult.map(slice => {
        const result = new Line();
        const [key, value] = slice.match(/[^\[\]]+/g)?.[0].split(':') || [];
        const [min, sec] = [parseInt(key), parseInt(value)];
        if (!isNaN(min)) {
          result.startTime = min * 60 + sec;
          result.text = text;
        } else {
          result.text = value;
        }
        return result;
      });
    })
    .flat()
    .sort((a, b) => {
      if (a.startTime === null) {
        return 0;
      }
      if (b.startTime === null) {
        return 1;
      }
      return a.startTime - b.startTime;
    });
}
