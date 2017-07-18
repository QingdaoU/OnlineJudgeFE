<template>
  <Row type="flex" justify="space-around">
    <Col :span="16">
    <Card>
      <p>春天总是短暂的，却更是美好的。
        享受春日的美好，蕴存心中的温情，企盼夏日的蓬勃。
        这个四月没有你的谎言，却能见证你们的努力。
      </p>
    </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '@/api'
  import bus from '@/utils/eventBus'

  export default {
    name: 'test',
    components: {},
    data() {
      return {
        contest_id: '',
        contest: {}
      }
    },
    created() {
      this.contest_id = this.$route.params.contestID
      this.getContest(this.contest_id)
    },
    methods: {
      getContest(contestID) {
        api.getContest(contestID).then((res) => {
          this.contest = res.data.data
          console.log(res.data)
          bus.$emit('bread-crumb-change', res.data.data.title)
        }, (res) => {
          this.$error(res.data.error)
        })
      }
    }
  }
</script>

<style scoped lang="less">
</style>
