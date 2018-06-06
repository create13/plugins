import init from './init.js';
import mesh from './mesh.js';
import animation from './animation.js';
import load from './load.js';

const install = Vue => {
  Vue.prototype.$three = Object.assign(
    {},
    init,
    mesh,
    animation,
    load
  );
};

export default Object.assign({}, { install });
