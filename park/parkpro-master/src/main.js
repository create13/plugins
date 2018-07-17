// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import './assets/dlbicon/iconfont.css'
import components from './component.js'
/*引入componnents到vue*/
for(let i in components){
	Vue.component(i,components[i])
}

//引入vux
import { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

//引入UI
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);


Vue.use(VueRouter)

FastClick.attach(document.body)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
