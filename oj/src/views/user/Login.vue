<template>
  <div class="center">
    <Card id="login-card">
      <div slot="title" class="clearfix" id="login-title">
        <span style="line-height: 36px;">OnlineJudge</span>
      </div>
      <Form :model="loginForm" :label-width="80">
        <Form-item label="Username">
          <Input v-model="loginForm.username"/>
        </Form-item>
        <Form-item label="Password">
          <Input v-model="loginForm.password"/>
        </Form-item>
        <Form-item>
          <Button type="primary" id="btn-login" @click="onSubmit">Login</Button>
        </Form-item>
      </Form>

    </Card>
  </div>
</template>

<script>
  import api from '../../api.js'
  import bus from '../../utils/eventBus'
//  import auth from '@/utils/authHelper'

  export default {
    data() {
      return {
        labelPosition: 'top',
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        api.devLogin(this.loginForm.username, this.loginForm.password).then((res) => {
          bus.$emit('loginSuccess', res)
//          auth.set(res.data)
        }, (res) => {
        })
      }
    }
  }
</script>

<style lang="css">
  .center {
    margin-top: 50px;
  }

  #login-card {
    max-width: 400px;
    margin: auto;
  }

  #login-title {
    text-align: center;
    font-size: 20px;
  }

  #btn-login {
    float: right;
    margin-right: 10px;
  }
</style>
