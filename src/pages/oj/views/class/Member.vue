<template>
  <div>
    <div class="users-wrapper">
      <h3>Teachers 
        <Button 
          v-if="isAdminRole"
          type="primary" 
          shape="circle" 
          icon="plus"
          @click="addTeacher()">
        </Button>
      </h3>
      <ul>
        <li v-for="(teacher, index) of teachersList" :key="index">
          <div 
            class="circle-avatar" 
            :style="{background: getRandomColor(teacher.user_username + teacher.user_id)}">
              {{teacher.user_fullname && teacher.user_fullname[0]}}
            </div>
          <span>{{teacher.user_fullname}}</span>
          <Button 
            v-if="isAdminRole"
            type="text" 
            shape="circle" 
            icon="trash-b"
            class="delete-btn"
            @click="deleteMember(teacher.user_id)">
          </Button>
        </li>
      </ul>
      <div class="action-wrapper">
        <Button
          type="ghost" 
          shape="circle"
          @click="handleShowLengthTeachers()">
          {{!this.isShowMoreTeacher ? 'Show more' : 'Show less'}}
        </Button>
      </div>
    </div>
    <div class="users-wrapper">
      <h3>Students
        <Button 
          v-if="isAdminRole"
          type="primary" 
          shape="circle" 
          icon="plus"
          @click="addStudent()">
        </Button>
      </h3>
      <ul>
        <li v-for="(student, index) of students" :key="index">
          <div 
            class="circle-avatar" 
            :style="{background: getRandomColor(student.user_username + student.user_id)}">
              {{student.user_fullname[0]}}
            </div>
          <span>{{student.user_fullname}}</span>
          <Button 
            v-if="isAdminRole"
            type="text" 
            shape="circle" 
            icon="trash-b"
            class="delete-btn"
            @click="deleteMember(student.user_id)">
          </Button>
        </li>
      </ul>
    </div>
    <MemberModal 
      :visibleModal="isVisibleMemberModal"
      :activeClassroom="data"
      :addRole="addRole"
      @visibleModalChange="onCloseMemberModal($event)"
      ></MemberModal>
  </div>
</template>

<script>
  import { randomColor } from '@/utils/constants'
  import api from '@oj/api'
import { mapGetters } from 'vuex'
  import MemberModal from './MemberModal.vue'

  export default {
    name: 'Member',
    components: {
      MemberModal
    },
    props: {
      data: {}
    },
    data () {
      return {
        isShowMoreTeacher: false,
        teachers: [],
        students: [],
        isVisibleMemberModal: false,
        addRole: 1
      }
    },
    mounted () {
      this.handleMembers()
    },
    methods: {
      handleMembers () {
        api.getMembersClassroom(this.data.id).then(resp => {
          if (!resp.err) {
            this.setupStudents(resp.data.data)
            this.setupTeachers(resp.data.data)
          }
        })
      },
      handleShowLengthTeachers () {
        this.isShowMoreTeacher = !this.isShowMoreTeacher
      },
      setupStudents (listMember) {
        const data = listMember.find(m => m.role_id === 2)
        this.students = data['members']
      },
      setupTeachers (listMember) {
        const data = listMember.find(m => m.role_id === 1)
        this.teachers = data['members']
      },
      addTeacher () {
        this.openMemberModal(1)
      },
      addStudent () {
        this.openMemberModal(2)
      },
      openMemberModal (role) {
        this.isVisibleMemberModal = true
        this.addRole = role
      },
      onCloseMemberModal ({status, shouldUpdate}) {
        this.isVisibleMemberModal = status
        if (shouldUpdate) {
          this.handleMembers()
        }
      },
      getRandomColor (input) {
        return randomColor(input)
      },
      deleteMember (userId) {
        this.$Modal.confirm({
          content: 'Are you sure to delete this member',
          onOk: () => {
            // still error here, not fix yet
            api.deleteMemberClassroom(this.data.id, userId).then(resp => {
              if (!resp.error) {
                this.$success('Delete successfully')
                this.handleMembers()
              } else {
                this.$error('Some thing went wrong')
              }
            }).catch(err => {
              this.$error('Some thing went wrong ', err)
            })
          }
        })
      }
    },
    computed: {
      ...mapGetters(['isAdminRole']),
      teachersList () {
        return !this.isShowMoreTeacher ? this.teachers.slice(0, 3) : this.teachers
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-table td:nth-child(even){
    background-color: #2db7f5 !important;
    color: #fff !important;
  }

  .users-wrapper {
    h3 {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      color: var(--color-primary);
      border-bottom: 1px solid var(--color-primary);
    }
    ul {
      list-style: none;
      padding-top: 5px;

      li {
        display: flex;
        align-items: center;
        padding: 15px;
        position: relative;

        &:not(:last-child) {
          border-bottom: 1px solid #eee;
        }

        .circle-avatar {
          width: 36px;
          height: 36px;
          color: white;
          background: red;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 36px;
          font-size: 20px;
          margin-right: 10px;
        }

        .delete-btn {
          position: absolute;
          top: calc(50% - 17px);
          right: 15px;
        }
      }
    }
    .action-wrapper {
      display: flex;
      justify-content: center;
    }
  }
</style>
