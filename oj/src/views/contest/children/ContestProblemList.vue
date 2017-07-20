<template>
  <div>
    <Table :data="problems" :columns="columns" @on-row-click="goContestProblem"></Table>
  </div>
</template>

<script>
  import api from '@/api'
  import utils from '@/utils/utils'

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
            key: 'total_submit_number'
          },
          {
            title: 'AC Rate',
            render: (h, params) => {
              return h('span', this.getACRate(params.row.total_accepted_number, params.row.total_submit_number))
            }
          }
        ]

      }
    },
    mounted() {
      api.getContestProblemList(this.$route.params.contestID).then((res) => {
        console.log(res.data.data)
        this.problems = res.data.data
      }, (res) => {
        this.$error(res.data.error)
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
