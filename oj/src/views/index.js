import ProblemList from './problem/ProblemList.vue'
import ACMRank from './rank/ACMRank.vue'
import Logout from './user/Logout.vue'

export {
  ProblemList, ACMRank, Logout
}
export {ContestRank, ContestProblemList, ContestList, ContestDetails, ContestAnnouncement} from './contest'
export {Settings, ProfileSetting} from './setting'
/* 组件导出分为两类, 一类常用的直接导出，另一类诸如Login, Logout等用懒加载,懒加载不在此处导出
 *   在对应的route内加载
 *   见https://router.vuejs.org/en/advanced/lazy-loading.html
 */
