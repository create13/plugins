/**
 *  @file 通用工具方法
 *  @author SuperFuhq
 *  @description 将可复用的方法统一管理，在各个需要调用的页面调用
 */

/**
 *  @description 首字母大写 firstLetterUpper
 *  @param {string} str 用于转化的字符串
 *  @return 返回值为格式化后的字符串
 */
export const flUp = (str) => {
  if (!str.length) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

/**
 *  @description 格式化数字
 *  @param {Number, String} n 用于格式化的数字，小于10的数字前面加0
 *  @return 返回值为格式化后的数字字符串
 */
export const fNum = (n) => parseInt(n, 10) < 10 ? `0${n}` : `${n}`;

/**
 *  @description 格式化日期
 *  @param {String} val 用于格式化日期的数据，要求能够被Date()对象所处理
 *  @param {String} model 用于格式化日期的格式，默认'YYYY-MM-DD hh:mm:ss'表示'2017-05-08 17:44:30',如果 model 的值为 'time' || 'Time' 则返回毫秒值
 *  @return 返回值为格式化后的数据
 */
export const formatDate = (val, model = 'YYYY-MM-DD hh:mm:ss') => {
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/');
  }
  const date = new Date(val);
  const chinese = ['一', '二', '三', '四', '五', '六', '日'];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const week = date.getDay();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const time = date.getTime();
  if (model === 'time' || model === 'Time') {
    return time;
  }
  model = model.replace(/YYYY/, year);
  model = model.replace(/YY/, (year + '').slice(2));
  model = model.replace(/MM/, fNum(month));
  model = model.replace(/M/, month);
  model = model.replace(/[wW]+/, `星期${chinese[week]}`);
  model = model.replace(/DD/, fNum(day));
  model = model.replace(/D/, day);
  model = model.replace(/hh/, fNum(hour));
  model = model.replace(/h/, hour);
  model = model.replace(/mm/, fNum(minute));
  model = model.replace(/m/, minute);
  model = model.replace(/ss/, fNum(second));
  model = model.replace(/s/, second);
  return model;
};

/**
 *  @description 格式化时间
 *  @param {String} val 用于格式化时间戳
 *  @param {String} model 用于格式化日期的格式，默认'hh:mm:ss'表示'17:44:30'
 *  @return 返回值为格式化后的数据
 */
export const formatTime = (val, model = 'hh:mm:ss') => {
  const date = Math.ceil(val / 1000);
  const day = parseInt(date / 86400);
  let hour = parseInt((date % 86400) / 3600);
  if (model.indexOf('D') < 0) {
    hour = Math.floor(+(date / 3600) % 100);
  }
  const minute = parseInt((date % 3600) / 60);
  const second = parseInt(date % 60);
  model = model.replace(/DD/, fNum(day));
  model = model.replace(/D/, day);
  model = model.replace(/hh/, fNum(hour));
  model = model.replace(/h/, hour);
  model = model.replace(/mm/, fNum(minute));
  model = model.replace(/m/, minute);
  model = model.replace(/ss/, fNum(second));
  model = model.replace(/s/, second);
  return model;
};

/**
 *  @description 获取日期时间
 *  @param {Number} dis 天数时间差，默认 0 为当天
 *  @param {String} model 用于格式化日期的格式，默认'YYYY-MM-DD'表示'2017-05-08'
 *  @return 返回值获取的日期时间字符串表示
 */
export const getDateTime = (dis = 0, model = 'YYYY-MM-DD') => {
  const date = new Date();
  date.setDate(date.getDate() + dis);
  return formatDate(date, model);
};

/**
 *  @description 字符串转 JSON
 *  @param {string} str 需转换的字符串
 *  @return 返回转换后的值，数据类型未定
 */
export const toJson = str => {
  if (typeof str !== 'string') {
    return '';
  }
  if (str.length > 1) {
    if (/^\[.*\]$|^\{.*\}$/.test(str)) {
      return JSON.parse(str);
    }
    return str;
  }
  return str;
};

/**
 *  @description 数据深拷贝
 *  @param {object} argObj 拷贝的对象
 *  @param {object} argOption 方法参数配置
 *  @return 返回深拷贝后的数据对象
 */
export const filterUseless = (argObj = {}, filter = [undefined, null, NaN]) => {
  if (typeof argObj !== 'object') {
    return argObj;
  }
  const clone = item => {
    const consainer = Array.isArray(item) ? [] : {};
    for (const [key, value] of Object.entries(item)) {
      if (!filter.includes(value)) {
        const deep = typeof value === 'object' && value !== null;
        consainer[key] = deep ? clone(value) : value;
      }
    }
    return consainer;
  };
  return clone(argObj);
};

export default {
  flUp,
  fNum,
  formatDate,
  formatTime,
  getDateTime,
  toJson,
  filterUseless
};
