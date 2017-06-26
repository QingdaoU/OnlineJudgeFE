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
  isAuthicated() {
    return !!storage.getItem('userInfo')
  }
}
