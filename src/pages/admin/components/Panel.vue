<template>
  <div class="panel" :class="{'small': small}">
    <header>
      <h2 v-if="$slots.title">
        <slot name="title"></slot>
      </h2>
      <h2 v-else>{{title}}</h2>

      <div class="header_right">
        <slot name="header"></slot>
      </div>
    </header>

    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Panel',
    props: {
      title: {
        type: String,
        required: false
      },
      small: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style scoped lang="less">
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    &.small {
      max-width: 830px;
      min-width: 700px;
      margin-left: 20px;
      margin-top: 10px;
    }
    header {
      position: relative;
      z-index: 10;
      > h2 {
        margin: 0;
        color: #333;
        border-color: #ddd;
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 0.025em;
        height: 66px;
        line-height: 45px;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      > .header_right {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translate(0, -50%);
      }
    }
    .body {
      padding: 15px;
    }
  }
</style>
<style lang="less">
  .panel-options {
    border: 1px solid #e0e6ed;
    border-top: none;
    padding: 8px;
    background-color: #fff;
    position: relative;
    height: 50px;
    button {
      margin-top: 3px;
      margin-right: 10px;
    }
    > .page {
      position: absolute;
      right: 20px;
      top: 10px;
    }
  }
</style>
