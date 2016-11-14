import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
// import VueI18n from 'vue-i18n'

Vue.use(Element)
Vue.use(VueRouter)
// Vue.use(VueI18n)

// 引入 view 组件
import { Announcement, User } from './views'
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    { path: '*', redirect: '/announcement' }
  ]
})
new Vue(Vue.util.extend({ router }, App)).$mount('#app')
