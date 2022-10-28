import Vue from '@@/vue'
import VueI18n from 'vue-i18n'
import {getCookie} from '@@/utils/commons'
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: getCookie('lang')||'zh',
    messages:{
        'zh':require('./langs/zh'),
        'en':require('./langs/en')
    }
})

export default i18n