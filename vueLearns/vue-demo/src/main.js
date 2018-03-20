import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './router-config.js'
/*使用 VueRouter*/
Vue.use(VueRouter);
//创建路由实例
const router = new VueRouter(routerConfig);
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
