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
  import {mapState} from 'vuex'
  import {ProblemMixin} from '~/mixins'

  export default {
    name: 'ContestProblemList',
    mixins: [ProblemMixin],
    data() {
      return {
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
      this.getContestProblems()
    },
    methods: {
      getContestProblems() {
        this.$store.dispatch('getContestProblems').then(res => {
          if (this.isAuthenticated) {
            this.addStatusColumn(res.data.data)
          }
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
    },
    computed: {
      ...mapState({
        problems: state => state.contest.contestProblems
      }),
      isAuthenticated() {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>

<style scoped lang="less">
</style>
