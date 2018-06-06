/**
 * @description 节流防抖
 */

/**
 * @description 节流函数
 * @param {function} func 执行函数
 * @param {number} wait 间隔时间
 * @return {function} 节流控制函数
 */
let throttle = (func, wait) => {
  let timer = null;
  let previous = 0;

  let later = (now, ...args) => {
    func(...args);
    timer = null;
    previous = now;
  };

  return (...args) => {
    let now = Date.now();
    if (now - previous > wait) {
      later(now, ...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        later(now, ...args);
      }, wait - now + previous);
    }
  };
};

/**
 * @description 防抖函数
 * @param {function} func 执行函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 立即执行
 * @return {function} 防抖控制函数
 */
let debounce = (func, wait, immediate) => {
  let timer = null;

  return (...args) => {
    if (immediate && !timer) {
      func(...args);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, wait);
  };
};

export default {
  throttle,
  debounce
};
