<template>
  <div>
    <Navbar></Navbar>
    <breadcrumb></breadcrumb>
    <div class="content-app">
      <router-view></router-view>
      <div class="footer">
        Build Version: {{ version }}
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './NavBar.vue'
  import breadcrumb from './Breadcrumb.vue'

  export default {
    name: 'app',
    data() {
      return {
        version: process.env.VERSION
      }
    },
    components: {
      Navbar,
      breadcrumb
    },
    methods: {}
  }
</script>

<style lang="less">

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    background-color: transparent;
    &:active, &:hover {
      outline-width: 0;
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    overflow: auto;
    -webkit-font-smoothing: antialiased;
    background-color: #edf0f2;;
    overflow-y: scroll;
  }

  .content-app {
    padding-top: 20px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .footer {
    margin: 15px;
    text-align: center;
    font-size: small;
  }
</style>
