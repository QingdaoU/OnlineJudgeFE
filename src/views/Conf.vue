<template>
  <div class="view">
    <Panel title="SMTP Config">
      <el-form label-position="left" label-width="70px" :model="smtp">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Server">
              <el-input v-model="smtp.server" placeholder="SMTP Server address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Port">
              <el-input type="number" v-model="smtp.port" placeholder="SMTP Server Port"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email">
              <el-input type="email" v-model="smtp.email" placeholder="Account used to send email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Password">
              <el-input v-model="smtp.password" type="password" placeholder="SMTP Server Password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="TLS">
              <el-switch on-text="" off-text="" v-model="smtp.tls"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="saveSMTPConfig">Save</el-button>
    </Panel>

    <Panel title="Website Config">
      <el-form label-position="left" label-width="100px" ref="form" :model="websiteConfig">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Base URL">
              <el-input v-model="websiteConfig.baseURL" placeholder="Website Base Url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Name">
              <el-input v-model="websiteConfig.name" placeholder="Website Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Name Shortcut">
              <el-input v-model="websiteConfig.nameShortcut" placeholder="Website Name Shortcut"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Footer">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="websiteConfig.footer"
                        placeholder="Website Footer HTML"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="Allow Register" label-width="200px">
                <el-switch on-text="" off-text="" v-model="websiteConfig.allowRegister"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Submission List Show All" label-width="200px">
                <el-switch on-text="" off-text="" v-model="websiteConfig.submissionListShowAll"></el-switch>
              </el-form-item>
            </el-col>
            </el-col>
      </el-form>
      <el-button type="primary" @click="updateWebsiteConfig">Save</el-button>
    </Panel>
  </div>
</template>

<script>
  import api from '../api.js'
  import Panel from '../components/Panel.vue'
  export default{
    components: {
      Panel
    },
    data () {
      return {
        init: false,
        smtp: {
          server: '',
          port: 25,
          password: '',
          email: '',
          tls: false
        },
        websiteConfig: {
          baseURL: '',
          name: '',
          nameShortcut: '',
          footer: '',
          allowRegister: false,
          submissionListShowAll: false
        }
      }
    },
    mounted () {
      api.getSMTPConfig().then(res => {
        if (res.data.data) {
          this.smtp = res.data.data
        } else {
          this.init = true
          window.alert('SMTP not configured')
        }
      })
      api.getWebsiteConfig().then(res => {
        let data = res.data.data
        this.websiteConfig.baseURL = data.base_url
        this.websiteConfig.name = data.name
        this.websiteConfig.nameShortcut = data.name_shortcut
        this.websiteConfig.footer = data.footer
        this.websiteConfig.allowRegister = data.allow_register
        this.websiteConfig.submissionListShowAll = data.submission_list_show_all
      })
    },
    methods: {
      saveSMTPConfig () {
        if (!this.init) {
          api.updateSMTPConfig(this.smtp).then(res => {
            window.success()
          })
        } else {
          api.createSMTPConfig(this.smtp).then(res => {
            window.success()
          })
        }
      },
      updateWebsiteConfig () {
        let config = this.websiteConfig
        let data = {base_url: config.baseURL,
          name: config.name,
          name_shortcut: config.nameShortcut,
          footer: config.footer,
          allow_register: config.allowRegister,
          submission_list_show_all: config.submissionListShowAll
        }
        api.updateWebsiteConfig(data).then(res => {
          window.success()
        })
      }
    }
  }
</script>
