<template>
  <div>
    <div id="breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item>Home</Breadcrumb-item>
        <Breadcrumb-item>Test</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <CodeMirror :value="code" @changeCode="onChangeCode" @changeLang="onChangeLang"></CodeMirror>
  </div>
</template>

<script>
  //  import api from '@/api'
  import CodeMirror from '../components/CodeMirror.vue'
  export default {
    name: 'test',
    components: {
      CodeMirror
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
