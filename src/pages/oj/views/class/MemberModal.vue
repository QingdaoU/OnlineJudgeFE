<template>
  <Modal v-model="visibleModal" class="large" :width="450" @on-cancel="closeModal()">
    <div slot="header" class="modal-title">{{title}}</div>
    <Input v-model="labelSearch" placeholder="Search by email, username" @input="handleInputSearch($event)" style="margin-bottom: 10px"></Input>
    <div v-if="!users.length" style="text-align: center">No data match</div>
    <Form v-else ref="formMember" :model="formMember">
      <FormItem>
        <CheckboxGroup v-model="formMember.user_ids">
          <Checkbox 
            v-for="user in users" 
            :key="user.user_id" 
            :label="user.user_id"
            >
            <div class="avatar">
              <span
                v-if="!user.user_avatar"
                class="circle-avatar" 
                :style="{background: getRandomColor(user.user_username + user.user_id)}">
                {{user.user_fullname[0]}}
              </span>
              <img v-else :src="user.user_avatar" alt="img-avatar">
            </div>
            <div class="info">
              <span class="full-name">{{user.user_fullname}} ({{user.user_username}})</span>
              <span class="email">{{user.user_email}}</span>
            </div>
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
    <div slot="footer" style="display: none"></div>
  </Modal>
</template>

<script>
  import { FormMixin } from '@oj/components/mixins'
  import api from '@oj/api'
  import { randomColor } from '@/utils/constants'

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
      addRole: {
        type: Number,
        default: 1
      }
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
        },
        timeoutId: null,
        labelSearch: null
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
        this.labelSearch = null
      },
      getRandomColor (input) {
        return randomColor(input)
      },
      handleInputSearch (valueSearch) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          api.getUserCanAdd(this.activeClassroom.id, valueSearch).then(resp => {
            this.users = resp.data.data
          })
        }, 700)
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
    overflow-y: auto;
    .ivu-checkbox-group-item {
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      align-items: center;
      margin-bottom: 10px;
      padding-right: 10px;

      .avatar {
        width: 36px;
        height: 36px;
        margin-right: 10px;
        order: 1;

        img {
          width: 36px;
          height: 36px;
          border-radius: 36px;
        }
        .circle-avatar {
          width: 36px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          background: red;
          border-radius: 36px;
          font-size: 20px;
          margin-right: 10px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        line-height: 18px;
        width: 100%;

        .email {
          opacity: 0.7;
        }
      }
    }
  }

</style>
