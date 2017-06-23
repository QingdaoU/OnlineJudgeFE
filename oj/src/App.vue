<template>
  <div>
    <Navbar></Navbar>
    <div class="content-app">
      <router-view></router-view>
      <div class="footer">
        Build Version: {{ version }}
      </div>
    </div>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import Navbar from './components/Navbar.vue'
  // import api from './api.js'

  export default {
    name: 'app',
    data() {
      return {
        version: process.env.VERSION
      }
    },
    components: {
      Navbar
    },
    methods: {}
  }
</script>

<style lang="less">

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: rgb(236, 242, 247) !important;
  }

  a {
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  a:active,
  a:hover {
    outline-width: 0;
  }

  img {
    border-style: none;
  }

  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
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
