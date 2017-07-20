const storage = window.localStorage

export default {
  /**
   * 将用户信息存入localstorage
   * @param userInfo
   */
  setUser(userInfo) {
    storage.setItem('userInfo', JSON.stringify(userInfo))
  },

  /**
   * 获取用户信息
   * @returns {object}
   */
  getUser() {
    return JSON.parse(storage.getItem('userInfo')) || null
  },

  /**
   * 清除用户信息
   */
  clear() {
    storage.removeItem('userInfo')
  },
  /**
   * 是否已登录
   * @returns {boolean}
   */
  isAuthicated() {
    return !!storage.getItem('userInfo')
  },
  /**
   * 获取当前用户id
   */
  getUid() {
    return this.getUser().user.id
  }
}
