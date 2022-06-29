<template>
  <div class="announcements-wrapper">
    <div class="action-wrapper">
      <Button v-if="listVisible" type="info" @click="setupAnnouncements" :loading="btnLoading">{{$t('m.Refresh')}}</Button>
      <Button v-else type="ghost" icon="ios-undo" @click="goBack">{{$t('m.Back')}}</Button>
    </div>

    <transition-group name="announcement-animate" mode="in-out">
      <div class="no-announcement" v-if="!announcements.length" key="no-announcement">
        <p>{{$t('m.No_Announcements')}}</p>
      </div>
      <template v-if="listVisible && announcements.length">
        <table class="table-announcements" key="list">
          <tr>
            <th class="title">Title</th>
            <th class="last-update">Last update at</th>
            <th class="create-at">Create at</th>
            <th class="create-by">Create by</th>
            <th  v-if="isAdminRole"></th>
          </tr>
          <tr v-for="announcement in announcements" :key="announcement.title">
            <td class="title">
              <a class="entry" @click="goAnnouncement(announcement.id)">
                {{announcement.title}}
              </a>
            </td>
            <td class="last-update">{{announcement.last_update_time | localtime}}</td>
            <td class="create-at">{{announcement.create_time | localtime}}</td>
            <td class="create-by">{{announcement.author_fullname}}</td>
            <td class="action" v-if="isAdminRole">
              <Dropdown 
                trigger="click" 
                placement="bottom-end" 
                @on-click="handleSelectDropdown($event, announcement.id)">
                <Button 
                  type="text" 
                  shape="circle" 
                  icon="more"></Button>
                <DropdownMenu slot="list">
                  <DropdownItem name="0">Edit</DropdownItem>
                  <DropdownItem name="1">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        </table>
        <!-- <Table :columns="columnAnnouncements" :data="announcements"></Table> -->
        <!-- <ul class="announcements-wrapper" key="list">
          <li v-for="announcement in announcements" :key="announcement.title">
            <div class="flex-container">
              <div class="title"><a class="entry" @click="goAnnouncement(announcement.id)">
                {{announcement.title}}</a></div>
              <div class="date">{{announcement.create_time | localtime }}</div>
            </div>
          </li>
        </ul> -->
        <!-- <table>
          <tr>
            <th>Title</th>
            <th>Last update at</th>
            <th>Create at</th>
            <th>Create by</th>
            <th></th>
          </tr>
          <tr v-for="announcement in announcements" :key="announcement.title">
            <th>
              <a class="entry" @click="goAnnouncement(announcement.id)">
                {{announcement.title}}
              </a>
            </th>
            <th>{{announcement.last_update_time | localtime}}</th>
            <th>{{announcement.create_time | localtime}}</th>
            <th>{{announcement.author_fullname}}</th>
            <th>asdd</th>
          </tr>
        </table> -->
        <!-- <Pagination v-if="!isContest"
                    key="page"
                    :total="total"
                    :page-size="limit"
                    @on-change="getAnnouncementList">
        </Pagination> -->
      </template>

      <template v-else>
        <div v-katex v-html="announcement.content" key="content" class="content-container markdown-body"></div>
      </template>
    </transition-group>
  </div>
</template>

<script>
  import api from '@oj/api'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Announcements',
    components: {
    },
    data () {
      return {
        limit: 10,
        total: 10,
        btnLoading: false,
        announcements: [],
        announcement: '',
        listVisible: true
      }
    },
    props: {
      data: {}
    },
    mounted () {
      this.$parent.$on('should-announcement-update', () => {
        this.setupAnnouncements()
      })
      this.setupAnnouncements()
    },
    methods: {
      setupAnnouncements () {
        api.getAnnouncements(this.data.id).then(resp => {
          this.announcements = resp.data.data
        })
      },
      goAnnouncement (announcementId) {
        api.getAnnouncement(this.data.id, announcementId).then(resp => {
          if (resp.data.data) {
            this.announcement = resp.data.data
            this.listVisible = false
          }
        })
      },
      goBack () {
        this.listVisible = true
        this.announcement = ''
      },
      handleSelectDropdown (event, id) {
        switch (event) {
          case '0':
            this.$emit('onEdit', id)
            break
          default:
            this.$Modal.confirm({
              content: 'Are you sure to delete this announcement',
              onOk: () => {
                // still error here, not fix yet
                api.deleteAnnouncement(this.data.id, id).then(resp => {
                  if (!resp.error) {
                    this.$success('Delete successfully')
                    this.setupAnnouncements()
                  } else {
                    this.$error('Some thing went wrong')
                  }
                }).catch(err => {
                  this.$error('Some thing went wrong ', err)
                })
              }
            })
            break
        }
      }
    },
    computed: {
      ...mapGetters(['isAdminRole'])
    }
  }
</script>

<style scoped lang="less">
  .announcements-wrapper {
    margin-top: -10px;
    margin-bottom: 10px;

    .action-wrapper {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
    }

    .table-announcements {
      tr {
        td {
          padding-top: 10px;
          padding-bottom: 10px;
          font-size: 16px;
          border-bottom: 1px solid rgba(187, 187, 187, 0.5);
        }

        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
      .title {
        text-align: left;
        padding-left: 10px;
        width: 50%;
        a.entry {
          color: #495060;
          &:hover {
            color: #2d8cf0;
            border-bottom: 1px solid #2d8cf0;
          }
        }
      }
      .last-update {
        text-align: left;
      }
      .create-at {
        text-align: left;
      }
      .create-by {
        text-align: left;
        width: 15%;
      }
      .action {
        width: 35px;
        text-align: left;
      }
    }

    // li {
    //   padding-top: 15px;
    //   list-style: none;
    //   padding-bottom: 15px;
    //   font-size: 16px;
    //   border-bottom: 1px solid rgba(187, 187, 187, 0.5);
    //   &:last-child {
    //     border-bottom: none;
    //   }
      // .flex-container {
      //   .title {
      //     flex: 1 1;
      //     text-align: left;
      //     padding-left: 10px;
      //     a.entry {
      //       color: #495060;
      //       &:hover {
      //         color: #2d8cf0;
      //         border-bottom: 1px solid #2d8cf0;
      //       }
      //     }
      //   }
      //   .creator {
      //     flex: none;
      //     width: 200px;
      //     text-align: center;
      //   }
      //   .date {
      //     flex: none;
      //     width: 200px;
      //     text-align: center;
      //   }
      // }
    // }
    .content-container {
      padding: 0 20px 20px 20px;
    }
  }

  
  .no-announcement {
    text-align: center;
    font-size: 16px;
  }changeLocale

  .announcement-animate-enter-active {
    animation: fadeIn 1s;
  }
</style>
