import Vue from 'vue'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export default {
  // 登录
  login (username, password) {
    return ajax('login', 'post', {
      data: {
        username,
        password
      }
    })
  },
  logout () {
    return ajax('logout', 'get')
  },
  getProfile () {
    return ajax('profile', 'get')
  },
  // 获取公告列表
  getAnnouncementList (offset, limit) {
    return ajax('admin/announcement', 'get', {
      params: {
        paging: true,
        offset,
        limit
      }
    })
  },
  // 删除公告
  deleteAnnouncement (id) {
    return ajax('admin/announcement', 'delete', {
      params: {
        id
      }
    })
  },
  // 修改公告
  modifyAnnouncement (id, title, content, visible) {
    return ajax('admin/announcement', 'put', {
      data: {
        id,
        title,
        content,
        visible
      }
    })
  },
  // 添加公告
  createAnnouncement (title, content, visible) {
    return ajax('admin/announcement', 'post', {
      data: {
        title,
        content,
        visible
      }
    })
  },
  // 获取用户列表
  getUserList (offset, limit, keyword) {
    let params = {paging: true, offset, limit}
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('admin/user', 'get', {
      options: {
        params: params
      }
    })
  },
  // 获取单个用户信息
  getUser (id) {
    return ajax('admin/user', 'get', {
      params: {
        id
      }
    })
  },
  // 编辑用户
  editUser (data) {
    return ajax('admin/user', 'put', {
      data
    })
  },
  getLanguages () {
    return ajax('languages', 'get')
  },
  getSMTPConfig () {
    return ajax('admin/smtp', 'get')
  },
  createSMTPConfig (data) {
    return ajax('admin/smtp', 'post', {
      data
    })
  },
  editSMTPConfig (data) {
    return ajax('admin/smtp', 'put', {
      data
    })
  },
  getWebsiteConfig () {
    return ajax('admin/website', 'get')
  },
  editWebsiteConfig (data) {
    return ajax('admin/website', 'post', {
      data
    })
  },
  getJudgeServer () {
    return ajax('admin/judge_server', 'get')
  },
  deleteJudgeServer (hostname) {
    return ajax('admin/judge_server', 'delete', {
      params: {
        hostname: hostname
      }
    })
  },
  createContest (data) {
    return ajax('admin/contest', 'post', {
      data
    })
  },
  getContest (id) {
    return ajax('admin/contest', 'get', {
      params: {
        id
      }
    })
  },
  editContest (data) {
    return ajax('admin/contest', 'put', {
      data
    })
  },
  getContestList (offset, limit, keyword) {
    let params = {paging: true, offset, limit}
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('admin/contest', 'get', {
      params: params
    })
  },
  getContestAnnouncementList (contestId) {
    return ajax('admin/contest/announcement', 'get', {
      params: {
        contest_id: contestId
      }
    })
  },
  createContestAnnouncement (data) {
    return ajax('admin/contest/announcement', 'post', {
      data
    })
  },
  deleteContestAnnouncement (id) {
    return ajax('admin/contest/announcement', 'delete', {
      params: {
        id
      }
    })
  },
  getProblemTagList () {
    return ajax('problem/tags', 'get')
  },
  createProblem (data) {
    return ajax('admin/problem', 'post', {
      data
    })
  },
  editProblem (data) {
    return ajax('admin/problem', 'put', {
      data
    })
  },
  getProblem (id) {
    return ajax('admin/problem', 'get', {
      params: {
        id
      }
    })
  },
  getProblemList (offset, limit, keyword) {
    let params = {paging: true, offset, limit}
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('admin/problem', 'get', {
      params
    })
  },
  getContestProblemList (offset, limit, keyword, contestId) {
    let params = {paging: true, offset, limit, contest_id: contestId}
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('admin/contest/problem', 'get', {
      params
    })
  },
  getContestProblem (id) {
    return ajax('admin/contest/problem', 'get', {
      params: {
        id
      }
    })
  },
  createContestProblem (data) {
    return ajax('admin/contest/problem', 'post', {
      data
    })
  },
  editContestProblem (data) {
    return ajax('admin/contest/problem', 'put', {
      data
    })
  }
}

/**
 * @param url
 * @param method get|post|put|delete...
 * @param params like queryString. if a url is index?a=1&b=2, params = {a: '1', b: '2'}
 * @param data post data, use for method put|post
 * @returns {Promise}
 */
function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data
    }).then(res => {
      // API正常返回(status=20x), 是否错误通过有无error判断
      if (res.data.error !== null) {
        Vue.prototype.$error(res.data.data)
        reject(res)
        // // 若后端返回为登录，则为session失效，应退出当前登录用户
        if (res.data.data.startsWith('Please login')) {
          router.push({name: 'login'})
        }
      } else {
        resolve(res)
        if (method !== 'get') {
          Vue.prototype.$success('Succeeded')
        }
      }
    }, res => {
      // API请求异常，一般为Server error 或 network error
      reject(res)
      Vue.prototype.$error(res.data.data)
    })
  })
}
