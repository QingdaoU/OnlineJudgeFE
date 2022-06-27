<template>
  <div class="class-panel">
    <Menu :active-name="activeTab" class="menu" @on-select="handleSelected($event)">
      <MenuItem v-for="menu of classMenu" :key="menu.tab" :name="menu.tab">
        {{menu.title}}
      </MenuItem>
    </Menu>
    <div class="panel-body-wrapper">
      <div class="title">
        <span>{{classMenu[parseInt(activeTab)].title}}</span>
        <Button 
          v-if="isShowBtnAdd"
          @click="handleAddClick()">
          {{labelBtnAdd}}
        </Button>
      </div>
      <div class="content">
        <Home v-if="activeTab === '0'" :data="activeClassroom"></Home>
        <Announcement 
          v-else-if="activeTab === '1'" 
          :data="activeClassroom"
          @onEdit="openEditAnnouncement($event)"></Announcement>
        <Contest v-else-if="activeTab === '2'" :data="activeClassroom"></Contest>
        <Grade v-else-if="activeTab === '3'" :data="activeClassroom"></Grade>
        <Member v-else :data="activeClassroom"></Member>
      </div>
    </div>
    <AnnouncementModal 
      :visibleModal="activeModal === '1'"
      :activeClassroom="activeClassroom"
      :editedAnnouncementId="dataIdEdit"
      @visibleModalChange="handleCloseModal($event)"></AnnouncementModal>
  </div>
</template>

<script>
  import Home from './Home.vue'
  import Announcement from './Announcement.vue'
  import Contest from './Contest.vue'
  import Grade from './Grade.vue'
  import Member from './Member.vue'
  import AnnouncementModal from './AnnouncementModal.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ClassPanel',
    components: {
      Home,
      Announcement,
      Contest,
      Grade,
      Member,
      AnnouncementModal
    },
    data () {
      return {
        classMenu: [
          {title: 'Home', to: '/', tab: '0'},
          {title: 'Announcements', to: '/', tab: '1'},
          {title: 'Contest', to: '/', tab: '2'},
          {title: 'Grades', to: '/', tab: '3'},
          {title: 'Members', to: '/', tab: '4'}
        ],
        activeTab: '0',
        activeModal: null,
        dataIdEdit: null
      }
    },
    props: {
      activeClassroom: {}
    },
    methods: {
      handleSelected (event) {
        this.activeTab = event
        this.$emit('activeTabChange', this.activeTab)
      },
      handleAddClick () {
        this.activeModal = this.activeTab
      },
      handleCloseModal ({status, shouldUpdate}) {
        this.activeModal = status
        this.dataIdEdit = null
        // if (!status) {
        //   this.edited = null
        // }
        if (shouldUpdate) {
          this.$emit('should-announcement-update', true)
        }
      },
      openEditAnnouncement (id) {
        this.dataIdEdit = id
        this.handleAddClick()
      }
    },
    computed: {
      ...mapGetters(['isAdminRole']),
      isShowBtnAdd () {
        const activeTabShowBtnAdd = ['1', '2', '3']
        return this.isAdminRole && activeTabShowBtnAdd.includes(this.activeTab)
      },
      labelBtnAdd () {
        switch (this.activeTab) {
          case '1':
            return '+ New announcement'
          default:
            return '+ New'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .class-panel {
    display: flex;

    .panel-body-wrapper {
      width: 100%;

      .title {
        font-size: 23px;
        border-bottom: 1px solid #eee;
        padding: 5px 15px;
        color: #3b76e6;
        display: flex;
        justify-content: space-between;
      }

      .content {
        padding: 15px;
      }
    }

    .menu {
      width: 175px !important;

      .ivu-menu-item {
        font-size: 12px;
      }
    }
  }
</style>
