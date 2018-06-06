/**
 * @description 工具方法
 */

/**
 * @description 解析模型配置
 * @param {string} name 模型名称
 * @param {string} img 如果为 'png' || 'jpg' 则按规则生成图片
 */
export const parseModel = (() => {
  const imgType = ['png', 'jpg'];
  const imgName = img => img.slice(img.indexOf('_') + 1);

  return (name, img) => {
    const model = { name };
    if (imgType.includes(img)) {
      model.img = `${imgName(name)}.${img}`;
    } else if (img) {
      model.img = img;
    }
    return model;
  };
})();

/**
 * @param {array} strArr 拼接字符串数组
 * @param {varArr} varArr 变量数组，数组元素为数字时生成数字，数组元素为字符串时生成 Unicode 码，数组第三位为过滤
 * @returns (['abc_', '_efg_', '_hij'], [1, 4, [3]], ['65', '67']) => ['abc_1_efg_A_hij', 'abc_2_efg_B_hij', 'abc_4_efg_C_hij']
 */
export const assetsFormat = (strArr, ...varArr) => {
  let arr = [];
  if (varArr.length) {
    // 转成结果数组
    const result = varArr.map(item => {
      let arr = Array.from(
        { length: +item[1] - +item[0] + 1 },
        (num, index) => +item[0] + index
      );
      if (item[2]) {
        if (Array.isArray(item[2])) {
          arr = arr.filter(num => !item[2].includes(num));
        } else if (typeof item[2] === 'function') {
          arr = arr.filter(item[2]);
        }
      }
      return arr.map(num => typeof item[0] === 'string' ? String.fromCharCode(num) : num);
    });
    // 得到最长数字，轮询添加拼接字符串
    let max = Math.max(...result.map(item => item.length));
    for (let i = 0; i < max; i++) {
      let str = strArr[0];
      result.forEach((item, index) => {
        str += `${(item[i] !== undefined ? item[i] : item[item.length - 1])}${strArr[index + 1]}`;
      });
      arr.push(str);
    }
  }
  return arr;
};
/**
 * @description 添加模型数据
 */
export const parseModelArr = (arr) => {
  const modelList = [].concat(...arr.map(item => assetsFormat(...item)));
  return modelList.map(name => ({ name }));
};
/**
 * @description 根据正则匹配添加图片
 * @param {array} list 需要添加图片组
 * @param {regExp} reg 正则
 * @param {string} img 图片名
 */
export const addImageByName = (list, reg, img) => {
  list.forEach(item => {
    if (reg.test(item.name) && !item.img) {
      item.img = img;
    }
  });
};

/**
 * @description 按正则规则过滤数据名字
 * @param {array} arr 资源集合
 * @param {regexp} reg 正则表达式
 * @returns {array} 返回过滤后的数组
 */
export const filterArrByReg = (arr, reg) => {
  return arr.filter(item => {
    return reg.test(item.name);
  });
};

export default {
  assetsFormat,
  parseModelArr,
  addImageByName,
  filterArrByReg
};
