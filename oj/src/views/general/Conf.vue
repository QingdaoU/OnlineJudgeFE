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
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <save @click.native="saveSMTPConfig"></save>
    </Panel>

    <Panel title="Website Config">
      <el-form label-position="left" label-width="100px" ref="form" :model="websiteConfig">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Base Url" required>
              <el-input v-model="websiteConfig.base_url" placeholder="Website Base Url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Name" required>
              <el-input v-model="websiteConfig.name" placeholder="Website Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Shortcut" required>
              <el-input v-model="websiteConfig.name_shortcut" placeholder="Website Name Shortcut"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Footer" required>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="websiteConfig.footer"
                        placeholder="Website Footer HTML"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="Allow Register" label-width="200px">
                <el-switch
                  v-model="websiteConfig.allow_register"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Submission List Show All" label-width="200px">
                <el-switch
                  v-model="websiteConfig.submission_list_show_all"
                  on-color="#13ce66"
                  off-color="#ff4949">
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

  export default{
    name: 'Conf',
    data () {
      return {
        init: false,
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
          this.$alert('Please setup SMTP config at first')
        }
      })
      api.getWebsiteConfig().then(res => {
        this.websiteConfig = res.data.data
      }).catch(() => {})
    },
    methods: {
      saveSMTPConfig () {
        if (!this.init) {
          api.editSMTPConfig(this.smtp)
        } else {
          api.createSMTPConfig(this.smtp)
        }
      },
      saveWebsiteConfig () {
        api.editWebsiteConfig(this.websiteConfig).then(() => {}).catch(() => {})
      }
    }
  }
</script>
