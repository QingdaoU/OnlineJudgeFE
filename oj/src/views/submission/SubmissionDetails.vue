<template>
  <div>
    Hello
  </div>
</template>

<script>
  //  import api from '@/api'
  export default {
    name: 'test',
    components: {
    },
    data() {
      return {
        code: ''
      }
    },
    mounted() {
//      api.getProblem('1').then((res) => {
//        console.log(res.data)
//      })
    },
    methods: {
      onChangeCode(newCode) {
        this.code = newCode
      },
      onChangeLang(newLang) {
        this.language = newLang
      }
    }
  }
</script>

<style scoped lang="less">
  #breadcrumb {
    outline: 1px;
  }
</style>
