import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export default {
  // 开发用简易登录
  devLogin(username, password) {
    return ajax('/api/login', 'get', {
      params: {
        username,
        password
      }
    })
  },
  login(username, password) {
    return ajax('login', 'post', {
      data: {
        username,
        password
      }
    })
  },
  checkUsernameOrEmail(username, email) {
    return ajax('check_username_or_email', 'post', {
      data: {
        username,
        email
      }
    })
  },
  // 注册
  register(data) {
    return ajax('register', 'post', {
      data
    })
  },
  logout() {
    return ajax('logout', 'get')
  },
  getCaptcha() {
    return ajax('captcha', 'get')
  },
  // 获取自身信息
  getUserInfo(username = undefined) {
    return ajax('profile', 'get', {
      params: {
        username
      }
    })
  },

  // 保存用户资料设置
  editProfileSetting(profile) {
    return ajax('profile', 'put', {
      data: {
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
    return ajax('profile', 'put', {
      data: {
        avatar: avatar
      }
    })
  },
  getLanguages() {
    return ajax('languages', 'get')
  },
  getProblemTagList() {
    return ajax('problem/tags', 'get')
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
    return ajax('problem', 'get', {
      params: params
    })
  },
  getProblem(problemID) {
    return ajax('problem', 'get', {
      params: {
        problem_id: problemID
      }
    })
  },
  getContestList(offset, limit, searchParams) {
    let params = {
      offset,
      limit
    }
    if (searchParams !== undefined) {
      Object.keys(searchParams).forEach((element) => {
        if (searchParams[element]) {
          params[element] = searchParams[element]
        }
      })
    }
    return ajax('contest', 'get', {
      params
    })
  },
  getContest(id) {
    return ajax('contest', 'get', {
      params: {
        id
      }
    })
  },
  getContestAccess(contestID) {
    return ajax('contest/access', 'get', {
      params: {
        contest_id: contestID
      }
    })
  },
  checkContestPassword(contestID, password) {
    return ajax('contest/password', 'post', {
      data: {
        contest_id: contestID,
        password
      }
    })
  },
  getContestAnnouncementList(contestId) {
    return ajax('contest/announcement', 'get', {
      params: {
        contest_id: contestId
      }
    })
  },
  getContestProblemList(contestId) {
    return ajax('contest/problem', 'get', {
      params: {
        contest_id: contestId
      }
    })
  },
  getContestProblem(problemID, contestID) {
    return ajax('contest/problem', 'get', {
      params: {
        contest_id: contestID,
        problem_id: problemID
      }
    })
  },
  submitCode(data) {
    return ajax('submission', 'post', {
      data
    })
  },
  getSubmissionList(offset, limit, params) {
    params.limit = limit
    params.offset = offset
    return ajax('submissions', 'get', {
      params
    })
  },
  getSubmission(id) {
    return ajax('submission', 'get', {
      params: {
        id
      }
    })
  },
  getUserRank(offset, limit, rule = 'acm') {
    let params = {
      offset,
      limit,
      rule
    }
    return ajax('user_rank', 'get', {
      params
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
function ajax(url, method, options) {
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
        // if (res.data.data.startsWith('please login in first')) {
        //   Vue.$router.push('/logout')
        // }
      } else {
        resolve(res)
        // if (method !== 'get') {
        //   Vue.prototype.$success('Success')
        // }
      }
    }, res => {
      // API请求异常，一般为Server error 或 network error
      reject(res)
      Vue.prototype.$error(res.data.data)
    })
  })
}

