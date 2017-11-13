<template>
  <Panel :padding="30" class="container">
    <div slot="title" class="center">Reset Password</div>
    <template v-if="!resetSuccess">
    <Form :model=formResetPassword ref="formResetPassword" :rules="ruleResetPassword">
      <Form-item prop="password">
        <Input type="password" v-model="formResetPassword.password" placeholder="Password" size="large">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="passwordAgain">
        <Input type="password" v-model="formResetPassword.passwordAgain" placeholder="Password Again" size="large">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="captcha" style="margin-bottom:10px">
        <div id="captcha">
          <div id="captchaCode">
            <Input v-model="formResetPassword.captcha" placeholder="Captcha" size="large">
            <Icon type="ios-lightbulb-outline" slot="prepend"></Icon>
            </Input>
          </div>
          <div id="captchaImg">
            <Tooltip content="Click to refresh" placement="top">
              <img :src="captchaSrc" @click="getCaptchaSrc"/>
            </Tooltip>
          </div>
        </div>
      </Form-item>
    </Form>
    <Button type="primary"
            @click="resetPassword"
            class="btn" long
            :loading="btnLoading">Reset Password
    </Button>
    </template>

    <template v-else>
      <Alert type="success">Your password has been reset.</Alert>
    </template>
  </Panel>
</template>

<script>
  import {FormMixin} from '@oj/components/mixins'
  import api from '@oj/api'

  export default {
    name: 'reset-password',
    mixins: [FormMixin],
    data () {
      const CheckPassword = (rule, value, callback) => {
        if (this.formResetPassword.passwdCheck !== '') {
          // 对第二个密码框再次验证
          this.$refs.formResetPassword.validateField('passwordAgain')
        }
        callback()
      }

      const CheckAgainPassword = (rule, value, callback) => {
        if (value !== this.formResetPassword.password) {
          callback(new Error('password does not match'))
        }
        callback()
      }
      return {
        btnLoading: false,
        captchaSrc: '',
        resetSuccess: false,
        formResetPassword: {
          captcha: '',
          password: '',
          passwordAgain: '',
          token: ''
        },
        ruleResetPassword: {
          password: [
            {required: true, trigger: 'blur', min: 6, max: 20},
            {validator: CheckPassword, trigger: 'blur'}
          ],
          passwordAgain: [
            {required: true, validator: CheckAgainPassword, trigger: 'change'}
          ],
          captcha: [
            {required: true, trigger: 'blur', min: 1, max: 10}
          ]
        }
      }
    },
    mounted () {
      this.formResetPassword.token = this.$route.params.token
      this.getCaptchaSrc()
    },
    methods: {
      resetPassword () {
        this.validateForm('formResetPassword').then(valid => {
          this.btnLoading = true
          let data = Object.assign({}, this.formResetPassword)
          delete data.passwordAgain
          api.resetPassword(data).then(res => {
            this.btnLoading = false
            this.resetSuccess = true
          }, _ => {
            this.btnLoading = false
            this.formResetPassword.captcha = ''
            this.getCaptchaSrc()
          })
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    width: 450px;
    margin: auto;
    .center {
      text-align: center;
    }
    #captcha {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      width: 100%;
      height: 36px;
      #captchaCode {
        flex: auto;
      }
      #captchaImg {
        margin-left: 10px;
        padding: 3px;
        flex: initial;
      }
    }
    .btn {
      margin-top: 18px;
      text-align: center;
    }
  }
</style>
