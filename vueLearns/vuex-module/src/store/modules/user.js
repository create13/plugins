/*
 * 用户操作
 */
import types from '../types.js'

const state ={
	count:1
}

const getters = {
	count(state){
		return state.count;
	}
}
const actions = {
	increment({commit,state}){
		commit(types.INCREMENT);
	},
	plugs({commit,state}){
		commit(types.PLUGS);
	}
}

const mutations = {
	[types.INCREMENT](state){
		state.count++;
	},
	[types.PLUGS](state){
		state.count--;
	}
}
export default {
	state,
	getters,
	actions,
	mutations
	
	
}
