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
           sortable
           width="100">
         </el-table-column>
         <el-table-column
           prop="title"
           label="标题"
           sortable
           width="220"
           :show-tooltip-when-overflow="true">
         </el-table-column>
         <el-table-column
           prop="create_time"
           sortable
           label="创建时间">
         </el-table-column>
         <el-table-column
           prop="last_update_time"
           sortable
           label="更新时间">
         </el-table-column>
         <el-table-column
           prop="created_by.username"
           sortable
           label="创建者">
         </el-table-column>
         <el-table-column
          prop="visible"
          label="筛选"
          width="100"
          :filters="[{ text: '显示可见', value: true }, { text: '显示不可见', value: false }]"
          :filter-method="filterVisible"
          inline-template>
          <el-tag :type="row.visible ? 'success' : 'danger'" close-transition>{{row.visible ? '可见' : '不可见'}}</el-tag>
        </el-table-column>
       </el-table>
       <div class="option">
         <el-button type="primary" size="small" icon="edit">编辑</el-button>
         <el-button type="danger" size="small" icon="delete">删除</el-button>
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
      announceList: [
      ]
    }
  },
  methods: {
    handleMultipleSelectionChange () {
      return true
    },
    filterVisible (value, row) {
      return row.visible === value
    }
  },
  mounted () {
    api.login('root', '047e09').then(res => {
      api.getAnnounceList().then(res => {
        this.announceList = res.data.data
      })
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
      >.page{
        position: absolute;
        right: 20px;
        top: 10px;
      }
    }
  }
</style>
