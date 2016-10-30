import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8080/api'
Vue.http.options.emulateJSON = true

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
  getAnnounceList () {
    return ajax('admin/announcement/', 'get')
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
        Vue.prototype.$message({
          showClose: true,
          message: res.data.data,
          type: 'error'
        })
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
