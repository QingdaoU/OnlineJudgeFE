<template>
  <div class="announce view">
    <Panel title="announce list">
      <div class="list">
        <el-table
          ref="table"
          :data="announceList"
          style="width: 100%"
          @selection-change="multipleSelectionChange">
         <el-table-column
           type="selection"
           width="50">
         </el-table-column>
         <el-table-column
           prop="id"
           label="ID"
           sortable
           width="100">
         </el-table-column>
         <el-table-column
           prop="title"
           label="title"
           sortable
           width="220"
           show-tooltip-when-overflow>
         </el-table-column>
         <el-table-column
           prop="create_time"
           sortable
           label="create time">
         </el-table-column>
         <el-table-column
           prop="last_update_time"
           sortable
           label="update time">
         </el-table-column>
         <el-table-column
           prop="created_by.username"
           sortable
           label="creater">
         </el-table-column>
         <el-table-column
          prop="visible"
          label="filter"
          width="100"
          :filters="[{ text: 'show visible', value: 'visible' }, { text: 'show invisible', value: 'invisible' }]"
          :filter-method="filterVisible"
          inline-template>
          <el-tag :type="row.visible ? 'success' : 'danger'" close-transition>{{row.visible ? 'visible' : 'invisible'}}</el-tag>
        </el-table-column>
       </el-table>
       <div class="option">
         <el-button type="primary" size="small" :disabled="editBtnDisabled" @click.native="showEditAnnounceDialog = true" icon="edit">edit</el-button>
         <el-button type="danger" size="small" :disabled="delBtnDisabled" icon="delete">delete</el-button>
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
    <el-dialog title="Edit the announcement" @open="onOpenEditDialog" v-model="showEditAnnounceDialog">
      <el-input
        v-model="announce.title"
        placeholder="please enter a title" class="title_input">
      </el-input>
      <Simditor v-model="announce.content" placeholder="please enter the announcement text"></Simditor>
      <div class="visible_box">
        <span>Whether or not visible:</span>
        <el-switch
          v-model="announce.visible"
          on-color="#13ce66"
          on-text="visible"
          off-text="invisible"
          off-color="#ff4949">
        </el-switch>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="showEditAnnounceDialog = false">cancel</el-button>
        <el-button type="primary" @click.native="submit(),showEditAnnounceDialog = false">confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Panel from '../components/Panel.vue'
import Simditor from '../components/Simditor.vue'
import api from '../api.js'
export default {
  components: {
    Panel, Simditor
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
      count: 0,
      // 公告 (new | edit) model
      announce: {
        title: '',
        visible: true,
        content: ''
      }
    }
  },
  methods: {
    // 处理多选回调
    multipleSelectionChange (items) {
      let len = items.length
      this.editBtnDisabled = !(len === 1)
      this.delBtnDisabled = !(len !== 0)
    },
    // 过滤是否可见
    filterVisible (value, row) {
      return value === 'visible' ? row.visible : !row.visible
    },
    // 切换页码回调
    currentChange (page) {
      // 清除上一页选择的的多选框
      this.$refs.table.clearSelection()
      api.getAnnounceList((page - 1) * this.pageSize, this.pageSize).then(res => {
        this.announceList = res.data.data.results
      })
    },
    // 打开编辑对话框的回调
    onOpenEditDialog () {
      // todo 优化
      // 暂时解决 文本编辑器显示异常bug
      setTimeout(() => {
        if (document.createEvent) {
          let event = document.createEvent('HTMLEvents')
          event.initEvent('resize', true, true)
          window.dispatchEvent(event)
        } else if (document.createEventObject) {
          window.fireEvent('onresize')
        }
      }, 0)
    },
    // 编辑对话框 提交按钮
    submit () {
      window.alert(this.announce.content)
    }
  },
  mounted () {
    api.getAnnounceList(1, this.pageSize).then(res => {
      this.count = res.data.data.count
      this.announceList = res.data.data.results
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
  .title_input{
    margin-bottom: 20px;
  }
  .visible_box{
    margin-top: 10px;
    width: 205px;
    float: left;
  }
</style>
