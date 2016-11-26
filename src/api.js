import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8080/api'
Vue.http.options.emulateJSON = false
Vue.http.headers.common['X-CSRFToken'] = getCookie('csrftoken')

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
export default {
  // 登录
  login (uname, pwd) {
    return ajax('login', 'get', {
      options: {
        params: {
          username: uname,
          password: pwd
        }
      }
    })
  },
  // 获取公告列表
  getAnnounceList (offset, limit) {
    return ajax('admin/announcement', 'get', {
      options: {
        params: {
          paging: true,
          offset: offset,
          limit: limit
        }
      }
    })
  },
  // 获取用户列表
  getUserList (offset, limit) {
    return ajax('admin/user', 'get', {
      options: {
        params: {
          paging: true,
          offset: offset,
          limit: limit
        }
      }
    })
  },
  getSMTPConfig () {
    return ajax('admin/smtp', 'get')
  },
  createSMTPConfig (config) {
    return ajax('admin/smtp', 'post', {
      options: config
    })
  },
  updateSMTPConfig (config) {
    return ajax('admin/smtp', 'put', {
      options: config
    })
  },
  getWebsiteConfig () {
    return ajax('admin/website', 'get')
  },
  updateWebsiteConfig (config) {
    return ajax('admin/website', 'post', {
      options: config
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
        window.error(res.data.data)
        reject(res)
        if (options.errCallBack !== undefined) {
          options.errCallBack(res)
        }
      } else {
        // 请求成功
        resolve(res)
        if (options.succCallBack !== undefined) {
          options.succCallBack(res)
        }
      }
    }, res => {
      // 请求失败
      reject(res)
      if (options.succCallBack !== undefined) {
        options.succCallBack(res)
      }
    })
  })
}
