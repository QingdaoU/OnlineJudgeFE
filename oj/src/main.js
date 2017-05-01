import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import locale from 'element-ui/lib/locale/lang/en'

import * as filters from './filters.js'

import Panel from 'components/Panel.vue'
import IconBtn from 'components/btn/IconBtn.vue'
import Save from 'components/btn/Save.vue'
import Cancel from 'components/btn/Cancel.vue'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element, { locale })
Vue.use(VueRouter)
// Vue.use(VueI18n)
Vue.component(IconBtn.name, IconBtn)
Vue.component(Panel.name, Panel)
Vue.component(Save.name, Save)
Vue.component(Cancel.name, Cancel)

// 引入 view 组件
import { Announcement, User, Conf, JudgeServer, Problem, Contest, ContestList,
  ContestAnnouncement, ProblemList, Login, Register, Logout, Profile,
  ProfileSetting, AvatarSetting } from './views'

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/user/:userId',
      name: 'user-profile',
      component: Profile
    },
    {
      path: '/setting',
      name: 'profile-setting',
      component: ProfileSetting
    },
    {
      path: '/setting/avatar',
      name: 'avatar-setting',
      component: AvatarSetting
    },
    // 隔开
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/conf',
      name: 'conf',
      component: Conf
    },
    {
      path: '/judge-server',
      name: 'judge-server',
      component: JudgeServer
    },
    {
      path: '/problems',
      name: 'problem-list',
      component: ProblemList
    },
    {
      path: '/problem/create',
      name: 'create-problem',
      component: Problem
    },
    {
      path: '/problem/edit/:problemId',
      name: 'edit-problem',
      component: Problem
    },
    {
      path: '/contest/create',
      name: 'create-contest',
      component: Contest
    },
    {
      path: '/contest',
      name: 'contest-list',
      component: ContestList
    },
    {
      path: '/contest/:contestId/edit',
      name: 'edit-contest',
      component: Contest
    },
    {
      path: '/contest/:contestId/announcement',
      name: 'contest-announcement',
      component: ContestAnnouncement
    },
    {
      path: '/contest/:contestId/problems',
      name: 'contest-problem-list',
      component: ProblemList
    },
    {
      path: '/contest/:contestId/problem/create',
      name: 'create-contest-problem',
      component: Problem
    },
    {
      path: '/contest/:contestId/problem/:problemId/edit',
      name: 'edit-contest-problem',
      component: Problem
    },
    {
      path: '*', redirect: '/announcement'
    }
  ]
})

Vue.prototype.$error = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'error'})
}

Vue.prototype.$alert = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'info'})
}

Vue.prototype.$success = (msg) => {
  if (!msg) {
    Vue.prototype.$message({'message': 'Succeeded', 'type': 'success'})
  } else {
    Vue.prototype.$message({'message': msg, 'type': 'success'})
  }
}

new Vue(Vue.util.extend({ router }, App)).$mount('#app')
