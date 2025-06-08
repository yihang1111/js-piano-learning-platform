/*
  通过这种方式，可以根据浏览器的支持情况选择合适的音频格式来提供给用户，
  以确保最佳的音频兼容性和用户体验。

  这段代码导出了一个名为 getSuportMP3orOGG 的函数，用于检测浏览器是否支持 MP3 或 OGG 格式的音频。
*/
export function getSuportMP3orOGG() {
  // 创建一个新的 Audio 对象。
  const audio = new Audio();
  // 使用 canPlayType 方法检测浏览器是否支持 MP3 格式的音频。
  const mp3 = audio.canPlayType('audio/mpeg');
  //  使用 canPlayType 方法检测浏览器是否支持 OGG 格式的音频。
  // 通过指定 codecs 参数为 vorbis，表示使用 Vorbis 编解码器。
  const ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');

  if (ogg === 'probably') {
    return 'ogg';
  }
  if (mp3 === 'probably') {
    return 'mp3';
  }
  if (ogg === 'maybe') {
    return 'ogg';
  }
  return 'mp3';
}

// ES6 模块，通过 export default 将一个空对象导出。
export default {};
