<template>
<el-row :gutter="20" class="container">
  <el-col :span="3">
    <div class="grid-content bg-purple-light"></div>
  </el-col>
  <el-col :span="4" class="side-nav">
    <SettingSideMenu></SettingSideMenu>
  </el-col>
  <el-col :span="14">
    <section class="content">
      <h2>个人信息</h2>
      <p>修改个人资料信息</p>
      <div>
        <el-form label-position="top" ref="form" :model="form" label-width="80px">
          <el-form-item label="Mood">
            <el-input v-model="form.mood"></el-input>
          </el-form-item>
          <el-form-item label="Blog">
            <el-input v-model="form.blog"></el-input>
          </el-form-item>
          <el-form-item label="School">
            <el-input v-model="form.school"></el-input>
          </el-form-item>
          <el-form-item label="Student ID">
            <el-input v-model="form.student_id"></el-input>
          </el-form-item>
          <el-form-item label="Major">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="form.phone_number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </el-col>
  <el-col :span="3">
    <div class="grid-content bg-purple-light"></div>
  </el-col>
</el-row>
</template>

<script>
import api from '../../api.js'
import SettingSideMenu from '../../components/SettingSideMenu.vue'

export default {
  data() {
    return {
      form: {
        mood: '',
        blog: '',
        school: '',
        student_id: '',
        phone_number: '',
        major: ''
      }
    }
  },
  components: {
    SettingSideMenu
  },
  mounted() {
    this.getMyInfo()
  },
  methods: {
    getMyInfo() {
      api.getMyInfo().then(res => {
        console.log(res.data.data)
        this.form = res.data.data
      })
    },
    onSubmit() {
      console.log('submit!')
      console.log(this.form)
      api.editProfileSetting(this.form).then(function(res) {
        console.log(res)
      })
    }
  }

}
</script>


<style lang="css">
  .container {
    margin-top: 30px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 636px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
