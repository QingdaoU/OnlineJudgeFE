// all routes here.
import Test from '../views/test'
import {ProblemList, Logout} from '../views'

export default [
  {
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
  },
  {
    name: 'logout',
    path: '/logout',
    component: Logout
  },
  {
    name: 'problem-list',
    path: '/problems',
    component: ProblemList
  },
  {
    name: 'problem-details',
    path: '/problem/:id',
    component: Test
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '*', redirect: '/problems'
  }
]
