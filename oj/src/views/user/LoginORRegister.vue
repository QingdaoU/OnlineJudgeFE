<template>
  <Modal :value="visible" @on-cancel="handleUpdateProp('update:visible', false)" :width="350">
    <div slot="header">
      <span class="title">Welcome to OJ</span>
    </div>
    <template v-if="mode === 'login'">
      <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
        <Form-item prop="uname">
          <Input type="text" v-model="formLogin.uname" placeholder="Username" size="large">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="passwd" style="margin-bottom: 10px">
          <Input type="password" v-model="formLogin.passwd" placeholder="Password" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
      </Form>
    </template>
    <template v-else>
      <Form v-if="mode === 'register'" ref="formRegister" :model="formRegister" :rules="ruleRegister">
        <Form-item prop="username">
          <Input type="text" v-model="formRegister.username" placeholder="Username" size="large">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="email">
          <Input v-model="formRegister.email" placeholder="Email Address" size="large">
          <Icon type="ios-email-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password" v-model="formRegister.password" placeholder="Password" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="passwordAgain">
          <Input type="password" v-model="formRegister.passwordAgain" placeholder="Password Again" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="captcha" style="margin-bottom:10px">
          <div id="captcha">
            <div id="captchaCode">
              <Input v-model="formRegister.captcha" placeholder="Capacha" size="large">
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
    </template>
    <div slot="footer" class="footer">
      <template v-if="mode === 'login'">
        <Button type="primary" @click="handleLogin()" class="btn" long>Login</Button>
        <a @click.stop="handleUpdateProp('update:mode', 'register')">No account? Register now!</a>
      </template>
      <template v-else>
        <Button type="primary" @click="handleRegister()" class="btn" long>Register Now</Button>
        <a @click.stop="handleUpdateProp('update:mode', 'login')">Already registed? Login now!</a>
      </template>
    </div>
  </Modal>
</template>

<script>
  import api from '@/api'
  import auth from '@/utils/auth'

  export default {
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
      const validateUsername = (rule, value, callback) => {
        if (value !== '') {
          api.checkUsernameOrEmail(value, undefined).then(res => {
            if (res.data.data.username === false) {
              callback(new Error('username already exists.'))
            } else {
              callback()
            }
          }, _ => callback())
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if (value !== '') {
          api.checkUsernameOrEmail(undefined, value).then(res => {
            if (res.data.data.email === false) {
              callback(new Error('email already exists'))
            } else {
              callback()
            }
          }, _ => callback())
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (this.formRegister.passwdCheck !== '') {
          // 对第二个密码框再次验证
          this.$refs.formRegister.validateField('passwordAgain')
        }
        callback()
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value !== this.formRegister.password) {
          callback(new Error('password does not match'))
        }
        callback()
      }

      return {
        captchaSrc: '',
        formRegister: {
          username: '',
          password: '',
          passwordAgain: '',
          email: '',
          captcha: ''
        },
        formLogin: {
          uname: '',
          passwd: ''
        },
        ruleRegister: {
          username: [
            {required: true, trigger: 'blur'},
            {validator: validateUsername, trigger: 'blur'}
          ],
          email: [
            {required: true, type: 'email', trigger: 'blur'},
            {validator: validateEmail, trigger: 'blur'}
          ],
          password: [
            {required: true, trigger: 'blur', min: 6, max: 20},
            {validator: validatePass, trigger: 'blur'}
          ],
          passwordAgain: [
            {required: true, validator: validatePassCheck, trigger: 'change'}
          ],
          captcha: [
            {required: true, trigger: 'blur', min: 1, max: 10}
          ]
        },
        ruleLogin: {
          uname: [
            {required: true, trigger: 'blur', message: 'username is required'}
          ],
          passwd: [
            {required: true, trigger: 'change', min: 6, max: 20, message: 'password is required'}
          ]
        }
      }
    },
    methods: {
      validateForm(formName) {
        let isValid = false
        this.$refs[formName].validate(valid => {
          if (!valid) {
            this.$error('please validate the error fields')
          }
          isValid = valid
        })
        return isValid
      },
      handleRegister() {
        if (this.validateForm('formRegister')) {
          let formData = Object.assign({}, this.formRegister)
          delete formData['passwordAgain']
          api.register(formData).then(res => {
            this.$success('Register successed, go to login')
            this.handleUpdateProp('update:mode', 'login')
          }, _ => {
            this.getCaptchaSrc()
            this.formRegister.captcha = ''
          })
        }
      },
      handleLogin() {
        if (this.validateForm('formLogin')) {
          api.login(this.formLogin.uname, this.formLogin.passwd).then(res => {
            api.getUserInfo().then(res => {
              auth.setUser(res.data.data)
              this.$bus.$emit('login-success', res.data.data)
              this.$success('Welcome back to OJ')
              this.handleUpdateProp('update:visible', false)
            })
          }, _ => {
          })
        }
      },
      handleUpdateProp(eventName, value) {
        this.$emit(eventName, value)
      },
      getCaptchaSrc() {
        api.getCaptcha().then(res => {
          this.captchaSrc = res.data.data
        })
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
        if (newVal === true) {
          this.getCaptchaSrc()
        }
      }
    }
  }
</script>

<style scoped lang="less">
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

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .footer {
    text-align: center;
    margin: 0;
    .btn {
      margin: 0 0 10px 0;
    }
  }
</style>
