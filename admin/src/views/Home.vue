<template>
  <div class="container">
    <div>
      <SideMenu></SideMenu>
    </div>
    <div id="header">
      <el-dropdown @command="handleCommand">
        <span>{{profile.user.username}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout" >Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
  import SideMenu from '../components/SideMenu.vue'
  import api from '../api'

  export default {
    name: 'app',
    data () {
      return {
        version: process.env.VERSION,
        profile: {
          user: {}
        }
      }
    },
    components: {
      SideMenu
    },
    beforeRouteEnter (to, from, next) {
      api.getProfile().then(res => {
        if (!res.data.data) {
          // not login
          next({name: 'login'})
        } else {
          next(vm => {
            vm.profile = res.data.data
          })
        }
      })
    },
    methods: {
      handleCommand (command) {
        if (command === 'logout') {
          api.logout().then(() => {
            this.$router.push({name: 'login'})
          })
        }
      }
    }
  }
</script>

<style lang="less">
  a {
    background-color: transparent;
  }

  a:active, a:hover {
    outline-width: 0
  }

  img {
    border-style: none
  }

  .container {
    overflow: auto;
    font-weight: 400;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background-color: #EDECEC;
    overflow-y: scroll;
  }

  * {
    box-sizing: border-box;
  }

  #header {
    text-align: right;
    padding-left: 210px;
    padding-right: 30px;
    line-height: 50px;
    height: 50px;
    background: #F9FAFC;
  }

  .content-app {
    padding-top: 20px;
    padding-right: 10px;
    padding-left: 210px;
  }

  .footer {
    margin: 15px;
    text-align: center;
    font-size: small;
  }
</style>
