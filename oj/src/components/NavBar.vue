<template>
  <div id="header">
    <Menu theme="light" mode="horizontal" @on-select="handleRoute" :active-name="activeMenu" class="oj-menu">
      <div class="logo"><span>OJ</span></div>
      <Menu-item name="/test">
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
      <Menu-item name="/4">
        <Icon type="information-circled"></Icon>
        About
      </Menu-item>
      <template v-if="!isAuthed">
        <div class="btn-menu">
          <Button type="ghost" ref="loginBtn" shape="circle" @click="registerModalVisible = true, modalMode='login'">Login</Button>
          <Button type="ghost" shape="circle" @click="registerModalVisible = true, modalMode='register'"
                  style="margin-left: 5px;">Register
          </Button>
        </div>
      </template>
      <template v-else>
        <Dropdown class="drop-menu" @on-click="handleRoute" placement="bottom-end">
          <Button class="btn-menu" type="text">{{ username }}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <Dropdown-menu slot="list">
            <Dropdown-item name="/profile">Home</Dropdown-item>
            <Dropdown-item name="/status?myself=1">Submissions</Dropdown-item>
            <Dropdown-item name="/setting">Settings</Dropdown-item>
            <Dropdown-item divided name="/logout">Logout</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </template>
    </Menu>
    <LoginOrRegister :visible.sync="registerModalVisible" :mode.sync="modalMode"></LoginOrRegister>

  </div>
</template>

<script>
  import api from '@/api'
  import auth from '../utils/auth'

  import LoginOrRegister from '@/views/user/LoginOrRegister'

  export default {
    components: {
      LoginOrRegister
    },
    data() {
      return {
        modalMode: 'login',
        registerModalVisible: false,
        isAuthed: false,
        username: ''
      }
    },
    methods: {
      handleRoute(route) {
        if (route) {
          this.$router.push(route)
        }
      }
    },
    computed: {
      // 跟随路由变化
      activeMenu() {
        return '/' + this.$route.path.split('/')[1]
      }
    },
    mounted() {
      this.$bus.$on('login', () => {
        this.$refs['loginBtn'].handleClick()
      })
      this.$bus.$on('login-success', (res) => {
        this.username = res.user.username
        this.isAuthed = true
      })
      this.$bus.$on('logout', () => {
        this.isAuthed = false
        this.username = ''
      })
      api.getUserInfo().then((res) => {
        let data = res.data.data
        if (data.hasOwnProperty('user')) {
          this.username = data.user.username
          this.isAuthed = true
          auth.setUser(data)
        } else {
          this.isAuthed = false
          this.username = ''
          auth.clear()
        }
      }, (res) => {
      })
    },
    watch: {
      '$route'() {
        if (!auth.isAuthicated()) {
          this.username = ''
          this.isAuthed = false
        }
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
    z-index: 10;
    background-color: #fff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    .oj-menu {
      background: #fdfdfd;
    }

    .logo {
      margin-left: 5%;
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
