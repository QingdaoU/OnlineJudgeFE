<template>
  <Table :data="announcements" :columns="columns" disabled-hover no-data-text="No Announcement Now"></Table>
</template>

<script>
  import api from '@/api'
  import utils from '@/utils/utils'

  const child = {
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
            width: 60,
            render: (h, params) => {
              return h(child, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: 'CreateTime',
            render: (h, params) => {
              return h('span', utils.backendDatetimeFormat(params.row.create_time))
            }
          },
          {
            title: 'Title',
            key: 'title'
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
        let data = res.data.data
        if (data.length > 0) {
          data[0]._expanded = true
          this.announcements = data
        }
      })
    },
    methods: {}
  }
</script>

<style scoped lang="less">
</style>
