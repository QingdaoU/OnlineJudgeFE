<template>
  <p class="home-wrapper" v-html="data.description"></p>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      data: {}
    },
    mounted () {
    }
  }
</script>

<style scoped lang="less">
  .home-wrapper {
    margin: 0 15px;
  }
</style>
