import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import iView from 'iview'
import VueHighlightJS from 'vue-highlightjs'
import locale from 'iview/src/locale/lang/en-US'

import 'iview/dist/styles/iview.css'
import 'font-awesome/css/font-awesome.min.css'
import 'highlight.js/styles/atom-one-light.css'

import * as filters from './utils/filters.js'

// import IconBtn from 'components/btn/IconBtn.vue'
// import Save from 'components/btn/Save.vue'
// import Cancel from 'components/btn/Cancel.vue'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(iView, {locale})
Vue.use(VueHighlightJS)

// Vue.use(VueI18n)
// Vue.component(IconBtn.name, IconBtn)
// Vue.component(Panel.name, Panel)
// Vue.component(Save.name, Save)
// Vue.component(Cancel.name, Cancel)

// 注册全局消息提示
Vue.prototype.$error = Vue.prototype.$Message.error
Vue.prototype.$info = Vue.prototype.$Message.info
Vue.prototype.$success = (msg) => {
  if (!msg) {
    Vue.prototype.$Message.success('Success')
  } else {
    Vue.prototype.$Message.success(msg)
  }
}
new Vue(Vue.util.extend({router}, App)).$mount('#app')

