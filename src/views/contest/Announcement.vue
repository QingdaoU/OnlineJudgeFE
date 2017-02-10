<template>
  <div class="announcement view">
    <Panel title="Contest Announcement">
      <div class="list">
        <el-table
          v-loading="loading"
          element-loading-text="loading"
          ref="table"
          :data="announcementList"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="Title">
          </el-table-column>
          <el-table-column
            prop="created_by.username"
            label="Author">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="CreateTime">
          </el-table-column>
          <el-table-column
            inline-template
            fixed="right"
            label="Option">
            <span>
              <el-button type="text" size="small" @click="deleteAnnouncement(row.id)">Delete</el-button>
            </span>
          </el-table-column>
        </el-table>
        <div class="option">
          <el-button type="primary" size="small" @click="openAnnouncementDialog()" icon="plus">Create</el-button>
        </div>
      </div>
    </Panel>
    <!--对话框-->
    <el-dialog title="Create Contest Announcement" @open="openAnnouncementDialog" v-model="showEditAnnouncementDialog">
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
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click.native="showEditAnnouncementDialog = false">Cancel</el-button>
          <el-button type="primary" @click.native="saveAnnouncement()">Submit</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../api.js'

  export default {
    name: 'Announcement',
    data () {
      return {
        showEditAnnouncementDialog: false,
        // 公告列表
        announcementList: [
        ],
        announcement: {
          title: '',
          content: '',
          contest_id: ''
        },
        // 是否显示loading
        loading: true
      }
    },
    methods: {
      getContestAnnouncementList () {
        this.loading = true
        api.getContestAnnouncementList(this.$route.params.contestId).then(res => {
          this.announcementList = res.data.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      openAnnouncementDialog () {
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
        this.showEditAnnouncementDialog = true
      },
      // 提交编辑
      saveAnnouncement () {
        this.announcement.contest_id = this.$route.params.contestId
        api.createContestAnnouncement(this.announcement).then(() => {
          this.showEditAnnouncementDialog = false
          this.announcement.title = this.announcement.content = ''
          this.getContestAnnouncementList()
        }).catch(() => {
          this.showEditAnnouncementDialog = false
        })
      },
      // 删除公告
      deleteAnnouncement (announcementId) {
        this.$confirm('Are you sure you want to delete this announcement?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.loading = true
          api.deleteContestAnnouncement(announcementId).then(res => {
            this.getContestAnnouncementList()
          })
        }).catch(() => {})
      }
    },
    mounted () {
      this.getContestAnnouncementList()
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
