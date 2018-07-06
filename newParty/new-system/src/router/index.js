import Vue from 'vue';
import Router from 'vue-router';
const Login = () => import('@/views/login');
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 404
    {
      path: '*',
      component: Login
    }
  ]
});
