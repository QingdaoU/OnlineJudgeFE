import utils from '@/utils/utils'

export default {
  created() {
    this.$bus.$on('login-success', this.init)
  },
  methods: {
    getACRate(ACCount, TotalCount) {
      return utils.getACRate(ACCount, TotalCount)
    },
    addStatusColumn(dataProblems) {
      // 只在有做题记录时才添加column
      let isAdd = dataProblems.some((item, index) => {
        if (item.my_status !== null && item.my_status !== undefined) {
          return true
        }
      })
      if (!isAdd) {
        return
      }
      this.problemTableColumns.splice(0, 0, {
        width: '50',
        title: ' ',
        render: (h, params) => {
          let status = params.row.my_status
          if (status === null || status === undefined) {
            return undefined
          }
          return h('Icon', {
            props: {
              type: status === 0 ? 'checkmark-round' : 'minus-round'
            },
            style: {
              color: status === 0 ? '#19be6b' : '#ed3f14'
            }
          })
        }
      })
    }
  },
  beforeDestroy() {
    this.$bus.$off('login-success', this.init)
  }
}
