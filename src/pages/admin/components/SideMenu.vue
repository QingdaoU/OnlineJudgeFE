<template>
  <el-menu router="true" :default-active="currentPath" :collapse-transition="false" class="vertical_menu" @close="handleClose" :collapse="!isExpand">
    <div class="action-area">
      <el-button v-if="!isExpand" type="ghost" circle icon="el-icon-d-arrow-right" @click="handleExpand"></el-button>
      <el-button v-if="isExpand" type="ghost" circle icon="el-icon-d-arrow-left" @click="handleExpand"></el-button>
    </div>
    <div class="logo">
      <img src="../../../assets/logo.svg" alt="oj admin"/>
    </div>
    <el-menu-item index="/">
      <i class="el-icon-fa-dashboard"></i>
      <span>Dashboard</span>
    </el-menu-item>

    <el-submenu v-if="isSuperAdmin" index="general">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>{{$t('m.General')}}</span>
      </template>
      <el-menu-item index="/user">
        <span>{{$t('m.User')}}</span>
        </el-menu-item>
      <el-menu-item index="/announcement">
        <span>{{$t('m.Announcement')}}</span>
        </el-menu-item>
      <el-menu-item index="/conf">
        <span>{{$t('m.System_Config')}}</span>
        </el-menu-item>
      <el-menu-item index="/judge-server">
        <span>{{$t('m.Judge_Server')}}</span>
        </el-menu-item>
      <el-menu-item index="/prune-test-case">
        <span>{{$t('m.Prune_Test_Case')}}</span>
        </el-menu-item>
    </el-submenu>

    <el-submenu index="problem" v-if="hasProblemPermission">
      <template slot="title">
        <i class="el-icon-orange"></i>
        <span>{{$t('m.Problem')}}</span>
      </template>
      <el-menu-item index="/problems">
        <span>{{$t('m.Problem_List')}}</span>
        </el-menu-item>
      <el-menu-item index="/problem/create">
        <span>{{$t('m.Create_Problem')}}</span>
        </el-menu-item>
      <el-menu-item index="/problem/batch_ops">
        <span>{{$t('m.Export_Import_Problem')}}</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="contest">
      <template slot="title">
        <i class="el-icon-fa-trophy"></i>
        <span v-if="isExpand">{{$t('m.Contest')}}</span>
      </template>
      <el-menu-item index="/contest">
        <span v-if="isExpand">{{$t('m.Contest_List')}}</span>
      </el-menu-item>
      <el-menu-item index="/contest/create">
        <span v-if="isExpand">{{$t('m.Create_Contest')}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SideMenu',
    data () {
      return {
        currentPath: '',
        isExpand: true
      }
    },
    mounted () {
      this.currentPath = this.$route.path
    },
    computed: {
      ...mapGetters(['user', 'isSuperAdmin', 'hasProblemPermission'])
    },
    methods: {
      handleExpand () {
        this.isExpand = !this.isExpand
        this.$emit('expandChange', this.isExpand)
      }
    }
  }
</script>

<style scoped lang="less">
  .vertical_menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: #fff;

    & .action-area {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      transition: 150ms ease-in;
      padding: 10px 15px;
    }

    &.el-menu--collapse {  
      width: 67px !important;

      .action-area {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 150ms ease-in;
      }
    }

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
