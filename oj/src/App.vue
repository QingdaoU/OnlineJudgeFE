<template>
  <div>
    <NavBar></NavBar>
    <div class="content-app">
      <router-view></router-view>
      <div class="footer">
        {{website.footer}} Build Version: {{ version }}
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import NavBar from './components/NavBar.vue'

  export default {
    name: 'app',
    mounted () {
      this.getWebsiteConfig()
    },
    data () {
      return {
        version: process.env.VERSION
      }
    },
    components: {
      NavBar
    },
    methods: {
      ...mapActions(['getWebsiteConfig'])
    },
    computed: {
      ...mapState(['website'])
    }
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
