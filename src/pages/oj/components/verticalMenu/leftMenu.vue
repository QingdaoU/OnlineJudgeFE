<template>
  <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
    <Menu mode="vertical" @on-select="handleRoute" id="left-menu-wrapper" :class="menuitemClasses" :active-name="activeMenu">
      <div class="action-area">
        <Button shape="circle" icon="chevron-left" :class="rotateIcon" @click="collapsedSider"></Button>
      </div>
      <MenuItem name="/">
        <Icon type="home"></Icon>
        <span>
          {{$t('m.Home')}}
        </span>
      </MenuItem>
      <MenuItem name="/class">
        <Icon type="home"></Icon>
        <span>
          Classes
        </span>
      </MenuItem>
      <MenuItem name="/problem">
        <Icon type="ios-keypad"></Icon>
        <span>
          {{$t('m.NavProblems')}}
        </span>
      </MenuItem>
      <MenuItem name="/contest">
        <Icon type="trophy"></Icon>
        <span>
          {{$t('m.Contests')}}
        </span>
      </MenuItem>
      <MenuItem name="/status">
        <Icon type="ios-pulse-strong"></Icon>
        <span>
          {{$t('m.NavStatus')}}
        </span>
      </MenuItem>
      <Submenu name="rank">
        <template slot="title">
          <Icon type="podium"></Icon>
          <span>
            {{$t('m.Rank')}}
          </span>
        </template>
        <MenuItem name="/acm-rank">
          <Icon type="ios-star"></Icon>
          <span>
            {{$t('m.ACM_Rank')}}
          </span>
        </MenuItem>
        <MenuItem name="/oi-rank">
          <Icon type="ios-star"></Icon>
          <span>
            {{$t('m.OI_Rank')}}
          </span>
        </MenuItem>
      </Submenu>
      <Submenu name="about">
        <template slot="title">
          <Icon type="information-circled"></Icon>
          <span>
            {{$t('m.About')}}
          </span>
        </template>
        <MenuItem name="/about">
          <Icon type="information-circled"></Icon>
          <span>
            {{$t('m.Judger')}}
          </span>
        </MenuItem>
        <MenuItem name="/FAQ">
          <Icon type="information-circled"></Icon>
          <span>
            {{$t('m.FAQ')}}
          </span>
        </MenuItem>
      </Submenu>
    </Menu> 
  </Sider>
</template>

<script>
export default {
  name: 'LeftMenu',
  data () {
    return {
      isCollapsed: false
    }
  },
  methods: {
    handleRoute (route) {
      if (route && route.indexOf('admin') < 0) {
        this.$router.push(route)
      } else {
        window.open('/admin/')
      }
    },
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
      this.$emit('isCollapsed', this.isCollapsed)
    }
  },
  computed: {
    activeMenu () {
      return '/' + this.$route.path.split('/')[1]
    },
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }

  }
}
</script>

<style scoped lang="less">
  #left-menu-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: var(--background-color);
    max-width: 180px !important;
    transition: all .3s;

    .action-area {
      min-height: 67px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 15px;
      transition: all .3s;

      button {
        background: var(--background-color);
        box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;

        &.menu-icon{
          transition: all .3s;
        }

        &.rotate-icon{
          transform: rotate(-180deg);
        }
      }

      button.ivu-btn > i.ivu-icon {
        line-height: 30px !important;
      }
    }

    span {
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
    }

    i {
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
    }

    &.collapsed-menu {
      width: 78px !important;
      transition: all .3s;

      .action-area {
        justify-content: center;
        transition: all .3s;
      }
      .ivu-menu-submenu-title .ivu-menu-submenu-title-icon {
        margin-right: 11px;
      }

      li {
        ul li {
          place-self: center;
          padding-left: 24px !important;
        }
      }

      span {
        width: 0px;
        transition: width .2s ease;
      }

      i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
      }
    }
  }
</style>
