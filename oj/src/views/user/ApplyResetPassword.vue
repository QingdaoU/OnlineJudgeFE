<template>
  <Panel :padding="30" class="container">
    <div slot="title" class="center">Lost Password</div>
    <template v-if="!successApply">
      <Form :rules="ruleResetPassword" :model=formResetPassword ref="formResetPassword">
        <Form-item prop="email">
          <Input v-model="formResetPassword.email" placeholder="Your Email Address" size="large">
          <Icon type="ios-email-outline" slot="prepend"></Icon>
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
              @click="sendEmail"
              class="btn" long
              :loading="btnLoading">Send Password Reset Email
      </Button>
    </template>
    <template v-else>
      <Alert type="success" show-icon>
        Success
        <span slot="desc">Password reset mail has been sent to your email.</span>
      </Alert>
    </template>
  </Panel>
</template>
<script>
  import api from '@/api'
  import {FormMixin} from '~/mixins'

  export default {
    mixins: [FormMixin],
    data() {
      const validateEmail = (rule, value, callback) => {
        if (value !== '') {
          api.checkUsernameOrEmail(undefined, value).then(res => {
            if (res.data.data.email === false) {
              callback(new Error('This email doesn\'t exist'))
            } else {
              callback()
            }
          }, _ => callback())
        } else {
          callback()
        }
      }
      return {
        captchaSrc: '',
        successApply: false,
        btnLoading: false,
        formResetPassword: {
          email: '',
          captcha: ''
        },
        ruleResetPassword: {
          email: [
            {required: true, type: 'email', trigger: 'blur'},
            {validator: validateEmail, trigger: 'blur'}
          ],
          captcha: [
            {required: true, trigger: 'blur', min: 1, max: 10}
          ]
        }
      }
    },
    mounted() {
      this.getCaptchaSrc()
    },
    methods: {
      sendEmail() {
        this.validateForm('formResetPassword').then(() => {
          this.btnLoading = true
          api.apply_reset_password(this.formResetPassword).then(res => {
            // 伪加载
            setTimeout(() => {
              this.btnLoading = false
              this.successApply = true
            }, 2000)
          }, _ => {
            this.btnLoading = false
            this.formResetPassword.captcha = ''
            this.getCaptchaSrc()
          })
        }, _ => {
        })
      }
    }
  }
</script>

<style scoped lang="less">
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
