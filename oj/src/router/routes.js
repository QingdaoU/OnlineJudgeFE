// all routes here.
import Test from '../views/test'
import {
  AccountSetting,
  ACMRank,
  ApplyResetPassword,
  ContestAnnouncement,
  ContestDetails,
  ContestList,
  ContestProblemList,
  ContestRank,
  Home,
  Logout,
  ProblemList,
  ProfileSetting,
  ResetPassword,
  SecuritySetting,
  Settings
} from '../views'

export default [
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
        name: 'contest-submission-list',
        path: 'submissions',
        component: () => import('@/views/submission/SubmissionList.vue')
      },
      {
        name: 'contest-problem-list',
        path: 'problems',
        component: ContestProblemList
      },
      {
        name: 'contest-problem-details',
        path: 'problem/:problemID/',
        component: () => import('@/views/problem/Problem.vue')
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
    name: 'acm-rank',
    path: '/acm-rank',
    component: ACMRank
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/setting',
    component: Settings,
    meta: {requiresAuth: true},
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
    name: 'test',
    path: '/test',
    component: Test
  }
  // {
  //   path: '*', redirect: '/problems'
  // }
]
