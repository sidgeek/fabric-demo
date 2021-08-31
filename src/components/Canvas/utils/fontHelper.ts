function isChinese(str: string) {
  var pattern = new RegExp("[\u4E00-\u9FA5]+");
  return pattern.test(str);
}

export { isChinese };
