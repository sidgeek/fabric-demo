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

function isEngListFont(str: string) {
  var pattern = new RegExp("([\u0041-\u005A]|[\u0061-\u007A])+");
  return pattern.test(str);
}

function isEngListChart(str: string) {
  var pattern = new RegExp(
    "([\u0020\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002a\u002b\u002c\u002d\u002e\u002f\u003a\u003b\u003c\u003d\u003f\u0040\u005b\u005c\u005d\u005e\u005f\u0060\u007b\u007c\u007d\u007e])+",
    "g"
  );
  return pattern.test(str);
}

function isNumber(str: string) {
  var pattern = new RegExp("([\u0030-\u0039])+");
  return pattern.test(str);
}

export enum FontAttrType {
  CHI_FONT = "CHI_FONT",
  CHI_CHAR = "CHI_CHAR",
  CHI_ALL = "CHI_ALL",
  NUM = "NUM",
  ENG_FONT = "ENG_FONT",
  ENG_CHAR = "ENG_CHAR",
  OTHER = "OTHER",
}

function getFontAttrType(str: string) {
  if (isChinese(str)) {
    return FontAttrType.CHI_ALL;
  } else if (isEngListFont(str)) {
    return FontAttrType.ENG_FONT;
  } else if (isEngListChart(str)) {
    return FontAttrType.ENG_CHAR;
  } else if (isNumber(str)) {
    return FontAttrType.NUM;
  } else {
    return FontAttrType.OTHER;
  }
}

function geFixW(ratio: number, comW?: number) {
  if (!comW) {
    console.log("Not valid param", comW);
    return 0;
  }

  return ratio * comW;
}

// for chinese to eng char
function geFixW2(baseW: number, comW?: number) {
  if (!comW) {
    console.error("Not valid param", comW);
    return 0;
  }

  return baseW * 0.45 - comW * 0.5;
}

function getPosXFixAlgorithm(
  oldT: FontAttrType | null,
  newT: FontAttrType,
  baseW: number
) {
  const defFun = (lastW: number, curW: number) => geFixW(1, undefined);

  if (oldT === FontAttrType.CHI_ALL) {
    if (newT === FontAttrType.ENG_CHAR) {
      return (lastW: number, curW: number) => geFixW2(baseW, curW);
    } else if (newT === FontAttrType.ENG_FONT) {
      return (lastW: number, curW: number) => geFixW(0.1, curW);
    } else if (newT === FontAttrType.NUM) {
      return (lastW: number, curW: number) => geFixW(0.6, curW);
    } else {
      return defFun;
    }
  } else if (oldT === FontAttrType.ENG_CHAR) {
    if (newT === FontAttrType.CHI_ALL) {
      return (lastW: number, curW: number) => -geFixW2(baseW, lastW);
    } else if (newT === FontAttrType.ENG_FONT) {
      return (lastW: number, curW: number) => -geFixW(0.2, curW);
    } else if (newT === FontAttrType.NUM) {
      return (lastW: number, curW: number) => -geFixW(0.2, curW);
    }
    return defFun;
  } else if (oldT === FontAttrType.ENG_FONT) {
    if (newT === FontAttrType.CHI_ALL) {
      return (lastW: number, curW: number) => -geFixW(0.1, lastW);
    } else if (newT === FontAttrType.ENG_CHAR) {
      return (lastW: number, curW: number) => geFixW(0.2, lastW);
    }

    return defFun;
  } else if (oldT === FontAttrType.NUM) {
    if (newT === FontAttrType.CHI_ALL) {
      return (lastW: number, curW: number) => -geFixW(0.6, lastW);
    } else if (newT === FontAttrType.ENG_CHAR) {
      return (lastW: number, curW: number) => geFixW(0.2, lastW);
    }
    return defFun;
  } else {
    return defFun;
  }
}

function hasChineseFont(str: string) {
  var pattern = new RegExp("[\u4E00-\u9FA5]+");
  return pattern.test(str);
}

export { isChinese, getFontAttrType, getPosXFixAlgorithm, hasChineseFont };
