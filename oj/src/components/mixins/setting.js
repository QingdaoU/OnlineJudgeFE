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
    getProfile() {
      api.getUserInfo().then(res => {
        this.profile = res.data.data
        auth.setUser(res.data.data)
      })
    }
  }
}
