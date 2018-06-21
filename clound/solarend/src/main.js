// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import '@/assets/style/index.scss'; // 样式、CSS 动画
import threejs from '@/refactor/'; // three.js 相关
import packages from '@/packages/'; // three.js 相关

Vue.config.productionTip = false;

Vue.use(threejs);
Vue.use(packages);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
