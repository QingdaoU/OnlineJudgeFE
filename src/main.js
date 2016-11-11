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
import { AnnounceMent, UserList } from './views'
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/announce_ment',
      name: 'announce_ment',
      component: AnnounceMent
    },
    {
      path: '/user_list',
      name: 'user_list',
      component: UserList
    },
    { path: '*', redirect: '/announce_ment' }
  ]
})
new Vue(Vue.util.extend({ router }, App)).$mount('#app')
