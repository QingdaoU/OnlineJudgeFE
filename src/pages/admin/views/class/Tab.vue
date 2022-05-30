<template>
  <div class="class-tab-wrapper">
    <header>
      <div class="title">
        <template v-if="$slots.title">
          <slot name="title"></slot>
        </template>
        <template v-else>
          {{title}}
        </template>
      </div>
    </header>

    <div class="class-tab-body" :style="styleBody">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'Tab',
    data () {
      return {
      }
    },
    props: {
      title: {
        type: String,
        required: false
      }
    }
  }
</script>


<style scoped lang="less">
  .title {
    margin: 0 0 15px 0;
    color: #424242;
    border-color: #ddd;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.025em;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  
</style>