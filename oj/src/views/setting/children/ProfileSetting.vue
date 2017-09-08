<template>
  <div>
    <panel :padding="0" :bordered="false" dis-hover>
      <div slot="title">Profile Settings</div>
      <div slot="extra">
        <Button type="primary" @click="updateProfile">Save All</Button>
      </div>
      <Form ref="formProfile" :model="formProfile">
        <Row type="flex" :gutter="30" justify="space-around">
          <Col :span="10">
          <FormItem label="Real Name">
            <Input v-model="formProfile.real_name"/>
          </FormItem>
          <Form-item label="Phone">
            <Input v-model="formProfile.phone_number"/>
          </Form-item>
          <Form-item label="Mood">
            <Input v-model="formProfile.mood"/>
          </Form-item>
          </Col>

          <Col :span="10">
          <Form-item label="Major">
            <Input v-model="formProfile.major" />
          </Form-item>
          <Form-item label="Blog">
            <Input v-model="formProfile.blog"/>
          </Form-item>
          <Form-item label="Language">
            <Input v-model="formProfile.language"/>
          </Form-item>
          </Col>
        </Row>
      </Form>
    </panel>
  </div>
</template>

<script>
  import api from '@/api.js'
  import auth from '@/utils/auth'

  export default {
    data() {
      return {
        formProfile: {
          real_name: '',
          mood: '',
          major: '',
          blog: '',
          phone_number: '',
          language: ''
        }
      }
    },
    mounted() {
      this.getProfile()
    },
    methods: {
      getProfile() {
        if (!auth.isAuthicated()) {
          this.$error('please login first.')
        } else {
          let profile = auth.getUser()
          Object.keys(this.formProfile).forEach(element => {
            this.formProfile[element] = profile[element]
          })
        }
      },
      updateProfile() {
        api.updateProfile(this.formProfile).then(res => {
          this.$success('Success')
          auth.setUser(res.data.data)
        })
      }
    }
  }
</script>


<style lang="css">

</style>
