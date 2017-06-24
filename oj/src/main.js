import Vue from 'vue'
import App from './components/App.vue'
import iView from 'iview'
import router from './routers/index'
import 'iview/dist/styles/iview.css'
import 'font-awesome/css/font-awesome.min.css'

import * as filters from './utils/filters.js'

// import Panel from 'components/Panel.vue'
// import IconBtn from 'components/btn/IconBtn.vue'
// import Save from 'components/btn/Save.vue'
// import Cancel from 'components/btn/Cancel.vue'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(iView)
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
Vue.prototype.$Message.success('启动成功')
new Vue(Vue.util.extend({router}, App)).$mount('#app')

