<template>
<div>
  <div>
    <Navbar></Navbar>
  </div>
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
// import SideMenu from './components/SideMenu.vue'
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
  // mounted () {
  //   api.login('root', 'rootroot').then(res => {})
  // }
}
</script>

<style lang="less">
body {
    margin: 0;
    background-color: rgb(236, 242, 247)!important;
}

a {
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
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    background-color: #EDECEC;
    overflow-y: scroll;
}

* {
    box-sizing: border-box;
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
