<template>
  <div class="problem">
    <Panel title="add problem" :small="true">
      <div class="field">
        <el-input placeholder="problem title"></el-input>
      </div>
      <div class="field">
        <Simditor placeholder="problem description"></Simditor>
      </div>
      <div class="field">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input type="Number" placeholder="time limit"></el-input>
            <p class="info">Time limit (MS, range 1-10000ms)</p>
          </el-col>
          <el-col :span="12">
            <el-input type="Number" placeholder="memory limit"></el-input>
            <p class="info">Memory limit (MB, minimum 16M, Java not less than 32M)</p>
          </el-col>
        </el-row>
      </div>
      <div class="field"></div>
    </Panel>
  </div>
</template>

<script>
  import Panel from '../../components/Panel'
  import Simditor from '../../components/Simditor.vue'
  export default{
    components: {
      Panel, Simditor
    },
    data () {
      return {
      }
    },
    mounted () {
      console.log(this.$route)
    }
  }
</script>

<style lang="less" scoped>
.problem{
  .field{
    margin-bottom: 25px;
    overflow: hidden;
  }
  .info{
    color: #999;
    margin: 5px;
    font-size: 12px;
  }
}
</style>
