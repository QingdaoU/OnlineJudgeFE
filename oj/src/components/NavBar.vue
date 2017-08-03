<template>
  <div id="header">
      <Menu theme="light" mode="horizontal" @on-select="handleRoute" :active-name="activeMenu" class="oj-menu">
        <div class="logo"><span>OJ</span></div>
        <Menu-item name="/test"><Icon type="home"></Icon>Home</Menu-item>
        <Menu-item name="/problems"><Icon type="ios-keypad"></Icon>Problems</Menu-item>
        <Menu-item name="/contests"><Icon type="trophy"></Icon>Contests</Menu-item>
        <Menu-item name="/status"><Icon type="ios-pulse-strong"></Icon>Status</Menu-item>
        <Menu-item name="/3"><Icon type="podium"></Icon>Rank</Menu-item>
        <Menu-item name="/4"><Icon type="information-circled"></Icon>About</Menu-item>
        <template v-if="!isAuthed">
          <div class="btn-menu">
            <Button type="ghost" shape="circle" @click="handleRoute('/login')">Login</Button>
            <Button type="ghost" shape="circle" @click="handleRoute('/register')" style="margin-left: 5px;">Register
            </Button>
          </div>
        </template>
        <template v-else>
          <Dropdown class="drop-menu" @on-click="handleRoute" placement="bottom-end">
            <Button class="btn-menu" type="text">{{ username }}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <Dropdown-item>Home</Dropdown-item>
              <Dropdown-item>Submissions</Dropdown-item>
              <Dropdown-item name="/settings">Settings</Dropdown-item>
              <Dropdown-item divided name="/logout">Logout</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </template>
      </Menu>


  </div>
</template>

<script>
  import bus from '../utils/eventBus'
  import api from '@/api'
  import auth from '../utils/authHelper'

  export default {
    data() {
      return {
        isAuthed: false,
        username: ''
      }
    },
    methods: {
      handleRoute(route) {
        this.$router.push(route)
      }
    },
    computed: {
      // 跟随路由变化
      activeMenu() {
        return '/' + this.$route.path.split('/')[1]
      }
    },
    mounted() {
      bus.$on('login-success', (res) => {
        this.username = res.user.username
        this.isAuthed = true
        this.handleRoute('/problems')
      })
      bus.$on('logout', () => {
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
    border-bottom: 1px solid #dddee1;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    .oj-menu {
      background: #fdfdfd;
    }
    .logo {
      margin-left: 5%;
      margin-right:2%;
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
  /*.ivu-menu-item {*/
    /*font-size: 15px;*/
  /*}*/

</style>
