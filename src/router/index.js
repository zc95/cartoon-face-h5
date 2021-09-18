import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () =>
            import(/* webpackChunkName: "index" */ '../views/index'),
    },
    {
        path: '/share',
        name: 'Share',
        component: () =>
            import(/* webpackChunkName: "share" */ '../views/share'),
    },
];

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
