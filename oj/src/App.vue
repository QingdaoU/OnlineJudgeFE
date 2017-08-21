<template>
  <div>
    <Navbar></Navbar>
    <!--<breadcrumb></breadcrumb>-->
    <div class="content-app">
      <router-view></router-view>
      <div class="footer">
        Build Version: {{ version }}
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/NavBar.vue'
  import breadcrumb from './components/Breadcrumb.vue'

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
    -webkit-font-smoothing: antialiased;
    background-color: #eee;;
  }

  .content-app {
    margin-top: 80px;
    padding: 0 20px;
    overflow-y: scroll;
  }

  .footer {
    margin: 15px;
    text-align: center;
    font-size: small;
  }
  .ivu-table-wrapper {
    border: 0;
  }
  .flex-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-flow: row nowrap;
  }
</style>
