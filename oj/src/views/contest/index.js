const ContestList = () => import(/* webpackChunkName: "contest" */ './ContestList.vue')
const ContestDetails = () => import(/* webpackChunkName: "contest" */ './ContestDetail.vue')
const ContestProblemList = () => import(/* webpackChunkName: "contest" */ './children/ContestProblemList.vue')
const ContestAnnouncement = () => import(/* webpackChunkName: "contest" */ './children/ContestAnnouncement.vue')
const ContestRank = () => import(/* webpackChunkName: "contest" */ './children/ContestRank.vue')

export {ContestAnnouncement, ContestDetails, ContestList, ContestProblemList, ContestRank}
