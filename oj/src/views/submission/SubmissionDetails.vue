<template>
  <!--<Table stripe :disabled-hover="true" :columns="columns" :data="info"></Table>-->
  <div>
    <Alert
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    data() {
      return {
        columns: [
          {
            title: 'TestCase',
            type: 'index',
            align: 'center'
//            width: 60
          }
        ],
        info: []
      }
    },
    mounted() {
      api.getSubmission(this.$route.params.id).then((res) => {
        console.log(res.data.data)
        this.info = res.data.data.info.data
      })
    },
    methods: {}
  }
</script>

<style scoped lang="less">
</style>
