// all routes here.
import Test from '../views/test'
import {
  ProblemList, ContestList, ContestDetails, ContestProblemList, ContestAnnouncement, ContestRank,
  Logout, ACMRank, Settings, ProfileSetting
} from '../views'

export default [
  // beforeEnter(to, from, next) {
  //   if (auth.isAuthicated()) {
  //     next('/test')
  //   } else {
  //     next()
  //   }
  // }
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
      },
      {
        name: 'contest-rank',
        path: 'rank',
        component: ContestRank
      }
    ]
  },
  {
    name: 'contest-problem-details',
    path: '/contest/:contestID/problem/:problemID',
    component: () => import('@/views/problem/Problem.vue')
  },
  {
    name: 'acm-rank',
    path: '/acm-rank',
    component: ACMRank
  },
  // {
  //   name: 'profile',
  //   path: '/profile',
  //   component: Profile
  // },
  {
    path: '/setting',
    component: Settings,
    children: [
      {
        name: 'default-setting',
        path: '',
        component: ProfileSetting
      },
      {
        name: 'profile-setting',
        path: 'profile',
        component: ProfileSetting
      }
    ]
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
