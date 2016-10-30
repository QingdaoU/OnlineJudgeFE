<template>
  <div class="panel">
    <header>{{title}}</header>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped lang="less">
  .panel{
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
    header{
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
    .body{
      padding: 15px;
    }
  }
</style>
