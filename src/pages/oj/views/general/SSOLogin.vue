<template>
  <Panel>
  </Panel>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '@oj/api'

  export default {
    name: 'SSOLogin',
    data () {
      return {
        'callback': ''
      }
    },
    mounted () {
      this.login()
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      login () {
        const callback = this.$route.query.callback
        if (!callback) {
          this.$error('Invalid callback')
          return
        }
        this.callback = callback
        api.getSSOLoginToken().then(res => {
          this.$Modal.confirm({
            title: 'SSO Login',
            content: `Login to ${this.callback}?`,
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: () => {
              window.open(`${this.callback}?token=${res.data.data.token}`)
            },
            onCancel: () => {
              this.$info('Cancelled')
            }
          })
        })
      }
    },
    watch: {
      'isAuthenticated' (newVal) {
        if (newVal === true) {
          this.login()
        }
      }
    }
  }
</script>
