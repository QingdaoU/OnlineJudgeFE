<template>
  <Modal :value="visible" @on-cancel="handleUpdateProp('update:visible', false)" :width="400" className="modal">
    <div slot="header">
      <span class="title">Welcome to OJ</span>
    </div>
    <template v-if="mode === 'login'">
      <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
        <FormItem prop="username">
          <Input type="text" v-model="formLogin.username" placeholder="Username" size="large">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formLogin.password" placeholder="Password" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="tfa_code" v-if="tfaRequired">
          <Input v-model="formLogin.tfa_code" placeholder="Code from your TFA app">
          <Icon type="ios-lightbulb-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
    </template>
    <template v-else>
      <Form v-if="mode === 'register'" ref="formRegister" :model="formRegister" :rules="ruleRegister">
        <FormItem prop="username">
          <Input type="text" v-model="formRegister.username" placeholder="Username" size="large">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="email">
          <Input v-model="formRegister.email" placeholder="Email Address" size="large">
          <Icon type="ios-email-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formRegister.password" placeholder="Password" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="passwordAgain">
          <Input type="password" v-model="formRegister.passwordAgain" placeholder="Password Again" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="captcha" style="margin-bottom:10px">
          <div class="oj-captcha">
            <div class="oj-captcha-code">
              <Input v-model="formRegister.captcha" placeholder="Captcha" size="large">
              <Icon type="ios-lightbulb-outline" slot="prepend"></Icon>
              </Input>
            </div>
            <div class="oj-captcha-img">
              <Tooltip content="Click to refresh" placement="top">
                <img :src="captchaSrc" @click="getCaptchaSrc"/>
              </Tooltip>
            </div>
          </div>
        </FormItem>
      </Form>
    </template>
    <div slot="footer" class="footer">
      <template v-if="mode === 'login'">
        <Button
          type="primary"
          @click="handleLogin()"
          class="btn" long
          :loading="btnLoginLoading">
          Login
        </Button>
        <a @click.stop="handleUpdateProp('update:mode', 'register')">No account? Register now!</a>
        <a @click.stop="goResetPassword" style="float: right">Forget Password</a>
      </template>
      <template v-else>
        <Button
          type="primary"
          @click="handleRegister()"
          class="btn" long
          :loading="btnRegisterLoading">
          Register
        </Button>
        <Button
          type="ghost"
          @click="handleUpdateProp('update:mode', 'login')"
          class="btn" long>
          Already registed? Login now!
        </Button>
      </template>
    </div>
  </Modal>
</template>

<script>
  import api from '@/api'
  import auth from '@/utils/auth'
  import {FormMixin} from '~/mixins'

  export default {
    mixins: [FormMixin],
    props: {
      visible: {
        required: true,
        type: Boolean,
        default: true
      },
      mode: {
        required: true,
        type: String,
        // login or register
        default: 'login'
      }
    },
    data() {
      const CheckUsernameNotExist = (rule, value, callback) => {
        api.checkUsernameOrEmail(value, undefined).then(res => {
          if (res.data.data.username === true) {
            callback(new Error('The username already exists.'))
          } else {
            callback()
          }
        }, _ => callback())
      }
      const CheckEmailNotExist = (rule, value, callback) => {
        api.checkUsernameOrEmail(undefined, value).then(res => {
          if (res.data.data.email === true) {
            callback(new Error('The email already exist'))
          } else {
            callback()
          }
        }, _ => callback())
      }
      const CheckPassword = (rule, value, callback) => {
        if (this.formRegister.password !== '') {
          // 对第二个密码框再次验证
          this.$refs.formRegister.validateField('passwordAgain')
        }
        callback()
      }

      const CheckAgainPassword = (rule, value, callback) => {
        if (value !== this.formRegister.password) {
          callback(new Error('password does not match'))
        }
        callback()
      }

      const CheckRequiredTFA = (rule, value, callback) => {
        api.tfaRequiredCheck(value).then(res => {
          this.tfaRequired = res.data.data.result
        })
        callback()
      }

      return {
        captchaSrc: '',
        tfaRequired: false,
        btnRegisterLoading: false,
        btnLoginLoading: false,
        formRegister: {
          username: '',
          password: '',
          passwordAgain: '',
          email: '',
          captcha: ''
        },
        formLogin: {
          username: '',
          password: '',
          tfa_code: ''
        },
        ruleRegister: {
          username: [
            {required: true, trigger: 'blur'},
            {validator: CheckUsernameNotExist, trigger: 'blur'}
          ],
          email: [
            {required: true, type: 'email', trigger: 'blur'},
            {validator: CheckEmailNotExist, trigger: 'blur'}
          ],
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
        },
        ruleLogin: {
          username: [
            {required: true, trigger: 'blur'},
            {validator: CheckRequiredTFA, trigger: 'blur'}
          ],
          password: [
            {required: true, trigger: 'change', min: 6, max: 20}
          ]
        }
      }
    },
    methods: {
      handleUpdateProp(eventName, value) {
        this.$emit(eventName, value)
      },
      handleRegister() {
        this.validateForm('formRegister').then(valid => {
          let formData = Object.assign({}, this.formRegister)
          delete formData['passwordAgain']
          this.btnRegisterLoading = true
          api.register(formData).then(res => {
            this.$success('Register successed, go to login')
            this.handleUpdateProp('update:mode', 'login')
            this.btnRegisterLoading = false
          }, _ => {
            this.getCaptchaSrc()
            this.formRegister.captcha = ''
            this.btnRegisterLoading = false
          })
        })
      },
      handleLogin() {
        this.validateForm('formLogin').then(valid => {
          this.btnLoginLoading = true
          let formData = Object.assign({}, this.formLogin)
          if (!this.tfaRequired) {
            delete formData['tfa_code']
          }
          api.login(formData).then(res => {
            this.btnLoginLoading = false
            api.getUserInfo().then(res => {
              auth.setUser(res.data.data)
              this.$bus.$emit('login-success', res.data.data)
              this.$success('Welcome back to OJ')
              this.handleUpdateProp('update:visible', false)
            })
          }, _ => {
            this.btnLoginLoading = false
          })
        })
      },
      goResetPassword() {
        this.handleUpdateProp('update:visible', false)
        this.$router.push({name: 'apply-reset-password'})
      }
    },
    watch: {
      'mode'(newVal) {
        if (newVal === 'login') {
          this.$nextTick(() => {
            this.$refs['formLogin'].resetFields()
          })
        } else {
          this.$nextTick(() => {
            this.$refs['formRegister'].resetFields()
          })
        }
      },
      'visible'(newVal) {
        if (newVal === true && this.mode === 'register') {
          this.getCaptchaSrc()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .title {
    font-size: 18px;
    font-weight: 600;
  }

  .footer {
    margin: 0;
    text-align: left;
    .btn {
      margin: 0 0 15px 0;
      &:last-child {
        margin: 0;
      }
    }
  }
</style>
