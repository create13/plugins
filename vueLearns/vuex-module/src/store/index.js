import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex);
import  getters from './getters.js'
import  actions from './actions.js'
import  user from './modules/user.js'

export default new vuex.Store({
	getters,
	actions,
	modules:{
		user
	}
	
})
