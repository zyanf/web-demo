import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import { cachePrefix } from '@/config'
import { state, actions, mutations } from './app'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {},
    state: state,
    actions: actions,
    mutations: mutations,
    plugins: [
        createPersistedState({
            key: cachePrefix + 'vuex',
            paths:
                process.env.NODE_ENV === 'production'
                    ? []
                    : ['token', 'lang', 'user', 'company']
        })
    ]
})
