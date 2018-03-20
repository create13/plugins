import Vue from 'vue';
import App from './App.vue';
import store from './store.js';  //导入store对象
new Vue({
  el: '#app',
  render: h => h(App),
  	store,  //配置store选项，指定为store对象  vue会自动的将store对象注入到所有子组件中，在子组件中通过this.$store访问该store对象
})
