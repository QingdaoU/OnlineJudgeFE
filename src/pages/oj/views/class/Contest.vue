<template>
  <ol id="contest-list">
    <li v-for="contest in contests" :key="contest.title">
      <Row type="flex" justify="space-between" align="middle">
        <img class="trophy" src="../../../../assets/Cup.png"/>
        <Col :span="18" class="contest-main">
          <p class="title">
            <a class="entry">
              {{contest.title}}
            </a>
            <template v-if="contest.contest_type != 'Public'">
              <Icon type="ios-locked-outline" size="20"></Icon>
            </template>
          </p>
          <ul class="detail">
            <li>
              <Icon type="calendar" color="#3091f2"></Icon>
              {{contest.start_time | localtime('YYYY-M-D HH:mm') }}
            </li>
            <li>
              <Icon type="android-time" color="#3091f2"></Icon>
              {{getDuration(contest.start_time, contest.end_time)}}
            </li>
            <li>
              <Button size="small" shape="circle">
                {{contest.rule_type}}
              </Button>
            </li>
          </ul>
        </Col>
        <Col :span="4" style="text-align: center">
          <Tag type="dot" :color="CONTEST_STATUS_REVERSE[contest.status].color">{{$t('m.' + CONTEST_STATUS_REVERSE[contest.status].name.replace(/ /g, "_"))}}</Tag>
        </Col>
      </Row>
    </li>
  </ol>
</template>

<script>
  import time from '../../../../utils/time'
  import { CONTEST_STATUS_REVERSE } from '@/utils/constants'
  const mockupContests = [
    {
      'id': 1,
      'created_by': {
        'id': 1,
        'username': 'superadmin1',
        'real_name': null
      },
      'status': '0',
      'contest_type': 'Password Protected',
      'title': 'Test new contest',
      'description': '<p>sdaf<br /></p>',
      'real_time_rank': true,
      'rule_type': 'ACM',
      'start_time': '2022-05-27T17:00:00Z',
      'end_time': '2022-09-14T17:00:00Z',
      'create_time': '2022-05-28T07:50:06.358100Z',
      'last_update_time': '2022-05-28T07:50:06.358122Z'
    },
    {
      'id': 2,
      'created_by': {
        'id': 1,
        'username': 'superadmin1',
        'real_name': 'Duong'
      },
      'status': '0',
      'contest_type': 'Password Protected',
      'title': 'Test new contest',
      'description': '<p>sdaf<br /></p>',
      'real_time_rank': true,
      'rule_type': 'ACM',
      'start_time': '2022-05-27T17:00:00Z',
      'end_time': '2022-09-14T17:00:00Z',
      'create_time': '2022-05-28T07:50:06.358100Z',
      'last_update_time': '2022-05-28T07:50:06.358122Z'
    },
    {
      'id': 3,
      'created_by': {
        'id': 1,
        'username': 'superadmin1',
        'real_name': 'Duy'
      },
      'status': '0',
      'contest_type': 'Password Protected',
      'title': 'Test new contest',
      'description': '<p>sdaf<br /></p>',
      'real_time_rank': true,
      'rule_type': 'ACM',
      'start_time': '2022-05-27T17:00:00Z',
      'end_time': '2022-09-14T17:00:00Z',
      'create_time': '2022-05-28T07:50:06.358100Z',
      'last_update_time': '2022-05-28T07:50:06.358122Z'
    }
  ]
  export default {
    name: 'Contest',
    components: {
    },
    data () {
      return {
        contests: mockupContests,
        CONTEST_STATUS_REVERSE: CONTEST_STATUS_REVERSE
      }
    },
    mounted () {
    },
    methods: {
      goContest (contest) {
      },
      onRuleChange (rule) {
      },
      getDuration (startTime, endTime) {
        return time.duration(startTime, endTime)
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="less">
  #contest-list {
    > li {
      padding: 20px;
      border-bottom: 1px solid rgba(187, 187, 187, 0.5);
      list-style: none;

      .trophy {
        height: 40px;
        margin-left: 10px;
        margin-right: -20px;
      }
      .contest-main {
        .title {
          font-size: 18px;
          a.entry {
            color: #495060;
            &:hover {
              color: #2d8cf0;
              border-bottom: 1px solid #2d8cf0;
            }
          }
        }
        li {
          display: inline-block;
          padding: 10px 0 0 10px;
          &:first-child {
            padding: 10px 0 0 0;
          }
        }
      }
    }
  }
</style>
