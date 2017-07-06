<template>
    <div class="page">
        <Page class="pagination" :total="total" :page-size="pageSize" @on-change="onChange"></Page>
    </div>
</template>

<script>
export default {
  name: 'pagina',
  props: {
    total: {
      required: true,
      type: Number
    },
    pageSize: {
      required: true,
      type: Number
    }
  },
  methods: {
    onChange(page) {
      this.$emit('on-change', page)
    }
  }
}
</script>

<style scoped lang="less">
  .page {
      margin: 20px;
      float: right;
  }
</style>
