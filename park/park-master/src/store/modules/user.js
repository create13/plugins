import Vue from 'vue';
import router from '@/router';
import { cookie } from 'vux';

const KEYS = ['roleId', 'userId', 'ptoken'];

const user = {
    state: {
        user: {},
        manage: {}
    },
    getters: {
        user: state => {
            console.log("user: manage", state.user, state.manage);
            if (Object.keys(state.user).length || Object.keys(state.manage).length) {
                return sessionStorage.userRoleId === '4' ? state.user : state.manage;
            }
            return {};
        }
    },
    actions: {
        userinfo: ({ commit }, data) => {
            const userId = cookie.get(sessionStorage.userRoleId === '4' ? 'userId' : 'manageId');
            if (userId) {
                return Vue.http.get('puser/queryById', {
                        params: Object.assign(data || {}, { userId })
                    })
                    .then(result => {
                        sessionStorage.userRoleId = result.entry.roleid;
                        commit(result.entry.roleid === 4 ? 'setUser' : 'setManage', result.entry);
                        return result;
                    });
            } else {
                return Promise.reject();
            }
        },
        login: ({ commit }, data) => Vue.http.post('puser/tologin', data),
        loginManage: ({ commit }, data) => Vue.http.post('puser/tologin', data),
        logout: ({ commit }) =>
            new Promise((resolve, reject) => {
                commit('clearUser', 4);
                resolve();
            }),
        logoutManage: ({ commit }) =>
            new Promise((resolve, reject) => {
                commit('clearUser', 3);
                resolve();
            }),
    },
    mutations: {
        setUser(state, data) {
            console.log('user');
            state.user = data || {};
            // KEYS.forEach(key =>
            //     cookie.set(key, data[key], {
            //         // domain: 'example.com',
            //         path: '/',
            //         expires: new Date(new Date().setMonth(new Date().getMonth() + 1))
            //     })
            // );
        },
        setManage(state, data) {
            console.log('manage');
            state.manage = data || {};
        },
        clearUser(state, roleId) {
            KEYS.forEach(key =>
                cookie.remove(key, {
                    // domain: 'example.com',
                    path: '/'
                })
            );
            if (roleId == 4) {
                state.user = {};
                router.push('/login');
            } else {
                state.manage = {};
                router.push('/loginManage');
            }

        }
    }
};

export default user;