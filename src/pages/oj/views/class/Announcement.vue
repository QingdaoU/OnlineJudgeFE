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
    <template v-if="listVisible">
      <ul class="announcements-wrapper" key="list">
        <li v-for="announcement in announcements" :key="announcement.title">
          <div class="flex-container">
            <div class="title"><a class="entry" @click="goAnnouncement(announcement.id)">
              {{announcement.title}}</a></div>
            <div class="date">{{announcement.create_time | localtime }}</div>
          </div>
        </li>
      </ul>
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
  import Pagination from '@oj/components/Pagination'
  export default {
    name: 'Announcements',
    components: {
      Pagination
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
      }
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

    li {
      padding-top: 15px;
      list-style: none;
      padding-bottom: 15px;
      font-size: 16px;
      border-bottom: 1px solid rgba(187, 187, 187, 0.5);
      &:last-child {
        border-bottom: none;
      }
      .flex-container {
        .title {
          flex: 1 1;
          text-align: left;
          padding-left: 10px;
          a.entry {
            color: #495060;
            &:hover {
              color: #2d8cf0;
              border-bottom: 1px solid #2d8cf0;
            }
          }
        }
        .creator {
          flex: none;
          width: 200px;
          text-align: center;
        }
        .date {
          flex: none;
          width: 200px;
          text-align: center;
        }
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
