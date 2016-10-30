<template>
  <div class="announce view">
    <Panel title="公告列表">
      <div class="list">
        <el-table
         :data="announceList"
         style="width: 100%"
         @selection-change="multipleSelectionChange">
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
         <el-button type="primary" size="small" :disabled="editBtnDisabled" @click.native="showEditAnnounceDialog = true" icon="edit">编辑</el-button>
         <el-button type="danger" size="small" :disabled="delBtnDisabled" icon="delete">删除</el-button>
         <el-pagination
          class="page"
          layout="prev, pager, next"
          @current-change="currentChange"
          :page-size = "pageSize"
          :total="count">
        </el-pagination>
       </div>
      </div>
    </Panel>
    <!--编辑对话框-->
    <el-dialog title="编辑公告" v-model="showEditAnnounceDialog">
      <el-input
        placeholder="请输入内容">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="showEditAnnounceDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="showEditAnnounceDialog = false">确 定</el-button>
      </span>
    </el-dialog>
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
      // 编辑按钮是否disabled
      editBtnDisabled: true,
      // 删除按钮是否disabled
      delBtnDisabled: true,
      // 显示编辑公告对话框
      showEditAnnounceDialog: false,
      // 公告列表
      announceList: [
      ],
      // 一页显示的公告数
      pageSize: 5,
      // 总公告数
      count: 0
    }
  },
  methods: {
    // 处理多选回调
    multipleSelectionChange (items) {
      this.editBtnDisabled = !(items.length === 1)
      this.delBtnDisabled = !(items.length !== 0)
    },
    // 过滤是否可见
    filterVisible (value, row) {
      return row.visible === value
    },
    // 切换页码回调
    currentChange (page) {
      api.getAnnounceList((page - 1) * this.pageSize, this.pageSize).then(res => {
        this.announceList = res.data.data.results
      })
    }
  },
  mounted () {
    api.login('root', '047e09').then(res => {
      api.getAnnounceList(1, this.pageSize).then(res => {
        this.count = res.data.data.count
        this.announceList = res.data.data.results
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
