import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.emulateJSON = true

// 引入 view 组件
import { AnnounceMent } from './views'
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/announcement',
      name: 'announcement',
      component: AnnounceMent
    }
  ]
})
new Vue(Vue.util.extend({ router }, App)).$mount('#app')
