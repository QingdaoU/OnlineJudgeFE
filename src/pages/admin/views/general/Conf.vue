<template>
  <div class="view">
    <Panel title="SMTP Config">
      <el-form label-position="left" label-width="70px" :model="smtp">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Server" required>
              <el-input v-model="smtp.server" placeholder="SMTP Server Address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Port" required>
              <el-input type="number" v-model="smtp.port" placeholder="SMTP Server Port"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email" required>
              <el-input type="email" v-model="smtp.email" placeholder="Account Used To Send Email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Password" label-width="90px" required>
              <el-input v-model="smtp.password" type="password" placeholder="SMTP Server Password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="TLS">
              <el-switch
                v-model="smtp.tls"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="saveSMTPConfig">Save</el-button>
      <el-button type="warning" @click="testSMTPConfig"
                 v-if="saved" :loading="loadingBtnTest">Send Test Email</el-button>
    </Panel>

    <Panel title="Website Config">
      <el-form label-position="left" label-width="100px" ref="form" :model="websiteConfig">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Base Url" required>
              <el-input v-model="websiteConfig.website_base_url" placeholder="Website Base Url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Name" required>
              <el-input v-model="websiteConfig.website_name" placeholder="Website Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Shortcut" required>
              <el-input v-model="websiteConfig.website_name_shortcut" placeholder="Website Name Shortcut"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Footer" required>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="websiteConfig.website_footer"
                        placeholder="Website Footer HTML"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="Allow Register" label-width="200px">
                <el-switch
                  v-model="websiteConfig.allow_register"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Submission List Show All" label-width="200px">
                <el-switch
                  v-model="websiteConfig.submission_list_show_all"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <save @click.native="saveWebsiteConfig"></save>
    </Panel>
  </div>
</template>

<script>
  import api from '../../api.js'

  export default {
    name: 'Conf',
    data () {
      return {
        init: false,
        saved: false,
        loadingBtnTest: false,
        smtp: {
          server: 'smtp.example.com',
          port: 25,
          password: '',
          email: 'email@example.com',
          tls: true
        },
        websiteConfig: {}
      }
    },
    mounted () {
      api.getSMTPConfig().then(res => {
        if (res.data.data) {
          this.smtp = res.data.data
        } else {
          this.init = true
          this.$warning('Please setup SMTP config at first')
        }
      })
      api.getWebsiteConfig().then(res => {
        this.websiteConfig = res.data.data
      }).catch(() => {
      })
    },
    methods: {
      saveSMTPConfig () {
        if (!this.init) {
          api.editSMTPConfig(this.smtp).then(() => {
            this.saved = true
          }, () => {
          })
        } else {
          api.createSMTPConfig(this.smtp).then(() => {
            this.saved = true
          }, () => {
          })
        }
      },
      testSMTPConfig () {
        this.$prompt('Please input your email', '', {
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: 'Error email format'
        }).then(({value}) => {
          this.loadingBtnTest = true
          api.testSMTPConfig(value).then(() => {
            this.loadingBtnTest = false
          }, () => {
            this.loadingBtnTest = false
          })
        }).catch(() => {
        })
      },
      saveWebsiteConfig () {
        api.editWebsiteConfig(this.websiteConfig).then(() => {
        }).catch(() => {
        })
      }
    }
  }
</script>
