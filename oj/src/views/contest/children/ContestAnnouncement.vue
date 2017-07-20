<template>
  <Table :data="announcements" :columns="columns" disabled-hover no-data-text="No Announcement Now"></Table>
</template>

<script>
  import api from '@/api'
  import utils from '@/utils/utils'

  var child = {
    template: '<div v-html="row.content"></div>',
    props: {
      row: Object
    }
  }

  export default {
    name: 'Announcement',
    data() {
      return {
        announcements: [],
        columns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(child, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: 'Title',
            key: 'title'
          },
          {
            title: 'CreateTime',
            render: (h, params) => {
              return h('span', utils.backendDatetimeFormat(params.row.create_time))
            }
          },
          {
            title: 'Creator',
            render: (h, params) => {
              return h('span', params.row.created_by.username)
            }
          }
        ]
      }
    },
    created() {
      api.getContestAnnouncementList(this.$route.params.contestID).then((res) => {
        this.announcements = res.data.data
      })
    },
    methods: {}
  }
</script>

<style scoped lang="less">
</style>
