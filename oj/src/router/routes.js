// all routes here.
import {
  Home, Logout,
  ProblemList, Problem,
  SubmissionList, SubmissionDetails,
  ACMRank, OIRank,
  ApplyResetPassword, ResetPassword
} from '../views'

import * as Contest from '@/views/contest'
import * as Setting from '@/views/setting'

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
    component: Problem
  },
  {
    name: 'submission-list',
    path: '/status',
    component: SubmissionList
  },
  {
    name: 'submission-details',
    path: '/status/:id/',
    component: SubmissionDetails
  },
  {
    name: 'contest-list',
    path: '/contests',
    component: Contest.ContestList
  },
  {
    name: 'contest-details',
    path: '/contest/:contestID/',
    component: Contest.ContestDetails,
    children: [
      {
        name: 'contest-submission-list',
        path: 'submissions',
        component: SubmissionList
      },
      {
        name: 'contest-problem-list',
        path: 'problems',
        component: Contest.ContestProblemList
      },
      {
        name: 'contest-problem-details',
        path: 'problem/:problemID/',
        component: Problem
      },
      {
        name: 'contest-announcement-list',
        path: 'announcements',
        component: Contest.ContestAnnouncement
      },
      {
        name: 'contest-rank',
        path: 'rank',
        component: Contest.ContestRank
      }
    ]
  },
  {
    name: 'acm-rank',
    path: '/acm-rank',
    component: ACMRank
  },
  {
    name: 'oi-rank',
    path: '/oi-rank',
    component: OIRank
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/setting',
    component: Setting.Settings,
    meta: {requiresAuth: true},
    children: [
      {
        name: 'default-setting',
        path: '',
        component: Setting.ProfileSetting
      },
      {
        name: 'profile-setting',
        path: 'profile',
        component: Setting.ProfileSetting
      },
      {
        name: 'account-setting',
        path: 'account',
        component: Setting.AccountSetting
      },
      {
        name: 'security-setting',
        path: 'security',
        component: Setting.SecuritySetting
      }
    ]
  }
  // {
  //   path: '*', redirect: '/problems'
  // }
]
