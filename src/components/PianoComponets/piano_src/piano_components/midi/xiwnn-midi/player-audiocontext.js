import Base64Binary from './Base64binary';
import { MIDI, key2noteList } from './midi';

export default class Player {
  constructor(instrument) {
    this.instrument = instrument;
    this.sources = new Array(89).fill(false);
    this.buffers = new Array(89).fill(false);
    this.sourceBufferInited = false;
    this.prepareState = 0; // 0: 未准备 1: 准备中  2: 准备完成
  }
  // prepare 方法用于初始化音频上下文并调用 initSoureBuffer 方法加载音频资源。
  async prepare() {
    if (this.prepareState !== 0) {
      return;
    }
    this.prepareState = 1;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    try {
      await this.initSoureBuffer();
      this.prepareState = 2;
    } catch (e) {
      this.prepareState = 0;
      console.error(e);
    }
  }

  // 加载音频资源方法 initSoureBuffer
  async initSoureBuffer() {
    const soundfont = MIDI.Soundfont[this.instrument];
    // 检查指定乐器的声音字体资源是否存在
    if (!soundfont) {
      throw new Error(`it's not exists soundfound of named ${this.instrument}`);
    }
    const { ctx } = this;
    const promises = [];

    // 然后遍历钢琴键码数组，依次加载每个音符对应的音频数据。
    for (let i = 1; i < 89; i += 1) {
      promises.push(
        (() => {
          const name = key2noteList[i];
          const src = soundfont[name];
          return new Promise((resolve, reject) => {
            if (src) {
              // 使用 split 方法将 base64 字符串按逗号分隔成数组，然后通过索引 [1] 获取第二部分，
              // 即去除了前缀的纯 base64 编码字符串。
              const base64 = src.split(',')[1];

              // base64 编码字符串解码为 ArrayBuffer 格式的二进制数据。
              // 这个方法是对 base64 编码字符串进行解码的，将其转换为原始的二进制数据，以便后续的音频数据解码使用。
              const avbuffer = Base64Binary.decodeArrayBuffer(base64);
              new Promise((res, rej) => {
                // avbuffer 变量将包含解码后的 ArrayBuffer 格式的音频数据，传递给 decodeAudioData 方法进行音频数据的解码处理。
                ctx.decodeAudioData(avbuffer, res, rej);
              })
                .then((buffer) => {
                  this.buffers[i] = buffer;
                  resolve();
                })
                .catch(reject);
            }
          });
        })(),
      );
    }
    await Promise.all(promises);
    this.sourceBufferInited = true;
  }

  // velocity
  noteOn(id) {
    if (this.buffers[id]) {
      if (this.sources[id]) {
        this.noteOff(id);
      }
      const buffer = this.buffers[id];
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const gainNode = this.ctx.createGain();
      gainNode.connect(this.ctx.destination);
      gainNode.gain.value = 0;
      source.connect(gainNode);
      source.start();
      // 这里调大音量
      gainNode.gain.linearRampToValueAtTime(3, this.ctx.currentTime + 0.01);
      this.sources[id] = {
        source,
        gainNode,
      };
    } else {
      this.prepare();
    }
  }

  noteOff(id) {
    if (this.sources[id]) {
      const { source, gainNode } = this.sources[id];
      const { gain } = gainNode;
      // console.log(gain.value);
      gain.linearRampToValueAtTime(gain.value, this.ctx.currentTime);
      gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        source.disconnect();
      }, 400);
      this.sources[id] = null;
    }
  }

  stopAllNotes() {}
}
