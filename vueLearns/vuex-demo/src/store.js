/*
 * 进行vuex的配置
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//定义属性（数据）
var state ={
	count:6
}

//定义getters
var getters ={
	count(state){
		return state.count;
	},
	isEvenOrOdd(state){
		return state.count%2==0?'我是偶数':'我是基数';
	}
}



//定义actions,要执行的动作，如流程判断，异步请求等
const actions= {
/*	increment(context){ //包含：commit、dispatch、state
		console.log(context);
	},*/
	increment({commit,state}){ //包含：commit、dispatch、state
		commit('increment'); //提交一个名为increment的变化，名称可自定义，可以认为是类型名
	},
	plugs({commit,state}){
		if(state.count>10){
			commit('plugs');
		}
	},
	incrementAsync({commit,state}){
		//异步操作
		var p = new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve();
			},3000);
		});
		p.then(() =>{
			commit('increment');
		}).catch(() =>{
			console.log('异步操作');
		});
	},
}
//定义mutations 处理状态（数据）的改变
const mutations ={
	increment(state){
		state.count++;
	},
	plugs(state){
		state.count--;
	}
}

//导出store对象
const store = new Vuex.Store({
	state:state,//相当于state:state
	getters,
	actions,
	mutations
});

export default store;
