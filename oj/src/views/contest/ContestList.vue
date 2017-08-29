<template>
  <Row type="flex">
    <Col :span="24">
    <Card :padding="0" id="contest-card" shadow>
      <div slot="title" class="pannel-title">{{query.rule_type === ''? 'All' : query.rule_type}} Contests</div>
      <div slot="extra" class="pannel-extra">
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
      <p id="no-contest" v-if="contests.length == 0">No contest</p>
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
                {{contest.start_time | localtime('YYYY-M-D HH:mm') }}
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
      <Input v-model="password" type="password" />
      <div slot="footer">
        <Button type="primary" :loading="btnLoading" @click="goCheckPasswd">GO</Button>
      </div>
    </Modal>
  </Row>

</template>

<script>
  import api from '@/api'
  import bus from '@/utils/eventBus'
  import auth from '@/utils/auth'
  import Pagination from '@/components/Pagination'
  import time from '@/utils/time'
  import {CONTEST_STATUS} from '@/utils/consts'

  const limit = 10
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
        limit: limit,
        total: 0,
        rows: '',
        contests: [],
        CONTEST_STATUS: CONTEST_STATUS,
//      for password modal use
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
            bus.$emit('login')
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
      getDuration(startTime, endTime) {
        return time.duration(startTime, endTime)
      }
    },
    beforeRouteEnter(to, from, next) {
      api.getContestList(0, limit).then((res) => {
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
      margin-right: 30px;
    }
    #no-contest {
      text-align: center;
      font-size: 16px;
      padding: 20px;
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
