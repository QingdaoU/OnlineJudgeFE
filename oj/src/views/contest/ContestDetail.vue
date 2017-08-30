<template>
  <div class="flex-container">
    <div id="contest-main">
      <!--children-->
      <router-view></router-view>
      <!--children end-->
      <div class="flex-container">
        <template v-if="route_name === 'contest-details'">
          <div id="contest-desc">
            <Panel :padding="20" shadow>
              <div slot="title">
                {{contest.title}}
              </div>
              <div v-html="contest.description"></div>
            </Panel>
            <Table id="contest-info" :columns="columns" :data="contest_table" disabled-hover></Table>
          </div>
        </template>
      </div>

    </div>
    <div v-if="showMenu" id="contest-menu">
      <VerticalMenu @on-click="handleRoute">
        <VerticalMenu-item :disabled="isDisabled"
                           :route="{name: 'contest-problem-list', params: {contestID: contestID}}">
          <Icon type="ios-photos"></Icon>
          Problems
        </VerticalMenu-item>

        <VerticalMenu-item :disabled="isDisabled"
                           :route="{name: 'contest-announcement-list', params: {contestID: contestID}}">
          <Icon type="chatbubble-working"></Icon>
          Announcements
        </VerticalMenu-item>

        <VerticalMenu-item :disabled="isDisabled"
                           :route="{name: 'submission-list' ,query: {contestID: contestID}}">
          <Icon type="navicon-round"></Icon>
          Submissions
        </VerticalMenu-item>

        <VerticalMenu-item :disabled="isDisabled"
                           :route="{name: 'contest-rank', params: {contestID: contestID}}">
          <Icon type="stats-bars"></Icon>
          Ranklist
        </VerticalMenu-item>

        <VerticalMenu-item :route="{name: 'contest-details', params: {contestID: contestID}}">
          <Icon type="home"></Icon>
          Overview
        </VerticalMenu-item>
      </VerticalMenu>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import bus from '@/utils/eventBus'
  import auth from '@/utils/auth'
  import storage from '@/utils/storage'
  import time from '@/utils/time'

  export default {
    name: 'ContestDetail',
    components: {},
    data() {
      return {
        showMenu: true,
        route_name: '',
        contestID: '',
        contest: {
          description: 'abc'
        },
        contest_table: [],
        columns: [
          {
            title: 'StartAt',
            render: (h, params) => {
              return h('span', time.utcToLocal(params.row.start_time))
            }
          },
          {
            title: 'EndAt',
            render: (h, params) => {
              return h('span', time.utcToLocal(params.row.end_time))
            }
          },
          {
            title: 'ContestType',
            key: 'contest_type'
          },
          {
            title: 'Rule',
            key: 'rule_type'
          },
          {
            title: 'Creator',
            render: (h, data) => {
              return h('span', data.row.created_by.username)
            }
          }
        ]
      }
    },
    created() {
      this.contestID = this.$route.params.contestID
      this.route_name = this.$route.name
      this.getContest(this.contestID)
      bus.$on('update:menuVisible', (visible) => {
        this.showMenu = visible
      })
    },
    methods: {
      handleRoute(route) {
        this.$router.push(route)
      },
      getContest(contestID) {
        api.getContest(contestID).then((res) => {
          let contest = res.data.data
          this.contest = contest
          this.contest_table = []
          this.contest_table.push(contest)
          storage.set('contest_' + contest.id, contest)
        }, _ => {
        })
      }
    },
    computed: {
      isDisabled() {
        let uid = auth.getUid()
        return this.contest.status === '1' && this.contest.created_by.id !== uid
      }
    },
    watch: {
      '$route'(newVal) {
        this.route_name = newVal.name
        this.contestID = newVal.params.contestID
      }
    }
  }
</script>

<!--
官方暂不支持less的nested scoped, 等更新
https://vue-loader.vuejs.org/en/features/scoped-css.html
-->
<style scoped lang="less">
  .flex-container {
    #contest-main {
      flex: auto;
      #contest-desc {
        flex: auto;
      }
    }
    #contest-menu {
      flex: none;
      width: 210px;
      margin-left: 20px;
    }
  }
</style>
<style lang="css">
  /*使用scoped css注入*/
  #contest-desc > > > pre {
    margin: 15px 0px;
    padding: 5px;
    display: inline-block;
    background: #f8f8f9;
    border: 1px dashed #e9eaec;
  }

</style>
