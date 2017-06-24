import Vue from 'vue'
import VueRouter from 'vue-router'

import Test from '../views/test'
import Login from './routes/login'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    Login,
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '*', redirect: '/login'
    }
  ]
})

export default router

