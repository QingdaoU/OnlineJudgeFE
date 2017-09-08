<template>
  <Card :padding="0" id="settings-card">
    <div class="flex-container">
      <div class="menu">
        <Menu accordion @on-select="goRoute" activeName="/setting/profile" style="text-align: center;">
          <div>
            <img class="avatar" src="../../assets/profile.jpg"/>
          </div>
          <Menu-item name="/setting/profile">Profile</Menu-item>
          <Menu-item name="/setting/1">Security</Menu-item>
          <Menu-item name="/setting/2">Perference</Menu-item>
        </Menu>
      </div>
      <div class="panel">
        <router-view></router-view>
      </div>
    </div>
  </Card>
</template>
<script>
  export default {
    name: 'profile',
    data() {
      return {}
    },
    methods: {
      goRoute(routePath) {
        this.$router.push(routePath)
      }
    }
  }
</script>

<style lang="less" scoped>
  #settings-card {
    .menu {
      flex: none;
      width: 240px;
      .avatar {
        max-width: 180px;
        max-height: 180px;
        margin: 20px auto;
        display: block;
        border-radius: 5%;
      }
    }
    .panel {
      flex: auto;
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #dddee1;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    /*取消默认的伪元素*/
    width: 0;
  }
</style>
