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
      <h2>修改头像</h2>
      <p>修改个人资料信息</p>
      <div>
        <el-form label-position="top" ref="form" :model="form" label-width="80px">
          <el-upload class="avatar-uploader" name="file" action="/api/account/avatar/upload" :show-file-list="false" :with-credentials="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
      imageUrl: '',
      form: {
        avatar: ''
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
        this.form.avatar = res.data.data.avatar
      })
    },
    onSubmit() {
      console.log('submit!')
      console.log(this.form)
      api.editAvatarSetting(this.form.avatar).then(function(res) {
        console.log(res)
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = window.URL.createObjectURL(file.raw)
      this.form.avatar = res.data.path
    },
    beforeAvatarUpload(file) {
      // const isPic = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isPic = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].indexOf(file.type) >= 0
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isPic) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPic && isLt2M
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
