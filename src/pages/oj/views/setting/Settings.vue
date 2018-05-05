<template>
  <div class="container">
    <Card :padding="0">
      <div class="flex-container">
        <div class="menu">
          <Menu accordion @on-select="goRoute" :activeName="activeName" style="text-align: center;" width="auto">
            <div class="avatar-editor">
              <div class="avatar-container">
                <img class="avatar" :src="profile.avatar"/>
                <div class="avatar-mask">
                  <a @click.stop="goRoute({name: 'profile-setting'})">
                    <div class="mask-content">
                      <Icon type="camera" size="30"></Icon>
                      <p class="text">change avatar</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <Menu-item name="/setting/profile">{{$t('m.Profile')}}</Menu-item>
            <Menu-item name="/setting/account">{{$t('m.Account')}}</Menu-item>
            <Menu-item name="/setting/security">{{$t('m.Security')}}</Menu-item>
          </Menu>
        </div>
        <div class="panel">
          <transition name="fadeInUp">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'profile',
    methods: {
      goRoute (routePath) {
        this.$router.push(routePath)
      }
    },
    computed: {
      ...mapGetters(['profile']),
      activeName () {
        return this.$route.path
      }
    }
  }
</script>

<style lang="less" scoped>
  @avatar-radius: 50%;

  .container {
    width: 90%;
    min-width: 800px;
    margin: auto;
  }

  .flex-container {
    .menu {
      flex: 1 0 150px;
      max-width: 250px;
      .avatar-editor {
        padding: 10% 22%;
        margin-bottom: 10px;
        .avatar-container {
          &:hover {
            .avatar-mask {
              opacity: .5;
            }
          }
          position: relative;
          .avatar {
            width: 100%;
            height: auto;
            max-width: 100%;
            display: block;
            border-radius: @avatar-radius;
            box-shadow: 0px 0px 1px 0px;
          }
          .avatar-mask {
            transition: opacity .2s ease-in;
            z-index: 1;
            border-radius: @avatar-radius;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: black;
            opacity: 0;
            .mask-content {
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 3;
              color: #fff;
              font-size: 16px;
              text-align: center;
              transform: translate(-50%, -50%);
              .text {
                white-space: nowrap;
              }
            }
          }
        }
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

<style lang="less">
  .setting-main {
    position: relative;
    margin: 10px 40px;
    padding-bottom: 20px;
    .setting-content {
      margin-left: 20px;
    }
    .mini-container {
      width: 500px;
    }
  }
</style>
