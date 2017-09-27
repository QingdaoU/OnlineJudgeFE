<template>
  <div class="setting-main">
    <div class="flex-container">
      <div class="left">
        <p class="section-title">Change Password</p>
        <Form class="setting-content" ref="formPassword" :model="formPassword" :rules="rulePassword">
          <FormItem label="Old password" prop="old_password">
            <Input v-model="formPassword.old_password" type="password"/>
          </FormItem>
          <FormItem label="New password" prop="new_password">
            <Input v-model="formPassword.new_password" type="password"/>
          </FormItem>
          <FormItem label="Confirm new password" prop="again_password">
            <Input v-model="formPassword.again_password" type="password"/>
          </FormItem>
          <FormItem v-if="visible.passwordAlert">
            <Alert type="success">Password successfully updated, you have to login again after 3 seconds..</Alert>
          </FormItem>
          <Button type="primary" @click="changePassword">Update password</Button>
        </Form>
      </div>

      <div class="middle separator"></div>

      <div class="right">
        <p class="section-title">Change Email</p>
        <Form class="setting-content" ref="formEmail" :model="formEmail">
          <FormItem label="Current password">
            <Input v-model="formEmail.password"/>
          </FormItem>
          <FormItem label="Old Email">
            <Input v-model="formEmail.old_email" disabled/>
          </FormItem>
          <FormItem label="New Email">
            <Input v-model="formEmail.new_email"/>
          </FormItem>
          <Button type="primary">Change Email</Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api.js'
  import {FormMixin} from '~/mixins'

  export default {
    mixins: [FormMixin],
    data () {
      const CheckAgainPassword = (rule, value, callback) => {
        if (value !== this.formPassword.new_password) {
          callback(new Error('password does not match'))
        }
        callback()
      }
      const CheckNewPassword = (rule, value, callback) => {
        if (this.formPassword.old_password !== '') {
          if (this.formPassword.old_password === this.formPassword.new_password) {
            callback(new Error('The new password doesn\'t change'))
          } else {
            // 对第二个密码框再次验证
            this.$refs.formPassword.validateField('again_password')
          }
        }
        callback()
      }
      return {
        qrcodeSrc: '',
        loading: {
          btnPassword: false,
          btnEmail: false
        },
        visible: {
          passwordAlert: false,
          emailAlert: false
        },
        formPassword: {
          old_password: '',
          new_password: '',
          again_password: ''
        },
        formEmail: {
          password: '',
          old_email: '',
          new_email: ''
        },
        rulePassword: {
          old_password: [
            {required: true, trigger: 'blur', min: 6, max: 20}
          ],
          new_password: [
            {required: true, trigger: 'blur', min: 6, max: 20},
            {validator: CheckNewPassword, trigger: 'blur'}
          ],
          again_password: [
            {required: true, validator: CheckAgainPassword, trigger: 'change'}
          ]
        },
        ruleEmail: {}
      }
    },
    mounted () {
      this.formEmail.old_email = this.$store.getters.user.email || ''
    },
    methods: {
      changePassword () {
        this.validateForm('formPassword').then(valid => {
          this.loading.btnPassword = true
          let data = Object.assign({}, this.formPassword)
          delete data.again_password
          api.changePassword(data).then(res => {
            this.loading.btnPassword = false
            this.visible.passwordAlert = true
            setTimeout(() => {
              this.visible.passwordAlert = false
              this.$router.push({name: 'logout'})
            }, 3000)
          }, _ => {
            this.loading.btnPassword = false
          })
        })
      },
      changeEmail () {
        this.btnEmailLoading = true
        // todo
      }
    }
  }
</script>

<style lang="less" scoped>

  .flex-container {
    justify-content: flex-start;
    .left {
      flex: 1 0;
      width: 250px;
      padding-right: 5%;
    }
    >.middle {
      flex: none;
    }
    .right {
      flex: 1 0;
      width: 250px;
    }
  }
</style>

