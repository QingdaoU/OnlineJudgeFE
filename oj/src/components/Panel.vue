<template>
  <Card :padding="padding" :shadow="shadow">
    <div slot="title" class="panel-title">
      <slot name="title"></slot>
    </div>
    <div slot="extra" class="panel-extra">
      <slot name="extra"></slot>
    </div>
    <slot></slot>
  </Card>
</template>

<script>
  export default {
    name: 'Panel',
    props: {
      shadow: {
        required: false,
        type: Boolean,
        default: false
      },
      padding: {
        required: false,
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="less">
  .panel-title {
    font-size: 21px;
    font-weight: 400;
    padding: 5px 15px;
    line-height: 30px;
  }

  .panel-extra {
    line-height: 40px;
    margin-right: 20px;
    .ivu-input-icon {
      line-height: 40px;
    }
    ul.filter {
      > li {
        display: inline-block;
        padding: 0 10px;
      }
    }
  }
</style>
