import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import Detail from '@/components/Detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
