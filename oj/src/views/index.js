import ProblemList from './problem/ProblemList.vue'
import ContestList from './contest/ContestList.vue'
import ContestDetails from './contest/ContestDetail.vue'
import ContestProblemList from './contest/children/ContestProblemList.vue'
import ContestAnnouncement from './contest/children/ContestAnnouncement.vue'
import Logout from './user/Logout.vue'
import Register from './user/Register.vue'
export {ProblemList, ContestList, ContestDetails, ContestProblemList, ContestAnnouncement, Register, Logout}

/* 组件导出分为两类, 一类常用的直接导出，另一类诸如Login, Logout等用懒加载,懒加载不在此处导出
 *   在对应的route内加载
 *   见https://router.vuejs.org/en/advanced/lazy-loading.html
 */
