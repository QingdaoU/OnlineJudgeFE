<template>
  <div>
    <component :is="currentView"></component>
  </div>
</template>
<script>
  import ACMContestRank from './ACMContestRank.vue'
  import test from '@/views/test.vue'
  import utils from '@/utils/utils'

  export default {
    name: 'contest-rank',
    components: {
      ACMContestRank,
      test
    },
    data() {
      return {
        currentView: 'ACMContestRank'
      }
    },
    methods: {
      switchView() {
        let contestID = this.$route.params.contestID
        let contest = utils.loadContest(contestID)
        console.log(contest)
        this.currentView = contest.rule_type === 'ACM' ? 'ACMContestRank' : ACMContestRank
      }
    },
    mounted() {
      this.switchView()
    },
    watch: {
      '$route'() {
        this.switchView()
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
