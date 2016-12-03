<template>
  <div class="announcement view">
    <Panel title="Announcement">
      <div class="list">
        <el-table
          v-loading="loading"
          element-loading-text="loading"
          ref="table"
          :data="announcementList"
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
            label="Title"
            sortable
            width="220"
            show-tooltip-when-overflow>
          </el-table-column>
          <el-table-column
            prop="create_time"
            sortable
            label="CreateTime">
          </el-table-column>
          <el-table-column
            prop="last_update_time"
            sortable
            label="LastUpdateTime">
          </el-table-column>
          <el-table-column
            prop="created_by.username"
            sortable
            label="Author">
          </el-table-column>
          <el-table-column
            prop="visible"
            label="Status"
            width="100"
            :filters="[{ text: 'visible', value: 'visible' }, { text: 'invisible', value: 'invisible' }]"
            :filter-method="filterVisible"
            inline-template>
            <el-tag :type="row.visible ? 'success' : 'danger'" close-transition>{{row.visible ? 'visible' : 'invisible'}}</el-tag>
          </el-table-column>
          <el-table-column
            inline-template
            fixed="right"
            label="option"
            width="110">
            <span>
              <el-button type="text" size="small" @click="currentAnnouncementId = row.id,showEditAnnouncementDialog = true">Edit</el-button>
              <el-button type="text" size="small" @click="deleteAnnouncement(row.id)">Delete</el-button>
            </span>
          </el-table-column>
        </el-table>
        <div class="option">
          <el-button type="primary" size="small" @click="currentAnnouncementId = null, showEditAnnouncementDialog = true" icon="plus">Create</el-button>
          <el-button type="danger" size="small" :disabled="delBtnDisabled" icon="delete">Delete</el-button>
          <el-pagination
            class="page"
            layout="prev, pager, next"
            @current-change="currentChange"
            :page-size = "pageSize"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </Panel>
    <!--对话框-->
    <el-dialog :title="announcementDialogTitle" @open="onOpenEditDialog" v-model="showEditAnnouncementDialog">
      <el-input
        v-model="announcement.title"
        placeholder="title" class="title-input">
      </el-input>
      <Simditor v-model="announcement.content" placeholder="content"></Simditor>
      <div class="visible-box">
        <span>Status</span>
        <el-switch
          v-model="announcement.visible"
          :width="80"
          on-color="#13ce66"
          on-text=" Visible "
          off-text="Invisible"
          off-color="#ff4949">
        </el-switch>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="showEditAnnouncementDialog = false">Cancel</el-button>
        <el-button type="primary" @click.native="submit(),showEditAnnouncementDialog = false">Submit</el-button>
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
      Panel,
      Simditor
    },
    data () {
      return {
        // 删除按钮是否disabled
        delBtnDisabled: true,
        // 显示编辑公告对话框
        showEditAnnouncementDialog: false,
        // 公告列表
        announcementList: [
        ],
        // 一页显示的公告数
        pageSize: 5,
        // 总公告数
        total: 0,
        // 当前公告id
        currentAnnouncementId: null,
        // 公告 (new | edit) model
        announcement: {
          title: '',
          visible: true,
          content: ''
        },
        // 对话框标题
        announcementDialogTitle: 'Edit Announcement',
        // 是否显示loding
        loading: true
      }
    },
    methods: {
      // 处理多选回调
      multipleSelectionChange (items) {
        let len = items.length
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
        this.getAnnounceList((page - 1) * this.pageSize, this.pageSize)
      },
      getAnnounceList (offset, limit) {
        this.loading = true
        api.getAnnounceList(offset, limit).then(res => {
          this.loading = false
          this.total = res.data.data.total
          this.announcementList = res.data.data.results
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
      // 提交编辑
      submit () {
        api.modifyAnnouncement(this.currentAnnouncementId, this.announcement.title, this.announcement.content, this.announcement.visible)
      },
      // 删除公告
      deleteAnnouncement (announcementId) {
        this.$confirm('Do you really want to delete this announcement?', 'really?', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          api.deleteAnnouncement(announcementId)
        }).catch(() => {})
      }
    },
    watch: {
      'currentAnnouncementId' () {
        if (this.currentAnnouncementId !== null) {
          this.announcementDialogTitle = 'Edit Announcement'
          this.announcementList.find(item => {
            if (item.id === this.currentAnnouncementId) {
              this.announcement.title = item.title
              this.announcement.visible = item.visible
              this.announcement.content = item.content
            }
          })
        } else {
          this.announcementDialogTitle = 'Create Announcement'
          this.announcement.title = ''
          this.announcement.visible = true
          this.announcement.content = ''
        }
      }
    },
    mounted () {
      this.getAnnounceList(0, this.pageSize)
    }
  }
</script>

<style lang="less" scoped>
  .announcement {
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
  .title-input {
    margin-bottom: 20px;
  }
  .visible-box{
    margin-top: 10px;
    width: 205px;
    float: left;
  }
</style>
