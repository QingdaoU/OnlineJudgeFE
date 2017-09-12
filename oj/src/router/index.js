import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import auth from '../utils/auth'

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
  routes
})

// 全局身份确认
router.beforeEach((to, from, next) => {
  Vue.prototype.$Loading.start()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isAuthicated()) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  Vue.prototype.$Loading.finish()
})

export default router

