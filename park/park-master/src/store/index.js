import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        info: {},
        userRoleId: 4
    },
    actions: {
        setInfo({ commit }, info) {
            commit('setInfo', info);
        },
        setUserRoleId({ commit }, id) {
            commit('setUserRoleId', id);
        }
    },
    getters: {
        info: state => state.info,
        userRoleId: state => state.userRoleId
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        setUserRoleId(state, id) {
            state.userRoleId = id;
        }
    },
    modules: {
        user
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;