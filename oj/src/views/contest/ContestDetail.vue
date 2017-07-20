<template>
  <Row type="flex" justify="space-around">
    <Col :span="23">
    <Card :padding="10" id="progress" dis-hover>
      <Row>
        <Col :span="8">
        StartAt: 2017.6.5 3:50
        </Col>
        <Col :span="8">
        <p class="center">
          Not started
        </p>
        </Col>
        <Col :span="8">
        <p class="right">
          3 Hours
        </p>
        </Col>
      </Row>
      <Progress :percent="35" status="normal" :stroke-width="5" hide-info></Progress>
      <Table :columns="columns" :data="contest_table" disabled-hover></Table>
    </Card>
    </Col>

    <Col :lg="18" :md="18" :sm="17" :xm="16">
    <!--子组件-->
    <router-view></router-view>

    <Card v-if="route_name === 'contest-details'">
      <div id="description">
        <div v-html="contest.description"></div>
      </div>
    </Card>
    </Col>

    <Col :lg="4" :md="4" :sm="5" :xm="6">
    <VerticalMenu @on-click="handleRoute">
      <VerticalMenu-item :disabled="isDisabled"
                         :route="{name: 'contest-problem-list', params: {contestID: contest_id}}">
        <Icon type="ios-photos"></Icon>
        Problems
      </VerticalMenu-item>

      <VerticalMenu-item :disabled="isDisabled" route="">
        <Icon type="chatbubble-working"></Icon>
        Announcements
      </VerticalMenu-item>

      <VerticalMenu-item :disabled="isDisabled" route="">
        <Icon type="navicon-round"></Icon>
        Submissions
      </VerticalMenu-item>

      <VerticalMenu-item :disabled="isDisabled" route="">
        <Icon type="pie-graph"></Icon>
        Ranklist
      </VerticalMenu-item>

      <VerticalMenu-item :route="{name: 'contest-details', params: {contestID: contest_id}}">
        <Icon type="home"></Icon>
        Overview
      </VerticalMenu-item>
    </VerticalMenu>
    </Col>

  </Row>
</template>

<script>
  import api from '@/api'
  import bus from '@/utils/eventBus'
  import auth from '@/utils/authHelper'

  export default {
    name: 'ContestDetail',
    components: {},
    data() {
      return {
        route_name: '',
        contest_id: '',
        contest: {
          description: 'abc'
        },
        contest_table: [],
        columns: [
          {
            title: 'StartAt',
            key: 'start_time'
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
      this.contest_id = this.$route.params.contestID
      this.route_name = this.$route.name
      this.getContest(this.contest_id)
    },
    methods: {
      handleRoute(route) {
        console.log(route)
        this.$router.push(route)
      },
      changeBread(routeName) {
        if (routeName === 'contest-details') {
          bus.$emit('bread-crumb-change', this.contest.title)
        } else if (routeName === 'contest-problem-list') {
          bus.$emit('bread-crumb-change2', this.contest.title)
        }
      },
      getContest(contestID) {
        api.getContest(contestID).then((res) => {
          this.contest = res.data.data
          this.contest_table = []
          this.contest_table.push(res.data.data)
          this.changeBread(this.route_name)
        }, (res) => {
          this.$error(res.data.error)
        })
      }
    },
    computed: {
      isDisabled() {
        let user = auth.getUser()
        let loginID = -1
        if (user === null) {
          loginID = -1
        } else {
          loginID = user.id
        }
        return this.contest.status === '1' && this.contest.created_by.id !== loginID
      }
    },
    watch: {
      '$route'(newVal) {
        this.route_name = newVal.name
        this.contest_id = newVal.params.contestID
        this.changeBread(newVal.name)
      }
    }
  }
</script>

<!--
官方暂不支持less的nested scoped, 等更新
https://vue-loader.vuejs.org/en/features/scoped-css.html
-->
<style scoped lang="less">
  #progress {
    margin: 0px 0 15px 0;
    p.center {
      text-align: center;
    }
    p.right {
      text-align: right;
      padding-right: 10px;
    }
  }

</style>
<style scoped lang="css">
  /*使用scoped css注入*/
  #description > > > pre {
    margin: 15px 0px;
    padding: 5px;
    display: inline-block;
    background: #f8f8f9;
    border: 1px dashed #e9eaec;
  }

</style>
