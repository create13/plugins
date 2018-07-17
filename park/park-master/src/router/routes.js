import store from '../store';

export const routes = [
    {
        path: '/login',
        component: () => import('@/views/loginNew')
    },
    {
        path: '/loginManage',
        component: () => import('@/views/loginManage')
    },
    {
        path: '/loginChangPwd',
        name: 'changPwd',
        component: () => import('@/views/changPwd')
    },
    {
        path: '/loginContect',
        name: 'contect',
        component: () => import('@/views/contect')
    },
    {
        path: '/',
        // meta: { requiresAuth: true },
        component: () => import('@/views/layout'),
        children: [
            {
                path: '',
                beforeEnter: (to, from, next) =>
                    next({ path: /^\/$/.test(to.path) ? '/main' + store.getters.user.roleid : to.path })
            },
            {
                path: 'main1',
                component: () => import('@/views/main1')
            },
            {
                path: 'main2',
                component: () => import('@/views/main2')
            },
            {
                path: 'main3',
                component: () => import('@/views/main3')
            },
            {
                path: 'main4',
                component: () => import('@/views/main4')
            },
            {
                path: 'party',
                component: () => import('@/views/party')
            },
            {
                path: 'party/dues',
                name: 'Dues',
                component: () => import('@/views/party/dues')
            },
            /*{
                 path: 'party/dues1',
                name: 'Dues',
                component: () => import('@/views/party/dues1')
             },*/
            {
                path: 'party/branch',
                component: () => import('@/views/party/branch')
            },
            {
                path: 'party/information/:departmentid',
                name: 'information',
                component: () => import('@/views/party/information')
            },
            {
                path: 'party/partyDetail',
                name: 'pointDetail',
                component: () => import('@/views/party/partyDetail')
            },
            {
                path: 'party/partyPointDetail/:userid',
                name: 'partyPointDetail',
                props: true,
                component: () => import('@/views/party/partyPointDetail')
            },
            {
                path: 'points/',
                name:'pointsName',
                component: () => import('@/views/points')
            },
            {
                path: 'points/assess',
                component: () => import('@/views/points/assess')
            },
            {
                path: 'points/member/',
                name: 'member',
                component: () => import('@/views/points/member')
            },
            {
                path: 'points/review',
                component: () => import('@/views/points/review')
            },
            {
	            // path:'points/detial',
	            path:'points/detail',
	            name:'pointsNews',
	            component: () => import('@/views/points/detail')
            },
            {
                path: 'points/evaluation',
                component: () => import('@/views/points/evaluation')
            },
            {
                path: 'party/obtain/:userid/:year',
                name: 'Obtain',
                component: () => import('@/views/party/obtain')
            },
            {
                path: 'points/audit1/:partmentId/:name/:departmentId/:userId',
                name: 'Audit1',
                props: true,
                component: () => import('@/views/points/auditDetail1')
            },
            {
                path: 'points/audit/:partmentId/:name/:departmentId/:userId',
                name: 'Audit',
                props: true,
                component: () => import('@/views/points/auditDetail')
            },
            {
                path: 'points/addPoint/:projectId/:moduleId',
                name: 'addPoint',
                component: () => import('@/views/points/addPoint')
            },
            {
                path: 'points/addPoint1/:projectId/:moduleId',
                name: 'addPoint1',
                component: () => import('@/views/points/addPoint1')
            },
            {
                path: 'points/addPoint1/:projectId/:moduleId/:studyId',
                component: () => import('@/views/points/addPoint1')
            },
            {
                path: 'points/pointEvaluate/:partmentId/:name/:departmentId/:userId',
                name: 'pointEvaluate',
                component: () => import('@/views/points/pointEvaluate')
            },
            {
                path: 'points/political/:moduleid',
                component: () => import('@/views/points/political')
            },
            {
                path: 'points/political1',
                component: () => import('@/views/points/political1')
            },
            {
                path: 'points/politicalSimple/:moduleid',
                component: () => import('@/views/points/politicalSimple')
            },
            {
                path: 'points/lawAbiding',
                component: () => import('@/views/points/lawAbiding')
            },
            {
                path: 'points/lawAbidingDetail/:userId',
                name: 'lawAbidingDetail',
                props: true,
                component: () => import('@/views/points/lawAbidingDetail')
            },
            {
                path: 'points/lawAbidingDetailFinish/:userId',
                name: 'lawAbidingDetailFinish',
                props: true,
                component: () => import('@/views/points/lawAbidingDetailFinish')
            },
            {
                path: 'active',
                component: () => import('@/views/active')
            },
            {
                path: 'active/partyIndex',
                name: 'Active',
                component: () => import('@/views/active/partyIndex')
            },
            {
                path: 'active/partyBranch',
                component: () => import('@/views/active/partyBranchIndex')
            },
            {
                path: 'active/partyBranch1',
                component: () => import('@/views/active/partyBranchIndex1')
            },
            {
                path: 'active/partyActivity',
                component: () => import('@/views/active/partyActivity')
            },

            {
                path: 'active/activeSign/:activeId',
                name: 'activeSign',
                component: () => import('@/views/active/activeSign')
            },
            {
                path: 'active/activeMore',
                name: 'activeMore',
                component: () => import('@/views/active/activeMore')
            },

            {
                path: 'active/partyMoment',
                name: 'partyMoment',
                component: () => import('@/views/active/partyMoment')
            },
            {
                path: 'points/detailPack/:studyid/:createUserid/:moduleid',
                name: 'detailPack',
                component: () => import('@/views/points/detailPack')
            },
            {
                path: 'points/detailPack1/:username',
                name: 'detailPack1',
                component: () => import('@/views/points/detailPack1')
            },
            {
                path: 'points/detailPack2/:userId/:departmentid/:moduleid',
                name: 'detailPack2',
                component: () => import('@/views/points/detailPack2')
            },
            {
                path: 'points/detailPack3/:userId/:departmentid/:moduleid',
                name: 'detailPack3',
                component: () => import('@/views/points/detailPack3')
            },
            {
                path: 'active/post/:activeId',
                name: 'activePost',
                component: () => import('@/views/active/post')
            },
            {
                path: 'active/new',
                name: 'activeNews',
                component: () => import('@/views/active/new')
            },
            {
                path: 'active/new2',
                name: 'activeNews2',
                component: () => import('@/views/active/new2')
            },
            {
                path: 'active/activeDetail',
                component: () => import('@/views/active/activeDetail')
            },
            {
                path: 'life',
                component: () => import('@/views/life')
            }
        ]
    }
];
