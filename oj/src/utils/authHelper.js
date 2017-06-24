const storage = window.localStorage

export default {
  name: 'authHelper',
  /**
   * 将用户信息存入localstorage
   * @param userInfo
   */
  set(userInfo) {
    storage.setItem('userInfo', JSON.stringify(userInfo))
  },

  /**
   * 获取用户信息
   * @returns {object}
   */
  get() {
    return JSON.parse(storage.getItem('userInfo')) || null
  },

  /**
   * 清除用户信息
   */
  remove() {
    storage.removeItem('userInfo')
  },
  isAuthicated() {
    return !!storage.getItem('userInfo')
  }
}
