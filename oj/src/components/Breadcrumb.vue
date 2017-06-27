<template>
  <div id="breadcrumb">
    <Breadcrumb>
      <Breadcrumb-item >Home</Breadcrumb-item>
      <Breadcrumb-item :key="b" v-for="b in breads">{{b}}</Breadcrumb-item>
    </Breadcrumb>
  </div>
</template>

<script>
  import bus from '../utils/eventBus'
  export default {
    name: 'bread',
    data() {
      return {
        breads: []
      }
    },
    methods: {
      // 根据路由生成breadcrumb
      generateBread(route) {
        // 去重空导航
        this.breads = route.path.split('/').filter((element) => {
          return !!element
        })
      }
    },
    mounted() {
      this.generateBread(this.$route)
      // 可以通过eventbus传一个字符串，该字符串会替换掉最后一个breadcrumb项，如：Problem.vue
      bus.$on('changeBread', (res) => {
        let i = this.breads.length - 1
        this.breads.splice(i, 1)
        this.breads.push(res)
      })
    },
    watch: {
      '$route'(to, from) {
        this.generateBread(to)
      }
    }
  }
</script>

<style scoped lang="less">
  #breadcrumb {
    background: #f8f8f9;
    padding: 20px 30px;
    .ivu-breadcrumb{
      text-transform: capitalize;
      &>span:last-child{
        font-size: 20px;
        font-weight:300;
      }
    }
  }

</style>
