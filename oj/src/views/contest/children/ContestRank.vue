<template>
  <div>
    <component :is="currentView"></component>
  </div>
</template>
<script>
  import ACMContestRank from './ACMContestRank.vue'

  export default {
    name: 'contest-rank',
    components: {
      ACMContestRank
    },
    data() {
      return {
        currentView: 'ACMContestRank'
      }
    },
    methods: {
      switchView() {
        this.currentView = this.contest.rule_type === 'ACM' ? 'ACMContestRank' : 'ACMContestRank'
      }
    },
    mounted() {
      this.switchView()
    },
    computed: {
      contest() {
        return this.$store.state.contest.contest
      }
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
