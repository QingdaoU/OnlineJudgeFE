<template>
  <Modal v-model="visibleModal" :width="400" @on-cancel="closeModal()">
    <div slot="header" class="modal-title">{{title}}</div>
    <div>
      <Form ref="formClassroom" :model="formClassroom" :rules="ruleClassroom">
        <FormItem prop="name">
          <Input type="text" v-model="formClassroom.name" placeholder="Name" size="large">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="subject_name">
          <Input type="text" v-model="formClassroom.subject_name" placeholder="Subject Name" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="room_name">
          <Input type="text" v-model="formClassroom.room_name" placeholder="Room Name" size="large">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="group_name">
          <Input type="text" v-model="formClassroom.group_name" placeholder="Group Name" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="description">
          <Input type="text" v-model="formClassroom.description" placeholder="Description" size="large">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="visible">
          <i-switch v-model="formClassroom.visible" size="large">
            <span slot="open">Visible</span>
            <span slot="close">Invisible</span>
          </i-switch>
        </FormItem>
      </Form>
      <div class="footer">
        <Button
          type="primary"
          @click="handleUpdateClassroom()"
          class="btn" long
          :loading="btnLoginLoading">
          {{btnLabel}}
        </Button>
      </div>
    </div>
    <div slot="footer" style="display: none"></div>
  </Modal>
</template>

<script>
  import { FormMixin } from '@oj/components/mixins'
  import api from '@oj/api'

  export default {
    name: 'ClassroomModal',
    mixins: [FormMixin],
    props: {
      visibleModal: {
        type: Boolean,
        default: false
      },
      editedClassroomId: {
        default: null
      }
    },
    data () {
      return {
        btnLoginLoading: false,
        formClassroom: {
          name: '',
          subject_name: '',
          room_name: '',
          group_name: '',
          description: '',
          visible: false
        },
        ruleClassroom: {
          name: [
            {required: true, trigger: 'blur'}
          ],
          subject_name: [
            {required: true, trigger: 'blur'}
          ],
          room_name: [
            {required: true, trigger: 'blur'}
          ],
          group_name: [
            {required: true, trigger: 'blur'}
          ],
          description: [
            {required: true, trigger: 'blur'}
          ],
          visible: false
        }
      }
    },
    methods: {
      handleUpdateClassroom () {
        this.btnLoginLoading = true
        if (!this.editedClassroomId) {
          api.createClassroom(this.formClassroom).then(resp => {
            this.btnLoginLoading = false
            if (!resp.error) {
              this.closeModal(true)
            }
          })
        } else {
          api.updateClassroom(this.formClassroom).then(resp => {
            this.btnLoginLoading = false
            if (!resp.error) {
              this.closeModal(true)
            }
          })
        }
      },
      closeModal (shouldUpdate) {
        const data = {
          name: '',
          subject_name: '',
          room_name: '',
          group_name: '',
          description: '',
          visible: false
        }
        this.$emit('visibleModalChange', {status: false, shouldUpdate})
        this.updateFormData(data)
      },
      setupFormData () {
        api.getClassroom(this.editedClassroomId).then(resp => {
          if (!resp.data.data) {
            return
          }
          this.updateFormData(resp.data.data)
        })
      },
      updateFormData (data) {
        this.$refs['formClassroom'].resetFields()
        this.formClassroom = {...this.formClassroom, ...data}
      }
    },
    computed: {
      btnLabel () {
        return !this.editedClassroomId ? 'Create' : 'Update'
      },
      title () {
        return (!this.editedClassroomId ? 'Create New' : 'Update') + ' Classroom'
      }
    },
    watch: {
      'editedClassroomId' (newValue, oldValue) {
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
