<template>
  <div class="aboutus view">
    <Panel :title="$t('m.AboutUs')">
      <div class="list">
        <el-table
          v-loading="loading"
          element-loading-text="loading"
          ref="table"
          :data="aboutusList"
          style="width: 100%">
          <el-table-column
            prop="last_update_time"
            label="LastUpdateTime">
            <template slot-scope="scope">
              {{scope.row.last_update_time | localtime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="created_by.username"
            label="Author">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Option"
            width="200">
            <div slot-scope="scope">
              <icon-btn name="Edit" icon="edit" @click.native="openAboutUsDialog(scope.row.id)"></icon-btn>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </Panel>
    <!--对话框-->
    <el-dialog :title="aboutusDialogTitle" :visible.sync="showEditAboutUsDialog"
               @open="onOpenEditDialog" :close-on-click-modal="false">
      <el-form label-position="top">
        <el-form-item :label="$t('m.Announcement_Title')" required>
          <el-input
            v-model="aboutus.title"
            :placeholder="$t('m.Announcement_Title')" class="title-input">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('m.Announcement_Content')" required>
          <Simditor v-model="aboutus.content"></Simditor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <cancel @click.native="showEditAboutUsDialog = false"></cancel>
          <save type="primary" @click.native="submitAboutUs"></save>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Simditor from '../../components/Simditor.vue'
  import api from '../../api.js'

  export default {
    name: 'AboutUs',
    components: {
      Simditor
    },
    data () {
      return {
        contestID: '',
        // 显示编辑公告对话框
        showEditAboutUsDialog: false,
        // 公告列表
        aboutusList: [],
        // 一页显示的公告数
        pageSize: 15,
        // 总公告数
        total: 0,
        // 当前公告id
        currentAboutUsId: null,
        mode: 'create',
        // 公告 (new | edit) model
        aboutus: {
          title: '',
          content: ''
        },
        // 对话框标题
        aboutusDialogTitle: 'Edit AboutUs',
        // 是否显示loading
        loading: true,
        // 当前页码
        currentPage: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.getAboutUsList(1)
      },
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getAboutUsList(page)
      },
      getAboutUsList (page) {
        this.loading = true
        api.getAboutUsList((page - 1) * this.pageSize, this.pageSize).then(res => {
          this.loading = false
          this.total = res.data.data.total
          this.aboutusList = res.data.data.results
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
      // 默认传入MouseEvent
      submitAboutUs (data = undefined) {
        let funcName = ''
        if (!data.title) {
          data = {
            content: this.aboutus.content
          }
        }
        funcName = this.mode === 'edit' ? 'updateAboutUs' : 'updateAboutUs'
        api[funcName](data).then(res => {
          this.showEditAboutUsDialog = false
          this.init()
        }).catch()
      },
      openAboutUsDialog (id) {
        this.showEditAboutUsDialog = true
        if (id !== null) {
          this.aboutusDialogTitle = 'Edit AboutUs'
          this.aboutusList.find(item => {
            if (item.id === this.currentAboutUsId) {
              this.aboutus.content = item.content
              this.mode = 'edit'
            }
          })
        } else {
          this.aboutusDialogTitle = 'Create AboutUs'
          this.aboutus.content = ''
          this.mode = 'create'
        }
      },
      handleVisibleSwitch (row) {
        this.mode = 'edit'
        this.submitAboutUs({
          content: row.content
        })
      }
    },
    watch: {
      $route () {
        this.init()
      }
    }
  }
</script>

<style lang="less" scoped>
  .title-input {
    margin-bottom: 20px;
  }

  .visible-box {
    margin-top: 10px;
    width: 205px;
    float: left;
  }
</style>
