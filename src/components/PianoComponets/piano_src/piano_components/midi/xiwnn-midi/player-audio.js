import { MIDI, key2noteList } from './midi';

export default class Player {
  constructor(instrument) {
    this.instrument = instrument;
    this.audios = new Array(89).fill(false);
    const soundfont = MIDI.Soundfont[instrument];
    if (!soundfont) {
      throw new Error(`it's not exists soundfound of named ${instrument}`);
    }
    // console.log(soundfont);
    for (let i = 1; i < 89; i += 1) {
      // key2noteList
      // 该数组存储了键盘上每个按键对应的音符名称
      const name = key2noteList[i];
      // 使用这些音符名称在 soundfont 对象中查找相应的音频文件 URL
      const src = soundfont[name];
      if (src) {
        // 在这里使用的 Audio 对象是 HTML5 中的原生音频 API，它允许在浏览器中加载和播放音频文件。
        const audio = new Audio();
        audio.autoplay = false;
        audio.loop = false;
        audio.src = src;
        // audio.volume;
        // 为了在调试过程中方便查看或操作这个特定的音频对象
        if (i === 40) {
          window.a = audio;
        }
        this.audios[i] = audio;
      }
    }
  }

  // velocity
  noteOn(id) {
    // 检查是否存在音频元素
    if (this.audios[id]) {
      // 如果存在，则将当前时间设置为 0（以便从头开始播放）并播放音频
      // 这样可以确保每次按下音符时都从头开始播放音频。
      this.audios[id].currentTime = 0;
      this.audios[id].play();
    }
  }

  noteOff(id) {
    // 检查是否存在音频元素
    if (this.audios[id]) {
      // this.audios[id].volume = 0;
      // setTimeout(() => {
      // });
      // 如果存在，则暂停音频播放。
      this.audios[id].pause();
    }
  }

  // stopAllNotes() {
  //   //
  // }
}
