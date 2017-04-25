<template>
  <div class="announcement view">
    <Panel title="Announcement">
      <div class="list">
        <el-table
          v-loading="loading"
          element-loading-text="loading"
          ref="table"
          :data="announcementList"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="title"
            label="Title">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="CreateTime">
          </el-table-column>
          <el-table-column
            prop="last_update_time"
            label="LastUpdateTime">
          </el-table-column>
          <el-table-column
            prop="created_by.username"
            label="Author">
          </el-table-column>
          <el-table-column
            prop="visible"
            label="Status"
            inline-template>
            <el-tag :type="row.visible ? 'success' : 'danger'">{{row.visible ? 'Visible' : 'Invisible'}}</el-tag>
          </el-table-column>
          <el-table-column
            inline-template
            fixed="right"
            label="Option">
            <div>
              <icon-btn name="Edit" icon="edit" @click.native="openAnnouncementDialog(row.id)"></icon-btn>
              <icon-btn name="Delete" icon="trash" @click.native="deleteAnnouncement(row.id)"></icon-btn>
            </div>
          </el-table-column>
        </el-table>
        <div class="option">
          <el-button type="primary" size="small" @click="openAnnouncementDialog(null)" icon="plus">Create</el-button>
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
      <el-form label-position="top">
        <el-form-item label="Title" required>
          <el-input
            v-model="announcement.title"
            placeholder="Title" class="title-input">
          </el-input>
        </el-form-item>
        <el-form-item label="Content" required>
          <Simditor v-model="announcement.content"></Simditor>
        </el-form-item>
        <div class="visible-box">
          <span>Status</span>
          <el-switch
            v-model="announcement.visible"
            on-text=""
            off-text="">
          </el-switch>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <cancel @click.native="showEditAnnouncementDialog = false"></cancel>
          <save type="primary" @click.native="saveAnnouncement()"></save>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Simditor from '../../components/Simditor.vue'
  import api from '../../api.js'
  export default {
    name: 'Announcement',
    components: {
      Simditor
    },
    data () {
      return {
        // 显示编辑公告对话框
        showEditAnnouncementDialog: false,
        // 公告列表
        announcementList: [
        ],
        // 一页显示的公告数
        pageSize: 15,
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
        // 是否显示loading
        loading: true,
        // 当前页码
        currentPage: 0
      }
    },
    methods: {
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getAnnouncementList((page - 1) * this.pageSize, this.pageSize)
      },
      getAnnouncementList (page) {
        this.loading = true
        api.getAnnouncementList((page - 1) * this.pageSize, this.pageSize).then(res => {
          this.loading = false
          this.total = res.data.data.total
          this.announcementList = res.data.data.results
        }, res => {
          this.loading = false
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
      saveAnnouncement () {
        if (this.currentAnnouncementId) {
          api.modifyAnnouncement(this.currentAnnouncementId, this.announcement.title, this.announcement.content, this.announcement.visible).then(res => {
            this.showEditAnnouncementDialog = false
            this.getAnnouncementList(this.currentPage - 1)
          }).catch(() => {})
        } else {
          api.createAnnouncement(this.announcement.title, this.announcement.content, this.announcement.visible).then(res => {
            this.showEditAnnouncementDialog = false
            this.getAnnouncementList(this.currentPage)
          }).catch(() => {})
        }
      },
      // 删除公告
      deleteAnnouncement (announcementId) {
        this.$confirm('Are you sure you want to delete this announcement?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.loading = true
          api.deleteAnnouncement(announcementId).then(res => {
            this.getAnnouncementList(this.currentPage)
          })
        }).catch(() => {})
      },
      openAnnouncementDialog (id) {
        this.showEditAnnouncementDialog = true
        if (id !== null) {
          this.currentAnnouncementId = id
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
      this.getAnnouncementList(1)
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
