<template>
  <Modal :value="visible" @on-cancel="$emit('update:visible', false)" :width="500">
    <div slot="header">
      <span>Welcome to register!</span>
    </div>
    <Form ref="formRegister" :model="formRegister" :rules="ruleRegister">
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
      <Form-item prop="captcha">
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
    <div slot="footer">
      <Button type="ghost" @click="handleReset('formRegister')">reset</Button>
      <Button type="primary" @click="handleSubmit('formRegister')">submit</Button>
    </div>
  </Modal>
</template>

<script>
  import api from '@/api'

  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value !== '') {
          api.checkUsernameOrEmail(value, undefined).then(res => {
            if (res.data.data.username === false) {
              callback(new Error('username already exists.'))
            } else {
              callback()
            }
          }, _ => {})
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
          }, _ => {})
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
        } else {
          callback()
        }
      }

      return {
        captchaSrc: '',
        formRegister: {
          username: 'zemal',
          password: '123555',
          passwordAgain: '123555',
          email: '213@zemal.com',
          captcha: ''
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
        }
      }
    },
    props: {
      visible: {
        required: true,
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.$error('please validate the error fields')
          } else {
            let formData = Object.assign({}, this.formRegister)
            delete formData['passwordAgain']
            api.register(formData).then(res => {
              console.log(res.data.data)
            }, res => {
              console.log(res)
            })
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },
      getCaptchaSrc() {
        api.getCaptcha().then(res => {
          console.log(res.data.data)
          this.captchaSrc = res.data.data
        })
      }
    },
    mounted() {
      this.getCaptchaSrc()
    }
  }
</script>

<style scoped lang="less">
  #captcha {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    #captchaCode {
      flex: auto;
    }
    #captchaImg {
      margin-left: 10px;
      padding: 3px;
      flex: initial;
    }
  }
</style>
