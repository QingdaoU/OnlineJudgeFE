import utils from '@/utils/utils'
import {ajax} from '../oj/api'

export default {
  // 登录
  login (username, password) {
    return ajax('login/', 'post', {
      data: {
        username,
        password
      }
    })
  },
  logout () {
    return ajax('logout/', 'get')
  },
  getProfile () {
    return ajax('profile/', 'get')
  },
  // 获取公告列表
  getAnnouncementList (offset, limit) {
    return ajax('admin/announcement/', 'get', {
      params: {
        paging: true,
        offset,
        limit
      }
    })
  },
  // 删除公告
  deleteAnnouncement (id) {
    return ajax('admin/announcement/', 'delete', {
      params: {
        id
      }
    })
  },
  // 修改公告
  updateAnnouncement (data) {
    return ajax('admin/announcement/', 'put', {
      data
    })
  },
  // 添加公告
  createAnnouncement (data) {
    return ajax('admin/announcement/', 'post', {
      data
    })
  },
  // 获取用户列表
  getUserList (offset, limit, keyword) {
    let params = {paging: true, offset, limit}
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('admin/user/', 'get', {
      params: params
    })
  },
  // 获取单个用户信息
  getUser (id) {
    return ajax('admin/user/', 'get', {
      params: {
        id
      }
    })
  },
  // 编辑用户
  editUser (data) {
    return ajax('admin/user/', 'put', {
      data
    })
  },
  deleteUsers (id) {
    return ajax('admin/user/', 'delete', {
      params: {
        id
      }
    })
  },
  importUsers (users) {
    return ajax('admin/user/', 'post', {
      data: {
        users
      }
    })
  },
  generateUser (data) {
    return ajax('admin/generate_user/', 'post', {
      data
    })
  },
  getLanguages () {
    return ajax('languages/', 'get')
  },
  getSMTPConfig () {
    return ajax('admin/smtp/', 'get')
  },
  createSMTPConfig (data) {
    return ajax('admin/smtp/', 'post', {
      data
    })
  },
  editSMTPConfig (data) {
    return ajax('admin/smtp/', 'put', {
      data
    })
  },
  testSMTPConfig (email) {
    return ajax('admin/smtp_test/', 'post', {
      data: {
        email
      }
    })
  },
  getWebsiteConfig () {
    return ajax('admin/website/', 'get')
  },
  editWebsiteConfig (data) {
    return ajax('admin/website/', 'post', {
      data
    })
  },
  getJudgeServer () {
    return ajax('admin/judge_server/', 'get')
  },
  deleteJudgeServer (hostname) {
    return ajax('admin/judge_server/', 'delete', {
      params: {
        hostname: hostname
      }
    })
  },
  updateJudgeServer (data) {
    return ajax('admin/judge_server/', 'put', {
      data
    })
  },
  getInvalidTestCaseList () {
    return ajax('admin/prune_test_case/', 'get')
  },
  pruneTestCase (id) {
    return ajax('admin/prune_test_case/', 'delete', {
      params: {
        id
      }
    })
  },
  createContest (data) {
    return ajax('admin/contest/', 'post', {
      data
    })
  },
  getContest (id) {
    return ajax('admin/contest/', 'get', {
      params: {
        id
      }
    })
  },
  editContest (data) {
    return ajax('admin/contest/', 'put', {
      data
    })
  },
  getContestList (offset, limit, keyword, isUseForClassroom) {
    let params = {paging: true, offset, limit}
    if (keyword) {
      params.keyword = keyword
    }
    return ajax(`admin/contest/?is_use_for_classroom=${isUseForClassroom}`, 'get', {
      params: params
    })
  },
  getContestAnnouncementList (contestID) {
    return ajax('admin/contest/announcement/', 'get', {
      params: {
        contest_id: contestID
      }
    })
  },
  createContestAnnouncement (data) {
    return ajax('admin/contest/announcement/', 'post', {
      data
    })
  },
  deleteContestAnnouncement (id) {
    return ajax('admin/contest/announcement/', 'delete', {
      params: {
        id
      }
    })
  },
  updateContestAnnouncement (data) {
    return ajax('admin/contest/announcement/', 'put', {
      data
    })
  },
  getProblemTagList (params) {
    return ajax('problem/tags/', 'get', {
      params
    })
  },
  compileSPJ (data) {
    return ajax('admin/compile_spj/', 'post', {
      data
    })
  },
  createProblem (data) {
    return ajax('admin/problem/', 'post', {
      data
    })
  },
  editProblem (data) {
    return ajax('admin/problem/', 'put', {
      data
    })
  },
  deleteProblem (id) {
    return ajax('admin/problem/', 'delete', {
      params: {
        id
      }
    })
  },
  getProblem (id) {
    return ajax('admin/problem/', 'get', {
      params: {
        id
      }
    })
  },
  getProblemList ({isUseForContest, ...params}) {
    params = utils.filterEmptyValue(params)
    return ajax(`admin/problem/?is_use_for_contest=${isUseForContest}`, 'get', {
      params
    })
  },
  getContestProblemList (params) {
    params = utils.filterEmptyValue(params)
    return ajax('admin/contest/problem/', 'get', {
      params
    })
  },
  getContestProblem (id) {
    return ajax('admin/contest/problem/', 'get', {
      params: {
        id
      }
    })
  },
  createContestProblem (data) {
    return ajax('admin/contest/problem/', 'post', {
      data
    })
  },
  editContestProblem (data) {
    return ajax('admin/contest/problem/', 'put', {
      data
    })
  },
  deleteContestProblem (id) {
    return ajax('admin/contest/problem/', 'delete', {
      params: {
        id
      }
    })
  },
  makeContestProblemPublic (data) {
    return ajax('admin/contest_problem/make_public/', 'post', {
      data
    })
  },
  addProblemFromPublic (data) {
    return ajax('admin/contest/add_problem_from_public/', 'post', {
      data
    })
  },
  getReleaseNotes () {
    return ajax('admin/versions/', 'get')
  },
  getDashboardInfo () {
    return ajax('admin/dashboard_info/', 'get')
  },
  getSessions () {
    return ajax('sessions/', 'get')
  },
  exportProblems (data) {
    return ajax('export_problem/', 'post', {
      data
    })
  }
}
