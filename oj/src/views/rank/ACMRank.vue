<template>
  <div>
    <Table :data="dataRank" :columns="columns"></Table>
    <Pagination :total="total" :page-size="pageSize" @on-change="getRankData"></Pagination>
  </div>
</template>

<script>
  import api from '@/api'
  import Pagination from '~/Pagination'
  import utils from '@/utils/utils'

  const limit = 10
  const columns = [
    {
      type: 'index',
      align: 'center',
      width: 60
    },
    {
      title: 'user',
      align: 'center',
      render: (h, params) => {
        return h('Button', {
          props: {
            type: 'text'
          },
          style: {
            color: '#57a3f3'
          },
          on: {
            click: () => {
              console.log('push')
            }
          }
        }, params.row.user.username)
      }
    },
    {
      title: 'mood',
      align: 'center',
      key: 'mood'
    },
    {
      title: 'AC',
      align: 'center',
      key: 'accepted_number'
    },
    {
      title: 'Total',
      align: 'center',
      key: 'submission_number'
    },
    {
      title: 'Rate',
      render: (h, params) => {
        return h('span', utils.getACRate(params.row.accepted_number, params.row.submission_number))
      }
    }
  ]
  export default {
    name: 'acm-rank',
    components: {
      Pagination
    },
    data() {
      return {
        page: 1,
        pageSize: limit,
        total: 0,
        dataRank: [],
        columns: columns
      }
    },
    methods: {
      getRankData(page) {
        let offset = (page - 1) * this.pageSize
        api.getUserRank(offset, this.pageSize, 'acm').then(res => {
          console.log(res.data.data)
          this.total = res.data.data.total
          this.dataRank = res.data.data.results
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      api.getUserRank(0, limit).then(res => {
        next(vm => {
          console.log(res.data.data)
          vm.total = res.data.data.total
          vm.dataRank = res.data.data.results
        })
      }, _ => {
        next()
      })
    }
  }
</script>

<style scoped lang="less">

</style>
