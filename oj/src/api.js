import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = '/api'
Vue.http.options.emulateJSON = false

function getCookie(name) {
  let allCookies = document.cookie.split('; ')
  for (let i = 0; i < allCookies.length; i++) {
    let cookie = allCookies[i].split('=')
    if (cookie[0] === name) {
      return cookie[1]
    } else {
      return ''
    }
  }
}

Vue.http.interceptors.push((request, next) => {
  request.headers.set('X-CSRFToken', getCookie('csrftoken'))
  next()
})

export default {
  // 登录
  devLogin(username, password) {
    return ajax('/api/login', 'get', {
      options: {
        params: {
          username,
          password
        }
      }
    })
  },
  // 获取公告列表
  getAnnouncementList(offset, limit) {
    return ajax('announcement', 'get', {
      options: {
        params: {
          paging: true,
          offset,
          limit
        }
      }
    })
  },
  // 删除公告
  deleteAnnouncement(id) {
    return ajax('announcement', 'delete', {
      options: {
        params: {
          id
        }
      }
    })
  },
  // 修改公告
  modifyAnnouncement(id, title, content, visible) {
    return ajax('announcement', 'put', {
      body: {
        id,
        title,
        content,
        visible
      }
    })
  },
  // 添加公告
  createAnnouncement(title, content, visible) {
    return ajax('announcement', 'post', {
      body: {
        title,
        content,
        visible
      }
    })
  },
  // 获取用户列表
  getUserList(offset, limit, keyword) {
    let params = {
      paging: true,
      offset,
      limit
    }
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('user', 'get', {
      options: {
        params: params
      }
    })
  },
  // 获取单个用户信息
  getUser(id) {
    return ajax('user', 'get', {
      options: {
        params: {
          id
        }
      }
    })
  },
  // 编辑用户
  editUser(body) {
    return ajax('user', 'put', {
      body
    })
  },
  getLanguages() {
    return ajax('languages', 'get')
  },
  getSMTPConfig() {
    return ajax('smtp', 'get')
  },
  createSMTPConfig(body) {
    return ajax('smtp', 'post', {
      body
    })
  },
  editSMTPConfig(body) {
    return ajax('smtp', 'put', {
      body
    })
  },
  getWebsiteConfig() {
    return ajax('website', 'get')
  },
  editWebsiteConfig(config) {
    return ajax('website', 'post', {
      body: config
    })
  },
  getJudgeServer() {
    return ajax('judge_server', 'get')
  },
  deleteJudgeServer(hostname) {
    return ajax('judge_server', 'delete', {
      options: {
        params: {
          hostname: hostname
        }
      }
    })
  },
  createContest(body) {
    return ajax('contest', 'post', {
      body: body
    })
  },
  getContest(id) {
    return ajax('contest', 'get', {
      options: {
        params: {
          id
        }
      }
    })
  },
  editContest(body) {
    return ajax('contest', 'put', {
      body
    })
  },
  getContestList(offset, limit, keyword) {
    let params = {
      paging: true,
      offset,
      limit
    }
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('contest', 'get', {
      options: {
        params: params
      }
    })
  },
  getContestAnnouncementList(contestId) {
    return ajax('contest/announcement', 'get', {
      options: {
        params: {
          contest_id: contestId
        }
      }
    })
  },
  createContestAnnouncement(body) {
    return ajax('contest/announcement', 'post', {
      body
    })
  },
  deleteContestAnnouncement(id) {
    return ajax('contest/announcement', 'delete', {
      options: {
        params: {
          id
        }
      }
    })
  },
  getProblemTagList() {
    return ajax('problem/tags', 'get')
  },
  createProblem(body) {
    return ajax('problem', 'post', {
      body
    })
  },
  editProblem(body) {
    return ajax('problem', 'put', {
      body
    })
  },
  getProblem(id) {
    return ajax('problem', 'get', {
      options: {
        params: {
          id
        }
      }
    })
  },
  getProblemList(offset, limit, searchParams) {
    let params = {
      paging: true,
      offset,
      limit
    }
    Object.keys(searchParams).forEach((element) => {
      if (searchParams[element]) {
        params[element] = searchParams[element]
      }
    })
    return ajax('problems', 'get', {
      options: {
        params: params
      }
    })
  },
  getContestProblemList(offset, limit, searchParams, contestId) {
    let params = {
      paging: true,
      offset,
      limit,
      contest_id: contestId
    }
    Object.keys(searchParams).forEach((element) => {
      if (searchParams[element]) {
        params[element] = searchParams[element]
      }
    })
    return ajax('contest/problem', 'get', {
      options: {
        params: params
      }
    })
  },
  getContestProblem(id) {
    return ajax('contest/problem', 'get', {
      options: {
        params: {
          id
        }
      }
    })
  },
  createContestProblem(body) {
    return ajax('contest/problem', 'post', {
      body
    })
  },
  editContestProblem(body) {
    return ajax('contest/problem', 'put', {
      body
    })
  }
}
/**
 ajax 请求
 @param url
 @param type get|post|put|jsonp ....
 @param options options = {
                      body: request body
                      options: ..,
                      succCallBack: Function
                      errCallBack: Function
                    }
 @return Promise
 */

function ajax(url, type, options) {
  return new Promise(function (resolve, reject) {
    options = options || {}
    if (options.body === undefined) {
      options.body = options.options
      options.options = undefined
    }
    Vue.http[type](url, options.body, options.options).then(res => {
      // 出错了
      if (res.data.error !== null) {
        Vue.prototype.$error(res.data.data)
        reject(res)
        if (options.errCallBack !== undefined) {
          options.errCallBack(res)
        }
      } else {
        // 请求成功
        resolve(res)
        if (options.succCallBack !== undefined) {
          options.succCallBack(res)
        } else if (type !== 'get') {
          Vue.prototype.$success()
        }
      }
    }, res => {
      // 请求失败
      reject(res)
      if (options.errCallBack !== undefined) {
        options.errCallBack(res)
      } else {
        Vue.prototype.$error('Network Error')
      }
    })
  })
}
