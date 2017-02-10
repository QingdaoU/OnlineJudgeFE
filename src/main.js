import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import locale from 'element-ui/lib/locale/lang/en'

import * as filters from './filters.js'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element, { locale })
Vue.use(VueRouter)
// Vue.use(VueI18n)

// 引入 view 组件
import { Announcement, User, Conf, JudgeServer, Problem, Contest, ContestList,
  ContestAnnouncement, ProblemList } from './views'

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
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
      name: 'problems',
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
      path: '/contest/:id/edit',
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
