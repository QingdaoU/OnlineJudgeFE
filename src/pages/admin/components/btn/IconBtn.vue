<template>
  <div style="display: inline-block;">
    <el-tooltip class="item" effect="dark" :content="name" placement="top">
      <el-button plain :icon="'el-icon-fa-' + icon" size="mini">
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'IconBtn',
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
