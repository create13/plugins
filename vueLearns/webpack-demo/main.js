/*
 * 使用es6语法引入模块
 */
import Vue from 'vue/dist/vue.js'
import App from './App.vue'

new Vue({
	el:'#app',
	render:function(h){   //使用render函数渲染组件
		return h(App);
	}
});
