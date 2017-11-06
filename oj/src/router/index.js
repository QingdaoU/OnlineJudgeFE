import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import storage from '@/utils/storage'
import {STORAGE_KEY} from '@/utils/constants'
import {sync} from 'vuex-router-sync'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes
})

// 全局身份确认
router.beforeEach((to, from, next) => {
  Vue.prototype.$Loading.start()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!storage.get(STORAGE_KEY.AUTHED)) {
      Vue.prototype.$error('please login first')
      next({
        name: 'home'
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

sync(store, router)

export default router
