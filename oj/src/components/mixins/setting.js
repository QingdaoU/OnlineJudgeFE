import auth from '@/utils/auth'

export default {
  methods: {
    loadProfile() {
      if (!auth.isAuthicated()) {
        this.$error('please login first.')
        // todo jump to login view
        return null
      } else {
        return auth.getUser()
      }
    }
  }
}
