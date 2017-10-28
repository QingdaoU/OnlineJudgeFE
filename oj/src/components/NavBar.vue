<template>
  <div id="header">
    <Menu theme="light" mode="horizontal" @on-select="handleRoute" :active-name="activeMenu" class="oj-menu">
      <div class="logo"><span>{{website.website_name}}</span></div>
      <Menu-item name="/">
        <Icon type="home"></Icon>
        Home
      </Menu-item>
      <Menu-item name="/problems">
        <Icon type="ios-keypad"></Icon>
        Problems
      </Menu-item>
      <Menu-item name="/contests">
        <Icon type="trophy"></Icon>
        Contests
      </Menu-item>
      <Menu-item name="/status">
        <Icon type="ios-pulse-strong"></Icon>
        Status
      </Menu-item>
      <Submenu name="">
        <template slot="title">
          <Icon type="podium"></Icon>
          Rank
        </template>
        <Menu-item name="/acm-rank">
          ACM Rank
        </Menu-item>
        <Menu-item name="/oi-rank">
          OI Rank
        </Menu-item>
      </Submenu>
      <Submenu name="">
        <template slot="title">
          <Icon type="information-circled"></Icon>
          About
        </template>
        <Menu-item name="/about">
          Judger
        </Menu-item>
        <Menu-item name="/FAQ">
          FAQ
        </Menu-item>
      </Submenu>
      <template v-if="!isAuthenticated">
        <div class="btn-menu">
          <Button type="ghost"
                  ref="loginBtn"
                  shape="circle"
                  @click="handleBtnClick('login')">Login
          </Button>
          <Button v-if="website.allow_register"
                  type="ghost"
                  shape="circle"
                  @click="handleBtnClick('register')"
                  style="margin-left: 5px;">Register
          </Button>
        </div>
      </template>
      <template v-else>
        <Dropdown class="drop-menu" @on-click="handleRoute" placement="bottom-end">
          <Button class="btn-menu" type="text">{{ user.username }}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <Dropdown-menu slot="list">
            <Dropdown-item name="/user-home">Home</Dropdown-item>
            <Dropdown-item name="/status?myself=1">Submissions</Dropdown-item>
            <Dropdown-item name="/setting">Settings</Dropdown-item>
            <Dropdown-item divided name="/logout">Logout</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </template>
    </Menu>
    <keep-alive>
      <component :is="modalStatus.mode"></component>
    </keep-alive>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import login from '@/views/user/Login'
  import register from '@/views/user/Register'

  export default {
    components: {
      login,
      register
    },
    mounted () {
      this.getProfile()
    },
    methods: {
      ...mapActions(['getProfile', 'changeModalStatus']),
      handleRoute (route) {
        if (route) {
          this.$router.push(route)
        }
      },
      handleBtnClick (mode) {
        this.changeModalStatus({
          visible: true,
          mode: mode
        })
      }
    },
    computed: {
      ...mapGetters(['website', 'modalStatus', 'user', 'isAuthenticated']),
      // 跟随路由变化
      activeMenu () {
        return '/' + this.$route.path.split('/')[1]
      }
    }
  }
</script>

<style lang="less" scoped>
  #header {
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    .oj-menu {
      background: #fdfdfd;
    }

    .logo {
      margin-left: 2%;
      margin-right: 2%;
      font-size: 20px;
      float: left;
      line-height: 60px;
    }

    .drop-menu {
      float: right;
      margin-top: 10px;
      padding-right: 10px;
    }

    .btn-menu {
      font-size: 16px;
      float: right;
      margin-right: 10px;
    }

  }


</style>
