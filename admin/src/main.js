import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import filters from './utils/filters.js'
import router from './router'

import Panel from './components/Panel.vue'
import IconBtn from './components/btn/IconBtn.vue'
import Save from './components/btn/Save.vue'
import Cancel from './components/btn/Cancel.vue'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element, {locale})
// Vue.use(VueI18n)
Vue.component(IconBtn.name, IconBtn)
Vue.component(Panel.name, Panel)
Vue.component(Save.name, Save)
Vue.component(Cancel.name, Cancel)

Vue.prototype.$error = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'error'})
}

Vue.prototype.$alert = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'info'})
}

Vue.prototype.$success = (msg) => {
  if (!msg) {
    Vue.prototype.$message({'message': 'Succeeded', 'type': 'success'})
  } else {
    Vue.prototype.$message({'message': msg, 'type': 'success'})
  }
}

new Vue(Vue.util.extend({router}, App)).$mount('#app')
