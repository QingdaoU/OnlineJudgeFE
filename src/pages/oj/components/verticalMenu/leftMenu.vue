<template>
    <Menu mode="vertical" @on-select="handleRoute" id="left-menu-wrapper" :class="{expand: isExpand}" :active-name="activeMenu">
      <div class="action-area">
        <Button v-if="!isExpand" type="ghost" shape="circle" icon="navicon-round" @click="handleExpand"></Button>
        <Button v-if="isExpand" type="ghost" shape="circle" icon="chevron-left" @click="handleExpand"></Button>
      </div>
      <MenuItem name="/">
        <Icon type="home"></Icon>
        <span v-if="isExpand">
          {{$t('m.Home')}}
        </span>
      </MenuItem>
      <MenuItem name="/problem">
        <Icon type="ios-keypad"></Icon>
        <span v-if="isExpand">
          {{$t('m.NavProblems')}}
        </span>
      </MenuItem>
      <MenuItem name="/contest">
        <Icon type="trophy"></Icon>
        <span v-if="isExpand">
          {{$t('m.Contests')}}
        </span>
      </MenuItem>
      <MenuItem name="/status">
        <Icon type="ios-pulse-strong"></Icon>
        <span v-if="isExpand">
          {{$t('m.NavStatus')}}
        </span>
      </MenuItem>
      <Submenu name="rank">
        <template slot="title">
          <Icon type="podium"></Icon>
          <span v-if="isExpand">
            {{$t('m.Rank')}}
          </span>
        </template>
        <MenuItem name="/acm-rank">
          <Icon type="ios-star"></Icon>
          <span v-if="isExpand">
            {{$t('m.ACM_Rank')}}
          </span>
        </MenuItem>
        <MenuItem name="/oi-rank">
          <Icon type="ios-star"></Icon>
          <span v-if="isExpand">
            {{$t('m.OI_Rank')}}
          </span>
        </MenuItem>
      </Submenu>
      <MenuItem name="/class">
        <Icon type="home"></Icon>
        <span v-if="isExpand">
          Classes
        </span>
      </MenuItem>
      <Submenu name="about">
        <template slot="title">
          <Icon type="information-circled"></Icon>
          <span v-if="isExpand">
            {{$t('m.About')}}
          </span>
        </template>
        <MenuItem name="/about">
          <Icon type="information-circled"></Icon>
          <span v-if="isExpand">
            {{$t('m.Judger')}}
          </span>
        </MenuItem>
        <MenuItem name="/FAQ">
          <Icon type="information-circled"></Icon>
          <span v-if="isExpand">
            {{$t('m.FAQ')}}
          </span>
        </MenuItem>
      </Submenu>
    </Menu> 
</template>

<script>
export default {
  name: 'LeftMenu',
  data () {
    return {
      isExpand: true
    }
  },
  methods: {
    handleExpand () {
      this.isExpand = !this.isExpand
      this.$emit('expandChange', this.isExpand)
    },
    handleRoute (route) {
      console.log(route)
      if (route && route.indexOf('admin') < 0) {
        this.$router.push(route)
      } else {
        window.open('/admin/')
      }
    }
  },
  computed: {
    activeMenu () {
      return '/' + this.$route.path.split('/')[1]
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
    background-color: #fff;
    width: 67px !important;
    z-index: 1000;
    transition: 150ms ease-in;

    & .action-area {
      min-height: 67px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 150ms ease-in;

      button.ivu-btn > i.ivu-icon {
        line-height: 30px !important;
      }
    }

    &.expand {
      width: 180px !important;
      transition: 150ms ease-out;


      & .action-area {
        justify-content: flex-end;
        padding: 0 15px;
      }
    }

    &:not(.expand) .ivu-menu-submenu {
      ul.ivu-menu > li.ivu-menu-item {
        padding-left: 30px !important;
      }
    }

  }

</style>
