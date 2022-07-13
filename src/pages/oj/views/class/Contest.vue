<template>
  <ol id="contest-list">
    <li v-for="contest in contests" :key="contest.title">
      <Row type="flex" justify="space-between" align="middle">
        <img class="trophy" src="../../../../assets/Cup.png"/>
        <Col :span="18" class="contest-main">
          <p class="title">
            <a class="entry" @click.stop="goContest(contest.id)">
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
          <Button 
            v-if="isAdminRole"
            type="text" 
            shape="circle" 
            icon="trash-b"
            class="delete-btn"
            @click="deleteContest(contest.id)">
          </Button>
        </Col>
      </Row>
    </li>
  </ol>
</template>

<script>
  import time from '@/utils/time'
  import { CONTEST_STATUS_REVERSE } from '@/utils/constants'
  import api from '@oj/api'
import { mapGetters } from 'vuex'
  export default {
    name: 'Contest',
    components: {
    },
    props: {
      data: {}
    },
    data () {
      return {
        contests: [],
        CONTEST_STATUS_REVERSE: CONTEST_STATUS_REVERSE
      }
    },
    mounted () {
      this.$parent.$on('should-contest-update', () => {
        this.getContests()
      })
      this.getContests()
    },
    methods: {
      getContests () {
        api.getContests(this.data.id).then(resp => {
          this.contests = resp.data.data
        })
      },
      goContest (id) {
        this.$router.push({name: 'contest-details', params: {contestID: id}})
      },
      onRuleChange (rule) {
      },
      getDuration (startTime, endTime) {
        return time.duration(startTime, endTime)
      },
      deleteContest (id) {
        this.$Modal.confirm({
          content: 'Are you sure to remove this contest',
          onOk: () => {
            // still error here, not fix yet
            api.unMappingContest(this.data.id, id).then(resp => {
              if (!resp.error) {
                this.$success('Delete successfully')
                this.getContests()
              } else {
                this.$error('Some thing went wrong')
              }
            }).catch(err => {
              this.$error('Some thing went wrong ', err)
            })
          }
        })
      }
    },
    computed: {
      ...mapGetters(['isAdminRole'])
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
