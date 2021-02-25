import Vue from 'vue'

import elementUI from 'element-ui'

import i18n from './i18n'
import App from './App.vue'
import store from './store'
import router from './router'
import confirm from './utils/$confirm'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(confirm)
Vue.use(elementUI)

Vue.config.productionTip = false

new Vue({
    i18n,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
