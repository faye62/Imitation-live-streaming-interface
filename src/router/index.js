import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Index',
        meta: {passLogin: true},
        redirect: {name: 'index'}, // 只使用重定向，不需要 component
    },
    {
        path: '/index',
        name: 'index',
        meta: {tabbar: 'home'},
        component: () => import('@/views/index.vue'),
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// // 全局前置守卫
// router.beforeEach((to, from, next) => {
//     const authStatus = MyStorage.isLogin(); // 获取认证状态
//     const requiresAuth = to.matched.some(record => !record.meta.passLogin); // 检查目标路由是否需要认证
//
//     if (requiresAuth && !authStatus) {
//         // 如果目标路由需要认证且用户未登录，重定向到登录页面
//         next({name: 'Login'});
//     } else {
//         // 否则继续导航
//         next();
//     }
// })

export default router;
//# sourceMappingURL=index.js.map
