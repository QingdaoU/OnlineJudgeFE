<template>
  <div class="class-panel">
    <Menu :active-name="activeTab" class="menu" @on-select="handleSelected($event)">
      <MenuItem v-for="menu of classMenu" :key="menu.tab" :name="menu.tab">
        {{menu.title}}
      </MenuItem>
    </Menu>
    <div class="panel-body-wrapper">
      <div class="title">{{classMenu[parseInt(activeTab)].title}}</div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  const CLASS_MENU = [
    {title: 'Home', to: '/', tab: '0'},
    {title: 'Announcements', to: '/', tab: '1'},
    {title: 'Contest', to: '/', tab: '2'},
    {title: 'Grades', to: '/', tab: '3'},
    {title: 'Members', to: '/', tab: '4'}
  ]
  export default {
    name: 'ClassPanel',
    components: {
    },
    data () {
      return {
        classMenu: CLASS_MENU,
        activeTab: '0'
      }
    },
    mounted () {
    },
    methods: {
      handleSelected (event) {
        this.activeTab = event
        this.$emit('activeTabChange', this.activeTab)
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="less">
.class-panel {
  display: flex;

  .panel-body-wrapper {
    width: 100%;

    .title {
      font-size: 23px;
      border-bottom: 1px solid #eee;
      padding: 5px 15px;
      color: #3b76e6;
    }

    .content {
      padding: 15px;
    }
  }

  .menu {
    width: 175px !important;

    .ivu-menu-item {
      font-size: 12px;
    }
  }
}
</style>
