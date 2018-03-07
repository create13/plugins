import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import Detail from '@/components/Detail'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/detail/:id/:detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
