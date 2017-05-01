<template>
<el-menu theme="dark" class="el-menu-demo" mode="horizontal" router>
  <el-row :gutter="10">
    <el-col :xs="3" :sm="3" :lg="3">&nbsp;</el-col>
    <el-col :xs="2" :sm="2" :lg="2">
      <div style="color:#bfcbd9;margin-top:16px;font-size:20px;">QDUOJ</div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="16">
      <el-menu-item index="/problems">题目</el-menu-item>
      <el-menu-item index="2">提交</el-menu-item>
      <el-menu-item index="3">比赛</el-menu-item>
      <el-menu-item index="4">排名</el-menu-item>
      <el-menu-item index="5">帮助</el-menu-item>
    </el-col>
    <el-col :xs="3" :sm="3" :lg="3">
      <template v-if="isLogin">
        <el-submenu index="2">
          <template slot="title">{{ info.user.username }}
          </template>
      <el-menu-item index="2-1" :route="{path:'/user/'+info.user.username}">我的主页</el-menu-item>
      <el-menu-item index="2-2">我的提交</el-menu-item>
      <el-menu-item index="/setting">设置</el-menu-item>
      <el-menu-item index="/logout">退出</el-menu-item>
      </el-submenu>
      </template>
      <template v-else>
        <div class="">
          <el-menu-item class="login-btn" index="/login">登录</el-menu-item>
          <el-menu-item class="login-separator" index="/">/</el-menu-item>
          <el-menu-item class="login-btn" index="/register">注册</el-menu-item>
        </div>
      </template>
    </el-col>
  </el-row>
</el-menu>
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

<style lang="css">
.login a{
  text-decoration: none;
}
.login-btn{
  padding: 0!important;
}
.login-separator{
  padding: 0 10px!important;
  cursor: default!important;
}
.login-separator.is-active{
  color: #bfcbd9!important;
}
</style>
