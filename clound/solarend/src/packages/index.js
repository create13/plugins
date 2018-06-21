import Line from './Line'; // 信息标签
import Charts from './Charts'; // 图表数据
import Label from './Label'; // 小 label

const components = {
  Line,
  Charts,
  Label
};

const install = Vue => {
  const keys = Object.keys(components);
  keys.forEach(key => {
    Vue.component(`sl${key}`, components[key]);
  });
};

export default Object.assign({}, { install });
