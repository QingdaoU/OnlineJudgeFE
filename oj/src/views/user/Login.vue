<template>
<div class="center">
  <el-card class="box-card" id="login-card">

    <div slot="header" class="clearfix" id="login-title">
      <span style="line-height: 36px;">用户登录</span>
    </div>

    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" type="password"></el-input>
      </el-form-item>
      <!-- <el-form-item label="二次验证">
        <el-input v-model="formLabelAlign.totp"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即登录</el-button>
        <el-button>用户注册</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</div>
</template>

<script>
import api from '../../api.js'

export default {
  data() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      api.login(this.formLabelAlign.username, this.formLabelAlign.password).then(function(res) {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="css">
.center{
  margin-top: 50px;
}
#login-card{
  max-width: 400px;
  margin: auto;
}
#login-title{
  text-align: center;
  font-size: 20px;
}
</style>
