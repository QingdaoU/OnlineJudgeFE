<template>
</template>

<script>
  import api from '../../api.js'
  import auth from '@/utils/auth'

  export default {
    mounted() {
      api.logout().then(res => {
        this.$success('logout succeeded')
        auth.clear()
        this.$bus.$emit('logout')
        this.$router.replace({
          path: '/'
        })
      })
    }
  }
</script>
