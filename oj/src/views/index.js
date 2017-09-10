import ProblemList from './problem/ProblemList.vue'
import ACMRank from './rank/ACMRank.vue'
import Logout from './user/Logout.vue'
import ApplyResetPassword from './user/ApplyResetPassword.vue'
import ResetPassword from './user/ResetPassword.vue'

export {
  Logout, ResetPassword, ApplyResetPassword,
  ProblemList, ACMRank
}
export {ContestRank, ContestProblemList, ContestList, ContestDetails, ContestAnnouncement} from './contest'
export {Settings, ProfileSetting, SecuritySetting} from './setting'
/* 组件导出分为两类, 一类常用的直接导出，另一类诸如Login, Logout等用懒加载,懒加载不在此处导出
 *   在对应的route内加载
 *   见https://router.vuejs.org/en/advanced/lazy-loading.html
 */
