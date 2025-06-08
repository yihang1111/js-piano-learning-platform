export const MIDI = {
  // 存储加载的声音字体资源
  Soundfont: {},
  // 播放器对象
  players: {},
  defaultPlayer: null,
};

// export const noteIDmap = {};
// 用于将 MIDI 键码映射到音符名称
export const key2noteList = new Array(89);

const keyNameList = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
for (let i = 1, c = 0; i < 89; i += 1) {
  const n = (i + 12 - 4) % 12;
  if (n === 0) {
    c += 1;
  }
  const name = `${keyNameList[n]}${c}`;
  // noteIDmap[name] = i;
  key2noteList[i] = name;
}
// 钢琴键盘上的索引值快速获取到对应的音符名
