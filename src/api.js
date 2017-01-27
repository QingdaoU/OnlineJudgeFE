import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8080/api'
Vue.http.options.emulateJSON = false

function getCookie (name) {
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
  login (username, password) {
    return ajax('login', 'get', {
      options: {
        params: {
          username,
          password
        }
      }
    })
  },
  // 获取公告列表
  getAnnouncementList (offset, limit) {
    return ajax('admin/announcement', 'get', {
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
  deleteAnnouncement (id) {
    return ajax('admin/announcement', 'delete', {
      options: {
        params: {
          id
        }
      }
    })
  },
  // 修改公告
  modifyAnnouncement (id, title, content, visible) {
    return ajax('admin/announcement', 'put', {
      body: {
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
      body: {
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
      options: {
        params: {
          id
        }
      }
    })
  },
  // 编辑用户
  editUser (body) {
    return ajax('admin/user', 'put', {
      body
    })
  },
  getSMTPConfig () {
    return ajax('admin/smtp', 'get')
  },
  createSMTPConfig (body) {
    return ajax('admin/smtp', 'post', {
      body
    })
  },
  editSMTPConfig (body) {
    return ajax('admin/smtp', 'put', {
      body
    })
  },
  getWebsiteConfig () {
    return ajax('admin/website', 'get')
  },
  editeWebsiteConfig (config) {
    return ajax('admin/website', 'post', {
      body: config
    })
  },
  getJudgeServer () {
    return ajax('admin/judge_server', 'get')
  },
  deleteJudgeServer (hostname) {
    return ajax('admin/judge_server', 'delete', {
      options: {
        params: {
          hostname: hostname
        }
      }
    })
  },
  createContest (body) {
    return ajax('admin/contest', 'post', {
      body: body
    })
  },
  getContest (id) {
    return ajax('admin/contest', 'get', {
      options: {
        params: {
          id
        }
      }
    })
  },
  editContest (body) {
    return ajax('admin/contest', 'put', {
      body
    })
  },
  getContestList (offset, limit, keyword) {
    let params = {paging: true, offset, limit}
    if (keyword) {
      params.keyword = keyword
    }
    return ajax('admin/contest', 'get', {
      options: {
        params: params
      }
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

function ajax (url, type, options) {
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
