<template>
  <div class="announcements-wrapper">
    <transition-group name="announcement-animate" mode="in-out">
      <template v-if="announcement">
        <div v-katex v-html="announcement.content" key="content" class="content-container markdown-body"></div>
      </template>
      <div class="no-announcement" v-else-if="!announcement && !announcements.length" key="no-announcement">
        <p>{{$t('m.No_Announcements')}}</p>
      </div>
      <template v-else>
        <table class="table-announcements" key="list">
          <tr>
            <th class="title">Title</th>
            <th class="last-update">Last update at</th>
            <th class="create-at">Create at</th>
            <th class="create-by">Create by</th>
            <th v-if="isAdminRole"></th>
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
        announcement: ''
      }
    },
    props: {
      data: {}
    },
    mounted () {
      this.$parent.$on('should-announcement-update', () => {
        this.setupAnnouncements()
        this.announcement = null
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
            this.$emit('detailModeChange', true)
          }
        })
      },
      goBack () {
        this.announcement = null
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
