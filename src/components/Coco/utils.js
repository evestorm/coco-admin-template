/**
 * 将style字符串转换为对象
 * @param styleStr style字符串
 * @param prop style属性
 * @returns {{}}
 */
export const transformStyle = (styleStr, prop) => {
  try {
    const style = JSON.parse(styleStr);
    if (style && style[prop]) {
      const styleObject = {};
      const stylePairs = style[prop].split(';');

      stylePairs.forEach(pair => {
        const [key, ...valueParts] = pair.split(':').map(str => str.trim());
        let value = valueParts.join(':'); // 重新组合值，包括带引号的部分
        if (key && value) {
          // 判断值是否包含引号，如果是，则去掉一层引号
          value = value.startsWith("'") && value.endsWith("'") ? value.slice(1, -1) : value;
          styleObject[key] = value;
        }
      });
      return styleObject;
    }
  } catch (e) {
    return {}
  }
}
