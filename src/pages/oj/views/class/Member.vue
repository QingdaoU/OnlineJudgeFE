<template>
  <div>
    <div class="users-wrapper">
      <h3>Teachers 
        <Button 
          v-if="isAdminRole"
          @click="addTeacher()">
          + New teacher
        </Button>
      </h3>
      <table class="table-user" key="list">
        <tr>
          <th class="full-name">Full name</th>
          <th class="username">Username</th>
          <th class="email">Email</th>
          <th v-if="isAdminRole"></th>
        </tr>
        <tr v-for="teacher of teachersList" :key="teacher.user_id">
          <td class="full-name cell">
            <span
              v-if="!teacher.user_avatar"
              class="circle-avatar" 
              :style="{background: getRandomColor(teacher.user_username + teacher.user_id)}">
              {{teacher.user_fullname[0]}}
            </span>
            <img v-else :src="teacher.user_avatar" alt="img-avatar">
            {{teacher.user_fullname}}</td>
          <td class="username">{{teacher.user_username}}</td>
          <td class="email">{{teacher.user_email}}</td>
          <td v-if="isAdminRole" class="action">
            <Button 
              type="text" 
              shape="circle" 
              icon="trash-b"
              class="delete-btn"
              @click="deleteMember(teacher.user_id)">
            </Button>
          </td>
        </tr>
      </table>
      <div v-if="teachers.length > 3" class="action-wrapper">
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
          @click="addStudent()">
          + New student
        </Button>
      </h3>
      <table class="table-user" key="list">
        <tr>
          <th class="full-name">Full name</th>
          <th class="username">Username</th>
          <th class="email">Email</th>
          <th v-if="isAdminRole"></th>
        </tr>
        <tr v-for="student of students" :key="student.user_id">
          <td class="full-name cell">
            <span v-if="!student.user_avatar"
              class="circle-avatar" 
              :style="{background: getRandomColor(student.user_username + student.user_id)}">
              {{student.user_fullname[0]}}
            </span>
            <img v-else :src="student.user_avatar" alt="img-avatar">
            {{student.user_fullname}}</td>
          <td class="username">{{student.user_username}}</td>
          <td class="email">{{student.user_email}}</td>
          <td v-if="isAdminRole" class="action">
            <Button 
              type="text" 
              shape="circle" 
              icon="trash-b"
              class="delete-btn"
              @click="deleteMember(student.user_id)">
            </Button>
          </td>
        </tr>
      </table>
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
    margin-bottom: 13px;
    h3 {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--color-primary);
      border-bottom: 1px solid var(--color-primary);
    }

    .table-user {
      padding: 0 10px;
      tr {
        td, th {
          padding-top: 8px;
          padding-bottom: 8px;
          font-size: 14px;
          border-bottom: 1px solid rgba(187, 187, 187, 0.5);
        }
        &:last-child {
          td {
            border-bottom: none;
          }
        }
        .full-name {
          padding-left: 10px;
          text-align: left;
          width: 40%;
          
          &:not(.cell) {
            padding-left: 56px;
          }

          &.cell {
            display: flex;
            width: 100%;
            align-items: center;
            img {
              width: 36px;
              height: 36px;
              margin-right: 10px;
              border-radius: 36px;
              background-size: cover;
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
        }
        .username {
          text-align: left;
        }
        .email {
          text-align: left;
        } 
        .action {
          width: 50px;
          text-align: center;
        }
      }
    }
    .action-wrapper {
      display: flex;
      justify-content: center;
    }
  }
</style>
