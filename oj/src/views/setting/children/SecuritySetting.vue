<template>
  <div>
    <p class="section-title">Two Factor Authentication</p>
    <div class="mini-container">
      <Form class="setting-main">
        <Alert v-if="alreadyAuthed"
               type="success"
               class="notice"
               showIcon>You have enabled two-factor authentication.
        </Alert>
        <Alert v-else class="notice">
          Two-factor authentication adds an extra layer of security to your account.
        </Alert>
        <FormItem v-if="!alreadyAuthed">
          <div class="oj-relative">
            <img :src="qrcodeSrc" id="qr-img">
            <Spin size="large" fix v-if="loadingQRcode"></Spin>
          </div>
        </FormItem>
        <template v-if="!loadingQRcode">
          <FormItem style="width: 250px">
            <Input v-model="formTwoFactor.code" placeholder="Enter the code from your application"/>
          </FormItem>
          <Button type="primary"
                  :loading="loadingBtn"
                  @click="updateTFA(false)"
                  v-if="!alreadyAuthed">Open TFA
          </Button>
          <Button type="error"
                  :loading="loadingBtn"
                  @click="closeTFA"
                  v-else>Close TFA
          </Button>
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {SettingMixin} from '~/mixins'

  export default {
    mixins: [SettingMixin],
    data() {
      return {
        qrcodeSrc: '',
        loadingQRcode: false,
        loadingBtn: false,
        formTwoFactor: {
          code: ''
        }
      }
    },
    mounted() {
      this.loadProfile()
      if (this.profile.user && !this.profile.user.two_factor_auth) {
        this.getAuthImg()
      }
    },
    methods: {
      getAuthImg() {
        this.loadingQRcode = true
        api.twoFactorAuth('get').then(res => {
          this.loadingQRcode = false
          this.qrcodeSrc = res.data.data
        })
      },
      closeTFA() {
        this.$Modal.confirm({
          title: 'Confirm',
          content: 'Two-factor Authentication is a powerful tool to protect your account, are you sure to close it?',
          onOk: () => {
            this.updateTFA(true)
          }
        })
      },
      updateTFA(close) {
        let method = close === false ? 'post' : 'put'
        this.loadingBtn = true
        api.twoFactorAuth(method, this.formTwoFactor).then(res => {
          this.loadingBtn = false
          this.getProfile()
          if (close === true) {
            this.getAuthImg()
            this.formTwoFactor.code = ''
          }
          this.formTwoFactor.code = ''
        }, _ => {
          this.formTwoFactor.code = ''
          this.loadingBtn = false
        })
      }
    },
    computed: {
      alreadyAuthed() {
        return this.profile.user && this.profile.user.two_factor_auth
      }
    }
  }
</script>

<style lang="less" scoped>
  .mini-container {
    width: 500px;
    .notice {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .oj-relative {
      width: 150px;
      #qr-img {
        width: 300px;
        margin-left: -20px;
        margin-bottom: -20px;
      }
    }
  }
</style>
