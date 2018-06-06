/**
 * @description 检测并执行行数
 * @param {function} func 执行的函数
 * @param {rest} args 函数的参数
 */
export const execFunction = (func, ...args) => {
  if (typeof func === 'function') {
    func(...args);
  }
};
