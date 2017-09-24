<template>
</template>

<script>
  import api from '../../api.js'

  export default {
    mounted() {
      api.logout().then(res => {
        this.$success('logout succeeded')
        this.$store.dispatch('clearProfile')
        this.$router.replace({
          path: '/'
        })
      })
    }
  }
</script>
