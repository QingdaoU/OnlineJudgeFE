<template>
  <Modal v-model="visibleModal" class="large" :width="1200" @on-cancel="closeModal()">
    <div slot="header" class="modal-title">{{title}}</div>
    <div>
      <Form ref="formAnnouncement" :model="formAnnouncement" :rules="ruleAnnouncement">
        <FormItem prop="title">
          <Input type="text" v-model="formAnnouncement.title" placeholder="Title" size="large">
            <Icon type="ios-information-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="content">
          <Simditor v-model="formAnnouncement.content"></Simditor>
        </FormItem>
        <FormItem prop="visible">
          <i-switch v-model="formAnnouncement.visible" size="large">
            <span slot="open">Visible</span>
            <span slot="close">Invisible</span>
          </i-switch>
        </FormItem>
      </Form>
      <div class="footer">
        <Button
          type="primary"
          @click="handleUpdateAnnouncement()"
          class="btn" long
          :loading="btnLoading">
          {{btnLabel}}
        </Button>
      </div>
    </div>
    <div slot="footer" style="display: none"></div>
  </Modal>
</template>

<script>
  import Simditor from '@admin/components/Simditor.vue'
  import { FormMixin } from '@oj/components/mixins'
  import api from '@oj/api'

  export default {
    name: 'AnnouncementModal',
    mixins: [FormMixin],
    components: {
      Simditor
    },
    props: {
      visibleModal: {
        type: Boolean,
        default: false
      },
      editedAnnouncementId: {
        default: null
      },
      activeClassroom: {}
    },
    data () {
      return {
        btnLoading: false,
        formAnnouncement: {
          title: '',
          content: '',
          visible: false
        },
        ruleAnnouncement: {
          title: [
            {required: true, trigger: 'blur'}
          ],
          content: [
            {required: true, trigger: 'blur'}
          ],
          visible: false
        }
      }
    },
    methods: {
      handleUpdateAnnouncement () {
        this.btnLoading = true
        if (!this.editedAnnouncementId) {
          api.createAnnouncement(this.activeClassroom.id, this.formAnnouncement).then(resp => {
            this.btnLoading = false
            if (!resp.error) {
              this.closeModal(true)
            }
          })
        } else {
          // api.updateClassroom(this.formAnnouncement).then(resp => {
          //   this.btnLoading = false
          //   if (!resp.error) {
          //     this.closeModal(true)
          //   }
          // })
        }
      },
      closeModal (shouldUpdate) {
        const data = {
          title: '',
          content: '',
          visible: false
        }
        this.$emit('visibleModalChange', {status: false, shouldUpdate})
        this.updateFormData(data)
      },
      setupFormData () {
        // api.getClassroom(this.editedAnnouncementId).then(resp => {
        //   if (!resp.data.data) {
        //     return
        //   }
        //   this.updateFormData(resp.data.data)
        // })
      },
      updateFormData (data) {
        this.$refs['formAnnouncement'].resetFields()
        this.formAnnouncement = {...this.formAnnouncement, ...data}
      }
    },
    computed: {
      btnLabel () {
        return !this.editedAnnouncementId ? 'Create' : 'Update'
      },
      title () {
        return (!this.editedAnnouncementId ? 'Create New' : 'Update') + ' Classroom'
      }
    },
    watch: {
      'editedAnnouncementId' (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          this.setupFormData()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-switch-large {
    width: 80px;
  }
  .ivu-switch-large.ivu-switch-checked:after {
    left: 57px;
  }
  .footer {
    overflow: auto;
    margin-top: 20px;
    margin-bottom: -15px;
    text-align: left;
    .btn {
      margin: 0 0 15px 0;
      &:last-child {
        margin: 0;
      }
    }
  }
</style>
