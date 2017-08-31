<template>
  <div>
    <Panel>
      <div slot="title">Problems List</div>
      <Table :data="problems" :columns="problemTableColumns" @on-row-click="goContestProblem"
             no-data-text="No Problems Here"></Table>
    </Panel>
  </div>
</template>

<script>
  import api from '@/api'
  import auth from '@/utils/auth'
  import {problemMixin} from '~/mixins'
  import storage from '@/utils/storage'
  import {STORAGE_KEY} from '@/utils/consts'

  export default {
    name: 'ContestProblemList',
    mixins: [problemMixin],
    data() {
      return {
        problems: [],
        problemTableColumns: [
          {
            title: '#',
            key: '_id',
            width: 100
          },
          {
            title: 'Title',
            key: 'title'
          },
          {
            title: 'Total',
            key: 'submission_number'
          },
          {
            title: 'AC Rate',
            render: (h, params) => {
              return h('span', this.getACRate(params.row.accepted_number, params.row.submission_number))
            }
          }
        ]

      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let contestID = this.$route.params.contestID
        api.getContestProblemList(contestID).then(res => {
          storage.set(STORAGE_KEY.contestProblems + contestID, res.data.data)
          this.problems = res.data.data
          if (auth.isAuthicated()) {
            this.addStatusColumn(res.data.data)
          }
        }, _ => {
        })
      },
      goContestProblem(row) {
        this.$router.push({
          name: 'contest-problem-details',
          params: {
            contestID: this.$route.params.contestID,
            problemID: row._id
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
</style>
