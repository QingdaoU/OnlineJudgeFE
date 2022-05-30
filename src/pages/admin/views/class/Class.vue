<template>
  <Panel :title="title">
    <el-tabs :tab-position="'left'">
      <el-tab-pane label="Announcements">Announcements</el-tab-pane>
      <el-tab-pane label="Classes">
        <Tab :title="'List class and student at class'">
          <Classes></Classes>
        </Tab>
      </el-tab-pane>
      <el-tab-pane label="Students">Students</el-tab-pane>
    </el-tabs>
  </Panel>
</template>

<script>
  import Tab from './Tab.vue'
  import Classes from './Classes.vue'
  export default {
    name: 'Class',
    data () {
      return {
        title: 'Class'
      }
    },
    components: {
      Tab, Classes
    }
  }
</script>


<style scoped lang="less">
  .sub-side-menu {
    max-width: 200px;
    margin-left: -15px;
  }

  .content-wrapper {
    padding: 0 15px;
  }
  
</style>