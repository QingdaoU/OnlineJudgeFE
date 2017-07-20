<template>
  <Row type="flex" justify="space-around">
    <Col :span="23">
    <Card :padding="0" id="contest-card" dis-hover>
      <span slot="title" id="header">{{query.rule_type === ''? 'All' : query.rule_type}} Contests</span>
      <div slot="extra">
        <Dropdown @on-click="onRuleChange">
          <span id="rule">{{query.rule_type === ''? 'Rule' : query.rule_type}}
          <Icon type="arrow-down-b"></Icon>
          </span>
          <Dropdown-menu slot="list">
            <Dropdown-item name="">All</Dropdown-item>
            <Dropdown-item name="OI">OI</Dropdown-item>
            <Dropdown-item name="ACM">ACM</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>

        <Dropdown @on-click="onStatusChange">
          <span id="status">{{query.status === '' ? 'Status' : CONTEST_STATUS[query.status].name}}
          <Icon type="arrow-down-b"></Icon>
          </span>
          <Dropdown-menu slot="list">
            <Dropdown-item name="">All</Dropdown-item>
            <Dropdown-item name="0">UnderWay</Dropdown-item>
            <Dropdown-item name="1">Not Started</Dropdown-item>
            <Dropdown-item name="-1">Ended</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>

        <Input size="small" id="keyword" @on-enter="onSearchKeyword" @on-click="onSearchKeyword" v-model="query.keyword" icon="ios-search-strong" />
      </div>
      <ol id="contest-list">
        <li v-for="contest in contests">
          <Row type="flex" justify="space-between" align="middle">
            <img class="left-media" src="../../assets/Cup.png"/>
            <Col :span="18" class="contest-main">
            <p class="title">
              <a class="entry" @click.stop="handleContest(contest)">
                {{contest.title}}
              </a>

              <template v-if="contest.contest_type=='Public'">
                <Tag color="green">
                  {{contest.contest_type}}
                </Tag>
              </template>
              <template v-else>
                <Icon type="ios-locked-outline"></Icon>
              </template>
            </p>
            <ul class="detail">
              <li>
                <Tag>{{contest.rule_type}}</Tag>
              </li>

              <li>
                <Icon type="calendar" color="#3091f2"></Icon>
                {{formatDate(contest.start_time)}}
              </li>
              <li>
                <Icon type="android-time" color="#3091f2"></Icon>
                {{getDuration(contest.start_time, contest.end_time)}}
              </li>
            </ul>
            </Col>
            <Col :span="4" style="text-align: center">
            <Tag type="dot" :color="CONTEST_STATUS[contest.status].color">{{CONTEST_STATUS[contest.status].name}}</Tag>
            </Col>
          </Row>
        </li>
      </ol>
    </Card>
    <Pagination :total="total" :pageSize="limit" @on-change="changePage"></Pagination>
    </Col>

    <Modal title="Input Password" v-model="passwordModal">
      <Input v-model="password"/>
      <div slot="footer">
        <Button type="primary" :loading="btnLoading" @click="goCheckPasswd">GO</Button>
      </div>
    </Modal>
  </Row>

</template>

<script>
  import api from '@/api'
  import auth from '@/utils/authHelper'
  import Pagination from '@/components/Pagination'
  import utils from '@/utils/utils'
  import {CONTEST_STATUS} from '@/utils/consts'

  export default {
    name: 'contest-list',
    components: {
      Pagination
    },
    data() {
      return {
        query: {
          status: '',
          keyword: '',
          rule_type: ''
        },
        passwordModal: false,
        btnLoading: false,
        password: '',
        limit: 10,
        total: 0,
        rows: '',
        contests: [],
        CONTEST_STATUS: CONTEST_STATUS,
//      for modal use
        cur_contest_id: ''
      }
    },
    methods: {
      getContestList(offset, limit, params) {
        api.getContestList(offset, limit, params).then((res) => {
          this.contests = res.data.data.results
          this.total = res.data.data.total
        })
      },
      changePage(page) {
        this.getContestList()
      },
      onRuleChange(rule) {
        this.query.rule_type = rule
        this.getContestList(0, this.limit, this.query)
      },
      onStatusChange(status) {
        this.query.status = status
        this.getContestList(0, this.limit, this.query)
      },
      onSearchKeyword() {
        this.getContestList(0, this.limit, this.query)
      },
      handleContest(contest) {
        this.cur_contest_id = contest.id
        let route = {name: 'contest-details', params: {contestID: this.cur_contest_id}}
        if (contest.contest_type !== 'Public') {
          if (!auth.isAuthicated()) {
            this.$error('Please login first.')
            this.$router.push({name: 'login'})
          } else if (contest.created_by.id === auth.getUid()) {
            // contest.created_by is user self.
            this.$router.push(route)
          } else {
            // check if contest have been authenticated
            api.getContestAccess(contest.id).then((res) => {
              let access = res.data.data.Access
              if (access === false) {
                this.passwordModal = true
              } else {
                this.$router.push(route)
              }
            })
          }
        } else {
          this.$router.push(route)
        }
      },
      goCheckPasswd() {
        this.btnLoading = true
        api.checkContestPassword(this.cur_contest_id, this.password).then((res) => {
          this.btnLoading = false
          this.passwordModal = false
          this.$router.push({name: 'contest-details', params: {contestID: this.cur_contest_id}})
        }, (res) => {
          this.btnLoading = false
        })
      },
      formatDate(backendDate) {
        let date = utils.backendDatetimeFormat(backendDate)
        return date.slice(0, date.length - 3)
      },
      getDuration(startTime, endTime) {
        return utils.dateTimeDuration(startTime, endTime)
      }
    },
    beforeRouteEnter(to, from, next) {
      api.getContestList(0, 10).then((res) => {
        next((vm) => {
          vm.contests = res.data.data.results
          vm.total = res.data.data.total
        })
      }, (res) => {
        next()
      })
    }
  }
</script>
<style lang="less" scoped>
  #contest-card {
    #keyword {
      width: 40%;
      margin-right: 30px;
    }
    #rule, #status {
      line-height: 30px;
      margin-right: 30px;
    }
    #header {
      font-size: 20px;
      font-weight: 300;
      line-height: 30px;
    }
    #contest-list {
      > li {
        padding: 20px;
        border-bottom: 1px solid rgba(128, 128, 128, 0.2);

        .left-media {
          height: 40px;
        }
        .contest-main {
          .title {
            font-size: 18px;
            /*font-weight: 300;*/
            .entry {
              color: #495060;
              &:hover {
                color: #2d8cf0;
                border-bottom: 1px solid #2d8cf0;
              }
            }
          }
          li {
            display: inline-block;
            padding: 10px 0px 0px 10px;
          }
        }
      }
    }
  }
</style>
