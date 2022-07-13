import Vue from 'vue'
import store from '@/store'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.validateStatus = function (status) {
  return status === 200 || status === 400 || status === 401
}

export default {
  getWebsiteConf (params) {
    return ajax('website/', 'get', {
      params
    })
  },
  getAnnouncementList (offset, limit) {
    let params = {
      offset: offset,
      limit: limit
    }
    return ajax('announcement/', 'get', {
      params
    })
  },
  login (data) {
    return ajax('login/', 'post', {
      data
    })
  },
  checkUsernameOrEmail (username, email) {
    return ajax('check_username_or_email/', 'post', {
      data: {
        username,
        email
      }
    })
  },
  // 注册
  register (data) {
    return ajax('register/', 'post', {
      data
    })
  },
  logout () {
    return ajax('logout/', 'get')
  },
  getCaptcha () {
    return ajax('captcha/', 'get')
  },
  getUserInfo (username = undefined) {
    return ajax('profile/', 'get', {
      params: {
        username
      }
    })
  },
  updateProfile (profile) {
    return ajax('profile/', 'put', {
      data: profile
    })
  },
  freshDisplayID (userID) {
    return ajax('profile/fresh_display_id/', 'get', {
      params: {
        user_id: userID
      }
    })
  },
  twoFactorAuth (method, data) {
    return ajax('two_factor_auth', method, {
      data
    })
  },
  tfaRequiredCheck (username) {
    return ajax('tfa_required/', 'post', {
      data: {
        username
      }
    })
  },
  getSessions () {
    return ajax('sessions/', 'get')
  },
  deleteSession (sessionKey) {
    return ajax('sessions/', 'delete', {
      params: {
        session_key: sessionKey
      }
    })
  },
  applyResetPassword (data) {
    return ajax('apply_reset_password/', 'post', {
      data
    })
  },
  resetPassword (data) {
    return ajax('reset_password/', 'post', {
      data
    })
  },
  changePassword (data) {
    return ajax('change_password/', 'post', {
      data
    })
  },
  changeEmail (data) {
    return ajax('change_email/', 'post', {
      data
    })
  },
  getLanguages () {
    return ajax('languages/', 'get')
  },
  getProblemTagList () {
    return ajax('problem/tags/', 'get')
  },
  getProblemList (offset, limit, searchParams) {
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
    return ajax('problem/', 'get', {
      params: params
    })
  },
  pickone () {
    return ajax('pickone/', 'get')
  },
  getProblem (problemID) {
    return ajax('problem/', 'get', {
      params: {
        problem_id: problemID
      }
    })
  },
  getContestList (offset, limit, searchParams) {
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
    return ajax('contests/', 'get', {
      params
    })
  },
  getContest (id) {
    return ajax('contest/', 'get', {
      params: {
        id
      }
    })
  },
  getContestAccess (contestID) {
    return ajax('contest/access/', 'get', {
      params: {
        contest_id: contestID
      }
    })
  },
  checkContestPassword (contestID, password) {
    return ajax('contest/password/', 'post', {
      data: {
        contest_id: contestID,
        password
      }
    })
  },
  getContestAnnouncementList (contestId) {
    return ajax('contest/announcement/', 'get', {
      params: {
        contest_id: contestId
      }
    })
  },
  getContestProblemList (contestId) {
    return ajax('contest/problem/', 'get', {
      params: {
        contest_id: contestId
      }
    })
  },
  getContestProblem (problemID, contestID) {
    return ajax('contest/problem/', 'get', {
      params: {
        contest_id: contestID,
        problem_id: problemID
      }
    })
  },
  submitCode (data) {
    return ajax('submission/', 'post', {
      data
    })
  },
  getSubmissionList (offset, limit, params) {
    params.limit = limit
    params.offset = offset
    return ajax('submissions/', 'get', {
      params
    })
  },
  getContestSubmissionList (offset, limit, params) {
    params.limit = limit
    params.offset = offset
    return ajax('contest_submissions/', 'get', {
      params
    })
  },
  getSubmission (id) {
    return ajax('submission/', 'get', {
      params: {
        id
      }
    })
  },
  submissionExists (problemID) {
    return ajax('submission_exists/', 'get', {
      params: {
        problem_id: problemID
      }
    })
  },
  submissionRejudge (id) {
    return ajax('admin/submission/rejudge/', 'get', {
      params: {
        id
      }
    })
  },
  updateSubmission (data) {
    return ajax('submission/', 'put', {
      data
    })
  },
  getUserRank (offset, limit, rule = 'acm') {
    let params = {
      offset,
      limit,
      rule
    }
    return ajax('user_rank/', 'get', {
      params
    })
  },
  getContestRank (params) {
    return ajax('contest_rank/', 'get', {
      params
    })
  },
  getACMACInfo (params) {
    return ajax('admin/contest/acm_helper/', 'get', {
      params
    })
  },
  updateACInfoCheckedStatus (data) {
    return ajax('admin/contest/acm_helper/', 'put', {
      data
    })
  },
  getClassrooms () {
    return ajax('classrooms/', 'get')
  },
  getClassroom (id) {
    return ajax(`classrooms/${id}/`, 'get')
  },
  createClassroom (data) {
    return ajax('classrooms/', 'post', {
      data
    })
  },
  updateClassroom ({id, ...data}) {
    return ajax(`classrooms/${id}/`, 'put', {
      data
    })
  },
  deleteClassroom (id) {
    return ajax(`classrooms/${id}/`, 'delete')
  },
  getAnnouncements (classroomId) {
    return ajax(`classrooms/${classroomId}/announcements/`, 'get')
  },
  getAnnouncement (classroomId, announcementId) {
    return ajax(`classrooms/${classroomId}/announcements/${announcementId}/`, 'get')
  },
  deleteAnnouncement (classroomId, announcementId) {
    return ajax(`classrooms/${classroomId}/announcements/${announcementId}/`, 'delete')
  },
  createAnnouncement (classroomId, data) {
    return ajax(`classrooms/${classroomId}/announcements/`, 'post', {
      data
    })
  },
  updateAnnouncement (classroomId, {id, ...data}) {
    return ajax(`classrooms/${classroomId}/announcements/${id}/`, 'put', {
      data
    })
  },
  getUserCanAdd (classroomId, searchText = null) {
    if (!searchText) return ajax(`classrooms/${classroomId}/users/`, 'get')
    return ajax(`classrooms/${classroomId}/users/?search_label_text=${searchText}`, 'get')
  },
  addMembersClassroom (classroomId, data) {
    return ajax(`classrooms/${classroomId}/members/`, 'post', {
      data
    })
  },
  getMembersClassroom (classroomId) {
    return ajax(`classrooms/${classroomId}/members/`, 'get')
  },
  deleteMemberClassroom (classroomId, userId) {
    return ajax(`classrooms/${classroomId}/members/${userId}`, 'delete')
  },
  getContests (classroomId) {
    return ajax(`classrooms/${classroomId}/contests/`, 'get')
  },
  getCanMappingContests (classroomId, searchTitle = null) {
    if (!searchTitle) return ajax(`classrooms/${classroomId}/unmapping_contests/`, 'get')
    return ajax(`classrooms/${classroomId}/unmapping_contests/?search_label_text=${searchTitle}`, 'get')
  },
  mappingContest (classroomId, data) {
    return ajax(`classrooms/${classroomId}/contests/`, 'post', {
      data
    })
  },
  unMappingContest (classroomId, contestId) {
    return ajax(`classrooms/${classroomId}/contests/${contestId}`, 'delete')
  }
}

/**
 * @param url
 * @param method get|post|put|delete...
 * @param params like queryString. if a url is index?a=1&b=2, params = {a: '1', b: '2'}
 * @param data post data, use for method put|post
 * @returns {Promise}
 */
export function ajax (url, method, options) {
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
      if (res.data.error !== null) {
        Vue.prototype.$error(res.data.data)
        reject(res)

        if (res.data.data.startsWith('Please login')) {
          store.dispatch('changeModalStatus', {'mode': 'login', 'visible': true})
        }
      } else {
        // if (method !== 'get') {
        //   Vue.prototype.$success('Succeeded')
        // }
        resolve(res)
      }
    }, error => {
      // API request exception, usually Server error or network error
      Vue.prototype.$error(error.message)
      reject(error)
    })
  })
}
