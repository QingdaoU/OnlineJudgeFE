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
      // 可以通过eventbus传一个字符串，该字符串会替换掉相应的breadcrumb项，参看：Problem.vue
      bus.$on('bread-crumb-change', (res) => {
        this.$set(this.breads, this.breads.length - 1, res)
      })
      // 改时间修改倒数第二个bread的内容，见contestproblem
      bus.$on('bread-crumb-change2', (res) => {
        this.$set(this.breads, this.breads.length - 2, res)
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
    padding: 15px 30px;
    .ivu-breadcrumb{
      text-transform: capitalize;
      &>span:last-child{
        font-size: 20px;
        font-weight:300;
      }
    }
  }

</style>
