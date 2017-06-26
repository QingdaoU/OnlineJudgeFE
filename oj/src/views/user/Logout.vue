<template>
</template>

<script>
  import api from '../../api.js'
  import auth from '@/utils/authHelper'
  import bus from '@/utils/eventBus'

  export default {
    mounted() {
      api.logout().then(res => {
        this.$success('logout succeeded')
        auth.clear()
        bus.$emit('logout')
        this.$router.replace({
          path: '/'
        })
      })
    }
  }
</script>
