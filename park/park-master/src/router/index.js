import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import { routes } from './routes';
import { cookie } from 'vux';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (/^\/$/.test(to.path) && /^\/main/.test(from.path)) return next(false);

    Vue.$vux.loading.show({ text: '加载中' });
    const userEntry = ['/active/activeDetail', '/main4', '/points', '/active/activeSign'];
    const manageEntry = ['/loginManage', '/main3', '/party/branch', '/active/partyBranch', '/points/evaluation', '/main2', 'party/partyDetail', '/active/partyBranch1', '/points/review'];
    if (userEntry.includes(to.path)) {
        sessionStorage.userRoleId = 4;
    } else if (manageEntry.includes(to.path)) {
        sessionStorage.userRoleId = 3;
    } else if (to.path.indexOf("active/activeSign/") > 0 || to.path.indexOf("active/activeDetail") > 0) {
        sessionStorage.userRoleId = 4;
    }

    // if (to.matched.some(record => record.meta.requiresAuth)) {
    if (/^\/login/.test(to.path) || (store.getters.user && store.getters.user.userid)) return next();
    store.dispatch('userinfo').then(
        result => next(),
        error => {
            if (/^\/login/.test(from.path)) {
                Vue.$vux.loading.hide();
                return next(false);
            }
            return next({
                path: '/login',
                query: {
                    openId: to.query.openId || undefined,
                    toPath: to.fullPath
                }
            });
        }
    );
});

router.afterEach(() => Vue.$vux.loading.hide());

export default router;