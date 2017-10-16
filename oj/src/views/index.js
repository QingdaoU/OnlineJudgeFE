import ProblemList from './problem/ProblemList.vue'
import ACMRank from './rank/ACMRank.vue'
import OIRank from './rank/OIRank.vue'
import Logout from './user/Logout.vue'
import ApplyResetPassword from './user/ApplyResetPassword.vue'
import ResetPassword from './user/ResetPassword.vue'
import Home from './user/Home.vue'

export {
  Logout, ResetPassword, ApplyResetPassword, Home,
  ProblemList, ACMRank, OIRank
}
export * from './contest'
export * from './setting'
/* 组件导出分为两类, 一类常用的直接导出，另一类诸如Login, Logout等用懒加载,懒加载不在此处导出
 *   在对应的route内加载
 *   见https://router.vuejs.org/en/advanced/lazy-loading.html
 */
