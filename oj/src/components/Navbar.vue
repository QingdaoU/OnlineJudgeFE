<template>
  <div class="nav">
    <el-row :gutter="10" type="flex" justify="space-around">
      <el-col :xs="1" :sm="1" :lg="1">&nbsp;</el-col>
      <el-col :xs="2" :sm="2" :lg="2">
        <div id="brand">QDUOJ</div>
      </el-col>
      <el-col :xs="16" :sm="16" :lg="16">
        <el-menu theme="dark" mode="horizontal" router>
          <el-menu-item index="/problems">Problems</el-menu-item>
          <el-menu-item index="3">Contests</el-menu-item>
          <el-menu-item index="2">Status</el-menu-item>
          <el-menu-item index="4">Rank</el-menu-item>
          <el-menu-item index="5">About</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="3" :sm="3" :lg="3">
        <template v-if="isLogin">
          <el-menu theme="dark" mode="horizontal" router>
            <el-submenu index="2">
              <template slot="title">{{ info.user.username }}
              </template>
              <el-menu-item index="2-1" :route="{path:'/user/'+info.user.username}">Home</el-menu-item>
              <el-menu-item index="2-2">Submissions</el-menu-item>
              <el-menu-item index="/setting">Settings</el-menu-item>
              <el-menu-item index="/logout">Logout</el-menu-item>
            </el-submenu>
          </el-menu>
        </template>
        <template v-else>
          <div class="">
            <el-menu theme="dark" mode="horizontal" router>
              <el-menu-item class="login-btn" index="/login">Login</el-menu-item>
              <el-menu-item class="login-separator" index="/">/</el-menu-item>
              <el-menu-item class="login-btn" index="/register">Register</el-menu-item>
            </el-menu>
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import api from '../api.js'

  export default {
    data() {
      return {
        isLogin: false
      }
    },
    mounted() {
      this.getMyInfo()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'getMyInfo'
    },
    methods: {
      getMyInfo() {
        api.getMyInfo().then(res => {
          this.info = res.data.data
          this.isLogin = true
        }, res => {
          this.isLogin = false
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .nav {
    background-color: #324157;
  }

  .el-menu-item{
    font-size: 15px;
  }

  #brand {
    font-size: 23px;
    display: inline-block;
    line-height: 60px;
    color: #E5E9F2;
  }

  .login-btn {
    padding: 0 !important;
  }

  .login-separator {
    padding: 0 10px !important;
    cursor: default !important;
  }

  .login-separator.is-active {
    color: #bfcbd9 !important;
  }
</style>
