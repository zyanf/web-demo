import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en'
import zh_cn from './zh_cn'
import store from '@/store'

Vue.use(VueI18n)

const lang = store.state.lang
const i18n = new VueI18n({
    locale: lang,
    messages: {
        en,
        zh_cn
    }
})

export default i18n
