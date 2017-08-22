import storage from './storage'

export default {
  /**
   * 将用户信息存入localstorage
   * @param userInfo
   */
  setUser(userInfo) {
    storage.set('userInfo', userInfo)
  },

  /**
   * 获取用户信息
   * @returns {object}
   */
  getUser() {
    return storage.get('userInfo')
  },

  /**
   * 清除用户信息
   */
  clear() {
    storage.remove('userInfo')
  },
  /**
   * 是否已登录
   * @returns {boolean}
   */
  isAuthicated() {
    return !!storage.get('userInfo')
  },
  /**
   * 获取当前用户id
   */
  getUid() {
    if (this.isAuthicated()) {
      return this.getUid().user.id
    }
    return null
  }
}
