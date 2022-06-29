<template>
  <div class="home-wrapper markdown-body" v-katex v-html="data.description"></div>
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
