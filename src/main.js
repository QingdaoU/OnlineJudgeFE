import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

Vue.use(Element)
Vue.use(VueRouter)

// 引入 view 组件
import { AnnounceMent } from './views'
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/announcement',
      name: 'announcement',
      component: AnnounceMent
    },
    { path: '*', redirect: '/announcement' }
  ]
})
new Vue(Vue.util.extend({ router }, App)).$mount('#app')
