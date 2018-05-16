<template>
  <Row type="flex" :gutter="18">
    <Col :span=24>
      <Panel shadow>
        <div slot="title">小组列表</div>
        <div slot="extra">
        </div>
        <Table style="width: 100%; font-size: 16px;"
               :columns="groupTableColumns"
               :data="groupList"
               disabled-hover></Table>
      </Panel>
    </Col>
    <Modal
      v-model="joinGroupModal"
      title="加入小组"
      @on-ok="handleJoinGroup">
      <div style="margin-top: 5px">
        <Input v-model="joinGroupPassword" placeholder="密码"></Input>
      </div>
    </Modal>
  </Row>

</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '@oj/api'
  import Pagination from '@oj/components/Pagination'

  export default {
    name: 'GroupList',
    components: {
      Pagination
    },
    data () {
      return {
        keyword: '',
        groupName: '',
        joinGroupPassword: '',
        joinGroupModal: false,
        groupTableColumns: [
          {
            title: '#',
            key: '_id',
            width: 80,
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  size: 'large'
                },
                style: {
                  padding: '2px 0'
                }
              }, params.row.id)
            }
          },
          {
            title: 'Name',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  size: 'large'
                },
                on: {
                  click: () => {
                  }
                },
                style: {
                  padding: '2px 0'
                }
              }, params.row.name)
            }
          },
          {
            title: 'Created by',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  size: 'large'
                },
                on: {
                  click: () => {
                  }
                },
                style: {
                  padding: '2px 0'
                }
              }, params.row.created_by.username)
            }
          },
          {
            title: 'Operation',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'info',
                  disabled: params.row.me
                },
                on: {
                  click: () => {
                    this.groupName = params.row.name
                    if (params.row.password) {
                      this.joinGroupModal = true
                    } else {
                      this.handleJoinGroup()
                    }
                  }
                },
                style: {
                  padding: '5px'
                }
              }, params.row.me ? '已加入' : '加入')
            }
          }
        ],
        groupList: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.getGroupList()
      },
      getGroupList () {
        api.getGroupList().then(res => {
          this.groupList = res.data.data
        })
      },
      handleJoinGroup () {
        api.joinGroup(this.groupName, this.joinGroupPassword).then(res => {
          this.joinGroupModal = false
          this.getGroupList()
        })
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    watch: {
      '$route' (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init(true)
        }
      },
      'isAuthenticated' (newVal) {
        if (newVal === true) {
          this.init()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .taglist-title {
    margin-left: -10px;
    margin-bottom: -10px;
  }

  .tag-btn {
    margin-right: 5px;
    margin-bottom: 10px;
  }

  #pick-one {
    margin-top: 10px;
  }
</style>
