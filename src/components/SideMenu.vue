<template>
  <el-menu default-active="1" class="vertical_menu" theme="dark">
    <div class="logo">
        <img src="../assets/logo.svg" alt="oj admin" />
    </div>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>导航一</template>
      <el-menu-item-group title="分组一">
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
  </el-menu>
</template>

<script>
export default{
}
</script>
<style scoped lang="less">
.vertical_menu{
  width: 240px;
  height: 100%;
  position: fixed!important;
  top: 0;
  bottom: 0;
  left: 0;
  .logo{
    margin: 20px 0;
    text-align: center;
    img{
      background-color: #fff;
      border-radius: 50%;
      border: 3px solid #fff;
      width: 75px;
      height: 75px;
    }
  }
}
</style>
