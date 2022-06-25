<template>
  <Modal v-model="visibleModal" class="large" :width="500" @on-cancel="closeModal()">
    <div slot="header" class="modal-title">{{title}}</div>
    <div>
      <Form ref="formMember" :model="formMember">
        <FormItem>
          <CheckboxGroup v-model="formMember.user_ids">
            <Checkbox 
              v-for="user in users" 
              :key="user.user_id" 
              :label="user.user_id">
              {{user.user_fullname}} ({{user.user_username}})
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
      <div class="footer">
        <Button
          type="primary"
          @click="handleUpdateMember()"
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
  import { FormMixin } from '@oj/components/mixins'
  import api from '@oj/api'

  export default {
    name: 'MemberModal',
    mixins: [FormMixin],
    components: {
    },
    props: {
      visibleModal: {
        type: Boolean,
        default: false
      },
      activeClassroom: {},
      addRole: 1
    },
    mounted () {
    },
    data () {
      return {
        btnLabel: 'Add',
        btnLoading: false,
        users: [],
        formMember: {
          user_ids: []
        }
      }
    },
    methods: {
      closeModal (shouldUpdate) {
        this.$emit('visibleModalChange', {status: false, shouldUpdate})
        this.resetForm()
      },
      handleUpdateMember () {
        this.btnLoading = true
        api.addMembersClassroom(
          this.activeClassroom.id,
          {...this.formMember, role_id: this.addRole}
        ).then(resp => {
          this.btnLoading = false
          if (!resp.error) {
            this.closeModal(true)
          }
        })
      },
      resetForm () {
        this.formMember = {...this.formMember, user_ids: []}
      }
    },
    computed: {
      title () {
        return 'Add ' + (this.addRole === 1 ? 'teachers' : 'students')
      }
    },
    watch: {
      'visibleModal' (curValue) {
        if (curValue) {
          api.getUserCanAdd(this.activeClassroom.id).then(resp => {
            this.users = resp.data.data
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">

  .ivu-form  {
    max-height: 70vh;
    overflow-y: scroll;
    .ivu-checkbox-group {
      display: flex;
      flex-direction: column;
    }
  }

</style>
