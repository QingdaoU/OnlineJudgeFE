<template>
  <Panel shadow :padding="10">
    <div slot="title">
      <Breadcrumb>
        <BreadcrumbItem to="/class">Classes</BreadcrumbItem>
        <BreadcrumbItem v-if="selectedClass">{{selectedClassName}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="card-wrapper" v-if="!selectedClass">
      <div class="card-class" v-for="group of classList" :key="group.id" @click="handleSelectedClass(group.id)">
        <div class="header">{{group.name}}</div>
        <div class="body">
          <Badge :count="group.announcements">
            <Icon type="ios-bell"></Icon>
          </Badge>
          <Badge :count="group.quantity">
            <Icon type="ios-people"></Icon>
          </Badge>
          <Badge v-if="group.isContesting">
            <Icon type="ios-timer"></Icon>
          </Badge>
          <Badge v-else dot>
            <Icon type="ios-timer"></Icon>
          </Badge>
        </div>
      </div>
    </div>
    <ClassPanel v-else @activeTabChange="handleActiveTabChange($event)">
      <Home v-if="activeTab === '0'"></Home>
      <Announcement v-else-if="activeTab === '1'"></Announcement>
      <Contest v-else-if="activeTab === '2'"></Contest>
      <Grade v-else-if="activeTab === '3'"></Grade>
      <Member v-else></Member>
    </ClassPanel>
  </Panel>
</template>

<script>
  import ClassPanel from './ClassPanel.vue'
  import Home from './Home.vue'
  import Announcement from './Announcement.vue'
  import Contest from './Contest.vue'
  import Grade from './Grade.vue'
  import Member from './Member.vue'
  const mockupClasses = ['asd1esad', 'asdzx12e-asd', '21easdas', '12assda', '3r21asx-sad'].map((el, idx) => ({
    id: el,
    name: `${Math.floor(Math.random() * (12 - 10 + 1) + 10)}C${idx + 1}`,
    quantity: Math.floor(Math.random() * (35 - 25 + 1) + 25),
    announcements: Math.floor(Math.random() * (7 - 0 + 1) + 0),
    isContesting: idx % 2 === 0
  }))
  export default {
    name: 'Classes',
    components: {
      ClassPanel,
      Home,
      Announcement,
      Contest,
      Grade,
      Member
    },
    data () {
      return {
        classList: this.getClassList(),
        selectedClass: this.getSelectedClass(),
        activeTab: '0'
      }
    },
    mounted () {
    },
    methods: {
      getClassList () {
        return mockupClasses
      },
      getSelectedClass () {
        if (this.$router.history.current.name !== 'class-detail') {
          return null
        }
        return this.$router.history.current.params['id']
      },
      handleSelectedClass (classId) {
        this.$router.push(`/class/${classId}/detail`)
        this.selectedClass = classId
      },
      getClassName (classId) {
        const group = this.classList.length && this.classList.find(c => c.id === classId)
        return group['name']
      },
      handleActiveTabChange (event) {
        this.activeTab = event
      }
    },
    computed: {
      selectedClassName () {
        return this.getClassName(this.selectedClass)
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="less">
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px;
  .card-class {
    width: 250px;
    border: 1px solid #ececec;
    border-radius: 10px;
    background: #ce2a2a;
    cursor: pointer;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    }

    &:active {
      opacity: 0.8;
    }
    
    .header {
      height: 45px;
      line-height: 45px;
      font-size: 17px;
      padding: 0 10px;
      font-weight: 600;
      color: rgb(238, 238, 238);
      border-bottom: 1px solid #919191;
    }


    .body {
      background: white;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      height: 80px;
      padding: 10px;

      .ivu-badge {
        margin-top: 15px;

        &:not(:first-child) {
          margin-left: 30px;
        }

        i {
          font-size: 25px;
        }
      }
    }
  }
}
</style>
