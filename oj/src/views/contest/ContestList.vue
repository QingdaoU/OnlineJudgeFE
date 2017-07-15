<template>
  <Row type="flex" justify="space-around">
    <Col :span="23">
    <Card :padding="0" id="contest-card" dis-hover>
      <span slot="title" id="header">All Contests</span>
      <div slot="extra">
        <Form>
          <Form-item prop="difficulty">
            <Select>
              <Option value="OI">OI</Option>
              <Option value="ACM">ACM</Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <ol id="contest-list">
        <li v-for="contest in contests">
          <Row type="flex" justify="space-between" align="middle">
            <img class="left-media" src="../../assets/Cup.png"/>
            <Col :span="18" class="contest-main">
            <p class="title">{{contest.title}}</p>
            <ul class="detail">
              <li>
                <Tag>{{contest.rule_type}}</Tag>
              </li>
              <li>
                <Icon type="android-time" color="#3091f2"></Icon>
                {{formatDate(contest.start_time)}}
              </li>
            </ul>
            </Col>
            <Col :span="4">
            <Tag type="dot" :color="CONTEST_STATUS[contest.status].color">{{CONTEST_STATUS[contest.status].name}}</Tag>
            </Col>
          </Row>
        </li>
      </ol>
    </Card>
    <Pagination :total="total" :pageSize="limit" @on-change="changePage"></Pagination>
    </Col>
  </Row>
</template>

<script>
  import api from '@/api'
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
        limit: 10,
        total: 0,
        rows: '',
        contests: [],
        CONTEST_STATUS: CONTEST_STATUS
      }
    },
    methods: {
      changePage(page) {
        console.log(page)
      },
      formatDate(backendDate) {
        let date = utils.backendDatetimeFormat(backendDate)
        return date.slice(0, date.length - 3)
      }
    },
    beforeRouteEnter(to, from, next) {
      api.getContestList(0, 10).then((res) => {
        next((vm) => {
          console.log(res.data.data)
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
    #header {
      font-size: 20px;
      font-weight: 300;
      line-height: 30px;
    }
    #contest-list {
      > li {
        padding: 30px;
        border-bottom: 1px solid rgba(128, 128, 128, 0.2);

        .left-media {
          height: 40px;
        }
        .contest-main {
          .title {
            font-size: 22px;
            /*font-weight: 300;*/
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
