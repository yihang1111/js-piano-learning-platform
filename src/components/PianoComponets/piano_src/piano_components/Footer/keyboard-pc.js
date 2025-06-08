/**
 * 用于PC键盘控制的js
 */
import { keypress } from './piano-control';

let isOn = false;

const noticeCallbacks = [];

const pressArray = new Array(250).fill(false);

let storeCacheConfig = {
  pckey2key: {},
};
// 名为 usedArray 的数组，它有 255 个元素，并且每个元素都被初始化为布尔值 false。
// 这样的代码通常用于标记某些元素是否已被使用或访问过
// 例如，当你访问或使用数组中的某个元素时，你可以将相应的元素设置为 true，以表明它已经被使用过了。
const usedArray = new Array(255).fill(false);


export function keyDown(which) {
  if (pressArray[which] === false) {
    pressArray[which] = true;
    const pckey2keyMap = storeCacheConfig.pckey2key;
    const pkey = pckey2keyMap[which];
    if (pkey) {
      keypress.down([pkey], false);
    }
    noticeCallbacks.forEach((func) => {
      func(true, which);
    });
  }
}
export function keyUp(which) {
  if (pressArray[which] === true) {
    pressArray[which] = false;
    const pckey2keyMap = storeCacheConfig.pckey2key;
    const pkey = pckey2keyMap[which];
    if (pkey) {
      keypress.up([pkey]);
    }
    noticeCallbacks.forEach((func) => {
      func(false, which);
    });
  }
}

function keyDownEvent(ev) {
  keyDown(ev.which);
  if (usedArray[ev.which]) {
    ev.preventDefault();
    return false;
  }
  return undefined;
}

function keyUpEvent(ev) {
  // console.log('up', ev.which);
  keyUp(ev.which);
  if (usedArray[ev.which]) {
    ev.preventDefault();
    return false;
  }
  return undefined;
}


export function onEvent(cb) {
  if (cb instanceof Function && noticeCallbacks.indexOf(cb) === -1) {
    noticeCallbacks.push(cb);
  }
}

export function offEvent(cb) {
  const index = noticeCallbacks.indexOf(cb);
  if (index >= 0) {
    noticeCallbacks.splice(index, 1);
  }
}

/**
 * 开始监听
 */
export function start(cacheConfig) {
  if (!isOn) {
    isOn = true;
    if (cacheConfig) {
      storeCacheConfig = cacheConfig;
    }
    document.addEventListener('keydown', keyDownEvent);
    document.addEventListener('keyup', keyUpEvent);
  }
}

/**
 * 停止监听
 */
export function stop() {
  if (isOn) {
    isOn = false;
    document.removeEventListener('keydown', keyDownEvent);
    document.removeEventListener('keyup', keyUpEvent);
  }
}

// n 代表键盘按钮名， c 代表对应的键码， d=1 代表 该键盘按钮不起作用 w:90 代表此键的宽为90 h: 107 代表此件的高度为107
export function getKeyConfig() {
  return [
    [
      { n: '~', c: 192 },
      { n: '1', c: 49 },
      { n: '2', c: 50 },
      { n: '3', c: 51 },
      { n: '4', c: 52 },
      { n: '5', c: 53 },
      { n: '6', c: 54 },
      { n: '7', c: 55 },
      { n: '8', c: 56 },
      { n: '9', c: 57 },
      { n: '0', c: 48 },
      { n: '-', c: 189 },
      { n: '=', c: 187 },
      { n: 'Backspace', c: 8, w: 90 },

      {
        n: 'Insert', c: 45, m: 20,
      },
      { n: 'Home', c: 36 },
      { n: 'PgU', c: 33 },

      {
        n: 'Num', c: 144, m: 20,
      },
      { n: '/', c: 111 },
      { n: '*', c: 106 },
      { n: '-', c: 109 },
    ],
    [
      {
        n: 'Tab', c: 9, w: 72, d: 1,
      },
      { n: 'Q', c: 81 },
      { n: 'W', c: 87 },
      { n: 'E', c: 69 },
      { n: 'R', c: 82 },
      { n: 'T', c: 84 },
      { n: 'Y', c: 89 },
      { n: 'U', c: 85 },
      { n: 'I', c: 73 },
      { n: 'O', c: 79 },
      { n: 'P', c: 80 },
      { n: '{', c: 219 },
      { n: '}', c: 221 },
      { n: '\\', c: 220, w: 68 },

      {
        n: 'Del', c: 46, m: 20,
      },
      { n: 'End', c: 35 },
      { n: 'PgD', c: 34 },

      { n: '7', c: 103, m: 20 },
      { n: '8', c: 104 },
      { n: '9', c: 105 },
      { n: '+', c: 107, h: 107 },
    ],
    [
      {
        n: 'Caps Lock', c: 20, w: 94, d: 1,
      },
      { n: 'A', c: 65 },
      { n: 'S', c: 83 },
      { n: 'D', c: 68 },
      { n: 'F', c: 70 },
      { n: 'G', c: 71 },
      { n: 'H', c: 72 },
      { n: 'J', c: 74 },
      { n: 'K', c: 75 },
      { n: 'L', c: 76 },
      { n: ';', c: 186 },
      { n: '"', c: 222 },
      {
        n: 'Enter', c: 13, w: 103, d: 1,
      },

      // { n: '', c: 0, w: 166, d: 1, m: 20 }, // 一个空白

      { n: '4', c: 100, m: 25 + 166 + 20 },
      { n: '5', c: 101 },
      { n: '6', c: 102 },
    ],
    [
      {
        n: 'Shift', c: 16, w: 116, d: 1,
      },
      { n: 'Z', c: 90 },
      { n: 'X', c: 88 },
      { n: 'C', c: 67 },
      { n: 'V', c: 86 },
      { n: 'B', c: 66 },
      { n: 'N', c: 78 },
      { n: 'M', c: 77 },
      { n: '<', c: 188 },
      { n: '>', c: 190 },
      { n: '?', c: 191 },
      {
        n: 'Shift', c: 16, w: 138, d: 1,
      },

      { n: '↑', c: 38, m: 20 + 57 },

      { n: '1', c: 97, m: 20 + 57 },
      { n: '2', c: 98 },
      { n: '3', c: 99 },
      {
        n: 'Enter', c: 13, d: 1, h: 107,
      },
    ],
    [
      {
        n: 'Ctrl', c: 17, w: 60, d: 1,
      },
      {
        n: 'Win', c: 91, w: 60, d: 1,
      },
      {
        n: 'Alt', c: 18, w: 60, d: 1,
      },
      { n: 'Space', c: 32, w: 429 },
      {
        n: 'Alt', c: 18, w: 60, d: 1,
      },
      {
        n: 'Opt', c: 93, w: 60, d: 1,
      },
      {
        n: 'Ctrl', c: 17, w: 60, d: 1,
      },

      { n: '←', c: 37, m: 20 },
      { n: '↓', c: 40 },
      { n: '→', c: 39 },

      {
        n: '0', c: 96, w: 107, m: 20,
      },
      { n: '.', c: 110 },
    ],
  ];
}

(function () {
  const kbdMain = getKeyConfig();
  kbdMain.forEach((item) => {
    item.forEach((element) => {
      if (element.d !== 1) {
        usedArray[element.c] = true;
      }
    });
  });
}());
