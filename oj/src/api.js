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
  // 开发用简易登录
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
  login(username, password) {
    return ajax('login', 'post', {
      body: {
        username,
        password
      }
    })
  },
  // 注册
  register(username, email, password, captcha) {
    return ajax('register', 'post', {
      body: {
        username,
        email,
        password,
        captcha
      }
    })
  },
  logout() {
    return ajax('logout', 'get', {
      options: {
        params: {

        }
      }
    })
  },

  // 获取自身信息
  getMyInfo() {
    return ajax('account/profile', 'get', {
      options: {
        params: {

        }
      }
    })
  },
  // 获取用户信息
  getUserInfo(username) {
    return ajax('account/user/' + username, 'get', {
      options: {
        params: {

        }
      }
    })
  },
  // 保存用户资料设置
  editProfileSetting(profile) {
    return ajax('account/profile', 'put', {
      body: {
        blog: profile.blog,
        mood: profile.mood,
        school: profile.school,
        student_id: profile.student_id,
        phone_number: profile.phone_number,
        major: profile.major
      }
    })
  },
  // 修改用户头像
  editAvatarSetting(avatar) {
    return ajax('account/profile', 'put', {
      body: {
        avatar: avatar
      }
    })
  },
  getLanguages() {
    return ajax('languages', 'get')
  },
  getJudgeServer() {
    return ajax('judge_server', 'get')
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
  getProblemTagList() {
    return ajax('problem/tags', 'get')
  },
  getProblem(id) {
    return ajax('problems', 'get', {
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
  },
  submitCode(problemId, language, code) {
    return ajax('submission', 'post', {
      body: {
        problem_id: problemId,
        language,
        code
      }
    })
  },
  getSubmission(id) {
    return ajax('submission', 'get', {
      options: {
        params: {
          id
        }
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

function ajax(url, type, options) {
  return new Promise(function(resolve, reject) {
    options = options || {}
    if (options.body === undefined) {
      options.body = options.options
      options.options = undefined
    }
    Vue.http[type](url, options.body, options.options).then(res => {
      // 出错了
      if (res.data.error !== null) {
        Vue.prototype.$error(res.data.data)
        // // 若后端返回为登录，则为session失效，应退出当前登录用户
        // if (res.data.data.startsWith('please login in first')) {
        //   Vue.$router.push('/logout')
        // }
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
