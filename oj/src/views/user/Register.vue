<template>
<div class="center">
  <el-card class="box-card" id="login-card">

    <div slot="header" class="clearfix" id="login-title">
      <span style="line-height: 36px;">用户注册</span>
    </div>

    <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="formLabelAlign">
      <el-form-item label="账号" prop="username">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formLabelAlign.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLabelAlign.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="formLabelAlign.checkPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formLabelAlign.captcha"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</div>
</template>

<script>
import api from '../../api.js'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formLabelAlign.checkPassword !== '') {
          this.$refs.formLabelAlign.validateField('checkPassword')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formLabelAlign.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      labelPosition: 'top',
      formLabelAlign: {
        username: '',
        password: '',
        email: '',
        captcha: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        password: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPassword: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      api.register(this.formLabelAlign.username, this.formLabelAlign.email,
        this.formLabelAlign.password, this.formLabelAlign.captcha).then(function(res) {
          // 跳转problems
        })
    }
  }
}
</script>

<style lang="css" scoped>
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
