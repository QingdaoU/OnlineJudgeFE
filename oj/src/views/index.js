import ProblemList from './problem/ProblemList.vue'
import Logout from './user/Logout.vue'
import Home from './user/Home.vue'
import About from './about/About.vue'
import FAQ from './about/FAQ.vue'

// Grouping Components in the Same Chunk
const SubmissionList = () => import(/* webpackChunkName: "submission" */ '@/views/submission/SubmissionList.vue')
const SubmissionDetails = () => import(/* webpackChunkName: "submission" */ '@/views/submission/SubmissionDetails.vue')

const ACMRank = () => import(/* webpackChunkName: "userRank" */ '@/views/rank/ACMRank.vue')
const OIRank = () => import(/* webpackChunkName: "userRank" */ '@/views/rank/OIRank.vue')

const ApplyResetPassword = () => import(/* webpackChunkName: "password" */ '@/views/user/ApplyResetPassword.vue')
const ResetPassword = () => import(/* webpackChunkName: "password" */ '@/views/user/ResetPassword.vue')

const Problem = () => import(/* webpackChunkName: "Problem" */ '@/views/problem/Problem.vue')

export {
  Logout, Home, About, FAQ,
  ProblemList, Problem,
  ACMRank, OIRank,
  SubmissionList, SubmissionDetails,
  ApplyResetPassword, ResetPassword
}
/* 组件导出分为两类, 一类常用的直接导出，另一类诸如Login, Logout等用懒加载,懒加载不在此处导出
 *   在对应的route内加载
 *   见https://router.vuejs.org/en/advanced/lazy-loading.html
 */
