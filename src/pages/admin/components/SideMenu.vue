<template>
  <el-menu class="vertical_menu"
           :router="true" :default-active="currentPath">
    <div class="logo">
      <img src="../../../assets/logo.svg" alt="oj admin"/>
    </div>
    <el-menu-item index="/"><i class="el-icon-fa-dashboard"></i>{{$t('m.Dashboard')}}</el-menu-item>
    <el-submenu v-if="isSuperAdmin" index="general">
      <template slot="title"><i class="el-icon-menu"></i>{{$t('m.General')}}</template>
      <el-menu-item index="/user">{{$t('m.User')}}</el-menu-item>
      <el-menu-item index="/announcement">{{$t('m.Announcement')}}</el-menu-item>
      <el-menu-item index="/conf">{{$t('m.System_Config')}}</el-menu-item>
      <el-menu-item index="/judge-server">{{$t('m.Judge_Server')}}</el-menu-item>
      <el-menu-item index="/prune-test-case">{{$t('m.Prune_Test_Case')}}</el-menu-item>
    </el-submenu>
    <el-submenu index="problem" v-if="hasProblemPermission">
      <template slot="title"><i class="el-icon-fa-bars"></i>{{$t('m.Problem')}}</template>
      <el-menu-item index="/problems">{{$t('m.Problem_List')}}</el-menu-item>
      <el-menu-item index="/problem/create">{{$t('m.Create_Problem')}}</el-menu-item>
      <el-menu-item index="/problem/batch_ops">{{$t('m.Export_Import_Problem')}}</el-menu-item>

    </el-submenu>
    <el-submenu index="contest">
      <template slot="title"><i class="el-icon-fa-trophy"></i>{{$t('m.Contest')}}</template>
      <el-menu-item index="/contest">{{$t('m.Contest_List')}}</el-menu-item>
      <el-menu-item index="/contest/create">{{$t('m.Create_Contest')}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SideMenu',
    data () {
      return {
        currentPath: ''
      }
    },
    mounted () {
      this.currentPath = this.$route.path
    },
    computed: {
      ...mapGetters(['user', 'isSuperAdmin', 'hasProblemPermission'])
    }
  }
</script>

<style scoped lang="less">
  .vertical_menu {
    overflow: auto;
    width: 205px;
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
