// all routes here.
import Test from '../views/test'
import {
  ProblemList, ContestList, ContestDetails, ContestProblemList, ContestAnnouncement,
  Logout, Register
} from '../views'

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
    name: 'problem-list',
    path: '/problems',
    component: ProblemList
  },
  {
    name: 'problem-details',
    path: '/problem/:problemID',
    component: () => import('@/views/problem/Problem.vue')
  },
  {
    name: 'submission-list',
    path: '/status',
    component: () => import('@/views/submission/SubmissionList.vue')
  },
  {
    name: 'submission-details',
    path: '/status/:id/',
    component: () => import('@/views/submission/SubmissionDetails.vue')
  },
  {
    name: 'contest-list',
    path: '/contests',
    component: ContestList
  },
  {
    name: 'contest-details',
    path: '/contest/:contestID/',
    component: ContestDetails,
    children: [
      {
        name: 'contest-problem-list',
        path: 'problems',
        component: ContestProblemList
      },
      {
        name: 'contest-announcement-list',
        path: 'announcements',
        component: ContestAnnouncement
      }
    ]
  },
  {
    name: 'contest-problem-details',
    path: '/contest/:contestID/problem/:problemID',
    component: () => import('@/views/problem/Problem.vue')
  },
  {
    name: 'register',
    path: '/register',
    component: Register
  },
  {
    name: 'logout',
    path: '/logout',
    component: Logout
  },

  {
    path: '/test',
    name: 'Test',
    component: Test
  }
  // {
  //   path: '*', redirect: '/problems'
  // }
]
