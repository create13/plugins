import Vue from 'vue';
import App from './App.vue';
import login from './components/user';
Vue.use(login);
new Vue({
  el: '#app',
  render: h => h(App)
})
