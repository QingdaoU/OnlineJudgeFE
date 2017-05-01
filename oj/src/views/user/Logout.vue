<template>
</template>

<script>
import api from '../../api.js'

export default {
  data() {
    return {

    }
  },
  created() {
    this.userLogout()
  },
  methods: {
    userLogout() {
      api.logout().then(res => {
        this.$router.replace({
          path: '/'
        })
      })
    }
  }

}
</script>
