<template>
  <div>
    <Table :data="problems" :columns="columns" @on-row-click="goContestProblem" no-data-text="No Problems Here"></Table>
  </div>
</template>

<script>
  import api from '@/api'
  import utils from '@/utils/utils'
  import storage from '@/utils/storage'
  import {STORAGE_KEY} from '@/utils/consts'

  export default {
    name: 'ContestProblemList',
    data() {
      return {
        problems: [],
        columns: [
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
      let contestID = this.$route.params.contestID
      api.getContestProblemList(contestID).then(res => {
        storage.set(STORAGE_KEY.contestProblems + contestID, res.data.data)
        this.problems = res.data.data
      }, _ => {
      })
    },
    methods: {
      getACRate(ACCount, TotalCount) {
        return utils.getACRate(ACCount, TotalCount)
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
