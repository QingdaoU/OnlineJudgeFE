<template>
  <div>
    <NavBar></NavBar>
    <!--<breadcrumb></breadcrumb>-->
    <div class="content-app">
      <router-view></router-view>
      <div class="footer">
        {{footer}} Build Version: {{ version }}
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import utils from '@/utils/utils'
  import NavBar from './components/NavBar.vue'

  export default {
    name: 'app',
    mounted() {
      api.getWebsiteConf().then(res => {
        utils.setWebsiteConf(res.data.data)
        this.footer = res.data.data.footer
      })
    },
    data() {
      return {
        version: process.env.VERSION,
        footer: ''
      }
    },
    components: {
      NavBar
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
    background-color: #eee;
    min-width: 800px;
  }

  .content-app {
    margin-top: 80px;
    padding: 0 2%;
    overflow-y: scroll;
  }

  .footer {
    margin: 15px;
    text-align: center;
    font-size: small;
  }
</style>
