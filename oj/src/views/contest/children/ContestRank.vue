<template>
  <div>
    <component :is="currentView"></component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ACMContestRank from './ACMContestRank.vue'
  import OIContestRank from './OIContestRank.vue'

  const NullComponent = {
    name: 'null-component',
    template: '<div></div>'
  }

  export default {
    name: 'contest-rank',
    components: {
      ACMContestRank,
      OIContestRank,
      NullComponent
    },
    computed: {
      ...mapGetters(['contestRuleType']),
      currentView () {
        if (this.contestRuleType === null) {
          return 'NullComponent'
        }
        return this.contestRuleType === 'ACM' ? 'ACMContestRank' : 'OIContestRank'
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
