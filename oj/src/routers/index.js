import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import routes from './routes'
import auth from '../utils/authHelper'

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
  iView.LoadingBar.start()
  iView.LoadingBar.update(30)

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
  iView.LoadingBar.finish()
})

export default router

