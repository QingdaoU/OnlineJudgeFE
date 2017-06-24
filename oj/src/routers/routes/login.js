// import auth from '@/utils/authHelper'

export default {
  name: 'login',
  path: '/login',
  component: () => import('@/views/user/Login.vue')
  // beforeEnter(to, from, next) {
  //   if (auth.isAuthicated()) {
  //     next('/test')
  //   } else {
  //     next()
  //   }
  // }
}
