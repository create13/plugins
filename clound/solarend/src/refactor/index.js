/**
 * @description 这个出口是提供 Vue 使用的，其他文件已经全部和业务解耦，请不要添加耦合代码
 */
import ThreeInit from './constructor';
import Load from './load';

const install = Vue => {
  Vue.prototype.$three = {
    ThreeInit,
    load: Load
  };
};

export default { install };
