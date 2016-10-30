<template>
  <div class="announce view">
    <Panel title="公告列表">
      <div class="list">
        <el-table
         :data="announceList"
         style="width: 100%"
         @selection-change="handleMultipleSelectionChange">
         <el-table-column
           type="selection"
           width="50">
         </el-table-column>
         <el-table-column
           prop="id"
           label="编号"
           width="100">
         </el-table-column>
         <el-table-column
           prop="title"
           label="标题"
           width="220"
           :show-tooltip-when-overflow="true">
         </el-table-column>
         <el-table-column
           prop="createTime"
           label="创建时间">
         </el-table-column>
         <el-table-column
           prop="updateTime"
           label="更新时间">
         </el-table-column>
         <el-table-column
           prop="creator"
           label="创建者">
         </el-table-column>
       </el-table>
       <div class="option">
         <el-button type="primary" size="small" icon="edit">编辑</el-button>
         <el-button type="primary" size="small" icon="delete">删除</el-button>
         <el-checkbox class="visible" v-model="visible">只显示可见</el-checkbox>
         <el-pagination
          class="page"
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
       </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from '../components/Panel.vue'
import api from '../api.js'
export default {
  components: {
    Panel
  },
  data () {
    return {
      visible: false,
      announceList: [
        {
          id: 1,
          title: '本OJ是开源软件',
          updateTime: '2016-05-30 16:48:18',
          createTime: '2016-05-30 16:48:18',
          creator: 'root'
        },
        {
          id: 1,
          title: '本OJ是开源软件',
          updateTime: '2016-05-30 16:48:18',
          createTime: '2016-05-30 16:48:18',
          creator: 'root'
        },
        {
          id: 1,
          title: '本OJ是开源软件',
          updateTime: '2016-05-30 16:48:18',
          createTime: '2016-05-30 16:48:18',
          creator: 'root'
        }
      ]
    }
  },
  methods: {
    handleMultipleSelectionChange () {
      return true
    }
  },
  mounted () {
    api.getAnnounceList().then(res => {
      console.log(res)
    }, res => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
  .announce{
    .option{
      border: 1px solid #e0e6ed;
      border-top: none;
      padding: 10px;
      background-color: #fff;
      position: relative;
      button{
        margin-right: 10px;
      }
      >.visible{
        margin: 0 10px;
      }
      >.page{
        position: absolute;
        right: 20px;
        top: 10px;
      }
    }
  }
</style>
