import auth from '@/utils/auth'
import api from '@/api'

export default {
  data() {
    return {
      profile: {}
    }
  },
  methods: {
    loadProfile() {
      if (!auth.isAuthicated()) {
        this.$error('please login first.')
        // todo jump to login view
      } else {
        this.profile = auth.getUser()
        return auth.getUser()
      }
    },
    getProfile(username) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(username).then(res => {
          this.profile = res.data.data
          auth.setUser(res.data.data)
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    }
  }
}
