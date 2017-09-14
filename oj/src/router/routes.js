// all routes here.
import Test from '../views/test'
import {
  Logout, ApplyResetPassword, ResetPassword,
  ProfileSetting, SecuritySetting, AccountSetting, Settings,
  ContestAnnouncement, ContestDetails, ContestList, ContestProblemList, ContestRank,
  ProblemList, ACMRank
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
    name: 'apply-reset-password',
    path: '/apply-reset-password',
    component: ApplyResetPassword
  },
  {
    name: 'reset-password',
    path: '/reset-password/:token',
    component: ResetPassword
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
      },
      {
        name: 'account-setting',
        path: 'account',
        component: AccountSetting
      },
      {
        name: 'security-setting',
        path: 'security',
        component: SecuritySetting
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
