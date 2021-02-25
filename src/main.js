import Vue from 'vue'
import zcUI from 'zc-ui'
import elementUI from 'element-ui'

import i18n from './i18n'
import App from './App.vue'
import store from './store'
import router from './router'
import confirm from './utils/$confirm'
import 'element-ui/lib/theme-chalk/index.css'

const zcOptions = {
    router,
    ZcCrosIframe: {
        route: {
            name: 'crosIframe',
            path: '/crosIframe.html',
            meta: { auth: false }
        },
        actionName: 'setToken'
    }
}

Vue.use(confirm)
Vue.use(elementUI)
Vue.use(zcUI, zcOptions)

Vue.config.productionTip = false

new Vue({
    i18n,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
