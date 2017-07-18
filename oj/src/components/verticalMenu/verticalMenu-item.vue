<template>
  <li @click.stop="handleClick"><slot></slot></li>
</template>

<script>
  //  import api from '@/api'
  import Emitter from '~/mixins'
  export default {
    name: 'VerticalMenu-item',
    mixins: [ Emitter ],
    props: {
      route: {
        required: true,
        type: [String, Object]
      }
    },
    methods: {
      handleClick() {
        this.dispatch('VerticalMenu', 'on-click', this.route)
      }
    }
  }
</script>

<style scoped lang="less">
  li{
    color: #495060;
    display: block;
    text-align: left;
    padding: 15px 20px;
    &:hover {
      background: #f8f8f9;
      border-left: 3px solid #5cadff;
      color: #2d8cf0;
    }
    & > .ivu-icon {
      font-size: 16px;
      margin-right: 8px;
    }
  }
</style>
