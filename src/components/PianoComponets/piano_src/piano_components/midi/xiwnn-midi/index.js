// 这段代码通过解构导入了来自 ./midi 模块中的 MIDI 对象，并将其重命名为 MIDIOBJ。
// 这意味着在当前模块中可以使用 MIDIOBJ 这个变量来引用 ./midi 模块导出的 MIDI 对象。
import { MIDI as MIDIOBJ } from './midi';


import { loadSoundfont as loadSoundfontModule } from './script-loader';

export const MIDI = MIDIOBJ;

export const loadSoundfont = loadSoundfontModule;

export function setInstrument() {
  // 设置音色
}

// 尝试初始化音频
export function tryInitAudioContext() {
  if (MIDIOBJ.defaultPlayer && MIDIOBJ.defaultPlayer.prepare) {
    MIDIOBJ.defaultPlayer.prepare();
  }
}

export function noteOn(keys) {
  if (MIDIOBJ.defaultPlayer) {
    keys.forEach((value) => {
      MIDIOBJ.defaultPlayer.noteOn(value);
    });
  }
}

export function noteOff(keys) {
  if (MIDIOBJ.defaultPlayer) {
    keys.forEach((value) => {
      MIDIOBJ.defaultPlayer.noteOff(value);
    });
  }
}

export function stopAllNotes() {
  if (MIDIOBJ.defaultPlayer) {
    MIDIOBJ.defaultPlayer.stopAllNotes();
  }
}
