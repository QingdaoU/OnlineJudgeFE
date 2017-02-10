<template>
  <div style="display: inline-block;">
    <el-tooltip class="item" effect="dark" :content="name" placement="top">
      <el-button type="primary" :plain="true" size="small">
        <i :class="'fa fa-' + icon" aria-hidden="true"></i>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    }
  }
</script>
