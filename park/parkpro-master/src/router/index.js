import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Information from '@/components/comother/info'
import Dues from '@/components/comother/dues'
import Detail from '@/components/comother/detail'
import Post from '@/components/comother/post'
import Life from '@/components/comother/life'
import Test from '@/components/comother/test'
import Obtain from '@/components/comother/obtain'
import Header from '../components/layout/header.vue'
import footer from '../components/layout/footer.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/header',
      name: 'header',
      component:Header

    },
    {
      path: '/footer',
      name: 'footer',
      component:footer

    },
    {
      path: '/information',
      name: 'Information',
      component:Information

    },
    {
      path: '/dues',
      name: 'Dues',
      component: Dues
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/obtain',
      name: 'Obtain',
      component: Obtain
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/life',
      name: 'Life',
      component: Life
    }
  ]
})

