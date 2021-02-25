import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'home',
        path: '/home',
        component: () =>
            import(/* webpackChunkName: "home" */ '../views/home/index.vue')
    },
    {
        name: 'login',
        path: '/login',
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/login/index.vue')
    }
]

const router = new VueRouter({
    routes
})

// authguard
router.beforeEach((to, from, next) => {
    if (!store.state.token.subToken) {
        // autoLogin
        next()
    } else {
        next()
    }
})

export default router
