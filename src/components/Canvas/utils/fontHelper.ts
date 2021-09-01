/**
 * 是否为中文字体
 * @param str
 * @returns
 */

function isChineseFont(str: string) {
  var pattern = new RegExp("[\u4E00-\u9FA5]+");
  return pattern.test(str);
}

/**
 * 是否为中文标点
 * ref: https://gist.github.com/shingchi/64c04e0dd2cbbfbc1350
 * ref: https://blog.csdn.net/COCO56/article/details/87618925
 * @param str
 * @returns
 */
function isChineseChart(str: string) {
  var pattern = new RegExp(
    "([\u3002\uff1f\uff01\u3010\u3011\uff0c\u3001\uff1b\uff1a\u300c\u300d\u300e\u300f\u2019\u201c\u201d\u2018\uff08\uff09\u3014\u3015\u2006\u2013\uff0e\u2014\u300a\u300b\u3008\u3009])+",
    "g"
  );
  return pattern.test(str);
}

/**
 * 是否为中文标点或字符
 * ref： https://gist.github.com/shingchi/64c04e0dd2cbbfbc1350
 * @param str
 * @returns
 */
function isChinese(str: string) {
  var pattern = new RegExp(
    "([\u4E00-\u9FA5]|[\u3002\uff1f\uff01\u3010\u3011\uff0c\u3001\uff1b\uff1a\u300c\u300d\u300e\u300f\u2019\u201c\u201d\u2018\uff08\uff09\u3014\u3015\u2006\u2013\uff0e\u2014\u300a\u300b\u3008\u3009])+",
    "g"
  );
  return pattern.test(str);
}

export { isChineseFont, isChineseChart, isChinese };
