import ProblemList from './problem/ProblemList.vue'
import Contest from './contest/ContestList.vue'
import Logout from './user/Logout.vue'
//
export {ProblemList, Logout, Contest}

/* 组件导出分为两类, 一类常用的直接导出，另一类诸如Login, Logout等用懒加载,懒加载不在此处导出
 *   在对应的route内加载
 *   见https://router.vuejs.org/en/advanced/lazy-loading.html
 */
