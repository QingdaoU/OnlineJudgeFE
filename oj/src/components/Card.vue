<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .panel {
    font-size: 14px;
    line-height: 25px;
    overflow: hidden;
    margin: 15px;
    background: #FFF;
    border-radius: 1px;
    padding: 15px;
    box-shadow: -1px 1px 8px rgba(0, 0, 0, 0.25);
  }
</style>
