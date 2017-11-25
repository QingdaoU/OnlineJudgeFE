<template>
  <el-menu class="vertical_menu"
           :router="true" :default-active="currentPath">
    <div class="logo">
      <img src="../../../assets/logo.svg" alt="oj admin"/>
    </div>
    <el-submenu v-if="isSuperUser" index="general">
      <template slot="title"><i class="el-icon-menu"></i>General</template>
      <el-menu-item index="/user">User</el-menu-item>
      <el-menu-item index="/announcement">Announcement</el-menu-item>
      <el-menu-item index="/conf">System Config</el-menu-item>
      <el-menu-item index="/judge-server">Judge Server</el-menu-item>
    </el-submenu>
    <el-submenu index="problem">
      <template slot="title"><i class="el-icon-fa-bars"></i>Problem</template>
      <el-menu-item index="/problems">Problem List</el-menu-item>
      <el-menu-item index="/problem/create">Create Problem</el-menu-item>
    </el-submenu>
    <el-submenu index="contest">
      <template slot="title"><i class="el-icon-fa-trophy"></i>Contest</template>
      <el-menu-item index="/contest">Contest List</el-menu-item>
      <el-menu-item index="/contest/create">Create Contest</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import { USER_TYPE } from '@/utils/constants'

  export default {
    name: 'SideMenu',
    props: {
      user: {
        type: Object,
        required: true
      },
      collapse: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentPath: ''
      }
    },
    mounted () {
      this.currentPath = this.$route.path
    },
    computed: {
      isSuperUser () {
        return this.user.admin_type === USER_TYPE.SUPER_ADMIN
      }
    }
  }
</script>

<style scoped lang="less">
  .vertical_menu {
    overflow: auto;
    width: 200px;
    height: 100%;
    position: fixed !important;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    .logo {
      margin: 20px 0;
      text-align: center;
      img {
        background-color: #fff;
        border-radius: 50%;
        border: 3px solid #fff;
        width: 75px;
        height: 75px;
      }
    }
  }
</style>
