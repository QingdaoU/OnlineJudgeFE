<template>
  <div id="header">
    <Row type="flex" justify="space-around">
      <Col span="3">
      <div class="logo"><span>QduOJ</span></div>
      </Col>

      <Col span="14">
      <Menu theme="light" mode="horizontal" @on-select="handleRoute" :active-name="activeMenu">
        <Menu-item name="/problems">Problems</Menu-item>
        <Menu-item name="/contests">Contests</Menu-item>
        <Menu-item name="/status">Status</Menu-item>
        <Menu-item name="/3">Rank</Menu-item>
        <Menu-item name="/4">About</Menu-item>
        <Menu-item name="/test">Test</Menu-item>
      </Menu>
      </Col>

      <Col span="4">
      <template v-if="!isAuthed">
        <div class="btn-menu">
          <Button type="ghost" shape="circle" @click="handleRoute('/login')">Login</Button>
          <Button type="ghost" shape="circle" @click="handleRoute('/register')" style="margin-left: 5px;">Register
          </Button>
        </div>
      </template>

      <template v-else>
        <Dropdown class="right" @on-click="handleRoute">
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
      </Col>
    </Row>
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
      bus.$on('loginSuccess', (res) => {
        this.username = res.data.data.username
        this.isAuthed = true
        this.handleRoute('/problems')
      })
      bus.$on('logout', () => {
        this.isAuthed = false
        this.username = ''
      })
      api.getUsername().then((res) => {
        let data = res.data.data
        if (data.isLogin === true) {
          this.username = data.username
          this.isAuthed = true
          auth.setUser(data.username)
        } else {
          this.isAuthed = false
          this.username = ''
          auth.clear()
        }
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
  .right {
    float: right;
  }

  #header {
    background-color: #fff;
    border-bottom: 1px solid #dddee1;
    .logo {
      margin-left: 20px;
      font-size: 20px;
      float: left;
      line-height: 60px;
    }
  }

  .ivu-menu-horizontal.ivu-menu-light:after {
    height: 0;
  }

  .btn-menu {
    font-size: 16px;
    margin-top: 13px;
  }
</style>
