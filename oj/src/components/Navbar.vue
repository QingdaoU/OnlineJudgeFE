<template>
<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
  <el-row :gutter="10">
    <el-col :xs="3" :sm="3" :lg="3">&nbsp;</el-col>
    <el-col :xs="2" :sm="2" :lg="2">
      <div style="color:#bfcbd9;margin-top:16px;font-size:20px;">QDUOJ</div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="16">
      <el-menu-item index="1">题目</el-menu-item>
      <el-menu-item index="2">提交</el-menu-item>
      <el-menu-item index="3">比赛</el-menu-item>
      <el-menu-item index="4">排名</el-menu-item>
      <el-menu-item index="5">帮助</el-menu-item>
    </el-col>
    <el-col :xs="3" :sm="3" :lg="3">
      <el-submenu index="2">
        <template slot="title">Hieda no Chiaki
</template>
          <el-menu-item index="2-1">我的主页</el-menu-item>
          <el-menu-item index="2-2">我的提交</el-menu-item>
          <el-menu-item index="2-3">设置</el-menu-item>
          <el-menu-item index="2-4">退出</el-menu-item>
        </el-submenu>
      </el-col>
    </el-row>
  </el-menu>
</template>


<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  }
}
</script>
