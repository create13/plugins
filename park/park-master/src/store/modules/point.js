import Vue from 'vue';

const point = {
    state: {
    	info: {}
    },
    getters: {
        info: state => state.info
    },
    actions: {
        setInfo ({ commit }, info) {
        	commit('setInfo', info);
        }
    },
    mutations: {
        setInfo (state, info) {
        	state.info = info;
        }
    }
};

export default point;
