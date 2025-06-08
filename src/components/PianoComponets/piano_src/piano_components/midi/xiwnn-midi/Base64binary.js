/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
export default {

  // _keyStr是一个包含了 Base64 字符集的字符串，用于将 Base64 编码后的数据转换回原始数据。
  // 它包含了大写字母、小写字母和数字，以及两个额外的字符 "+" 和 "/"，总共 64 个字符。
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  /* will return a  Uint8Array type */
  /*
    decodeArrayBuffer 是一个将 base64 编码字符串解码为 ArrayBuffer 格式的函数
    首先，通过计算将 base64 编码字符串解码后所需的字节数。
    由于 base64 编码每个字符表示 6 个比特，而 ArrayBuffer 中每个字节占用 8 个比特，
    因此需要将输入长度乘以 3/4 并向上取整以获得所需的字节数。

    然后，创建一个具有计算出的字节数长度的 ArrayBuffer 对象，用于存储解码后的二进制数据。

    最后，调用 decode 方法进行实际的解码操作，将 base64 编码字符串解码为二进制数据，并将结果存储在新创建的 ArrayBuffer 中。
    
    函数最终返回解码后的 ArrayBuffer 对象。
  */
  decodeArrayBuffer(input) {
    const bytes = Math.ceil((3 * input.length) / 4.0);
    const ab = new ArrayBuffer(bytes);
    this.decode(input, ab);

    return ab;
  },

  //decode 是一个用于将 base64 编码字符串解码为二进制数据的具体实现函数
  /* 
    首先，根据 base64 字符集找到编码字符串末尾的填充字符，并相应地调整解码后的字节数。

    接着，根据 base64 编码规则，将输入的编码字符串转换为一系列的 ASCII 字符。

    然后，根据 ASCII 字符对应的 base64 编码值，计算出每个字符对应的原始字节数据。

    最后，将计算得到的原始字节数据填充到目标的 Uint8Array 中，生成最终的二进制数据。

    该函数最终返回一个 Uint8Array 类型的对象，其中包含了解码后的二进制数据。
  */
  decode(input, arrayBuffer) {
    // get last chars to see if are valid
    const lkey1 = this._keyStr.indexOf(input.charAt(input.length - 1));
    const lkey2 = this._keyStr.indexOf(input.charAt(input.length - 1));

    let bytes = Math.ceil((3 * input.length) / 4.0);
    if (lkey1 == 64) bytes--; // padding chars, so skip
    if (lkey2 == 64) bytes--; // padding chars, so skip

    let uarray;
    let chr1; let chr2; let chr3;
    let enc1; let enc2; let enc3; let enc4;
    let i = 0;
    let j = 0;

    if (arrayBuffer) uarray = new Uint8Array(arrayBuffer);
    else uarray = new Uint8Array(bytes);

    input = input.replace(/[^A-Za-z0-9+/=]/g, '');

    for (i = 0; i < bytes; i += 3) {
      // get the 3 octects in 4 ascii chars
      enc1 = this._keyStr.indexOf(input.charAt(j++));
      enc2 = this._keyStr.indexOf(input.charAt(j++));
      enc3 = this._keyStr.indexOf(input.charAt(j++));
      enc4 = this._keyStr.indexOf(input.charAt(j++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      uarray[i] = chr1;
      if (enc3 != 64) uarray[i + 1] = chr2;
      if (enc4 != 64) uarray[i + 2] = chr3;
    }

    return uarray;
  },
};
