<template>
  <Row type="flex" :gutter="18">
    <Col :span=20>
    <Panel shadow>
      <div slot="title">Problems List</div>
      <div slot="extra">
        <ul class="filter">
          <li>
            <Dropdown @on-click="onDifficultyChange">
              <span>{{filter.difficulty === '' ? 'Difficulty' : filter.difficulty}}
                <Icon type="arrow-down-b"></Icon>
              </span>
              <Dropdown-menu slot="list">
                <Dropdown-item name="">All</Dropdown-item>
                <Dropdown-item name="Low">Low</Dropdown-item>
                <Dropdown-item name="Mid">Mid</Dropdown-item>
                <Dropdown-item name="High">High</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </li>
          <li>
            <Input v-model="filter.keyword"
                   @on-enter="getProblemList"
                   @on-click="getProblemList"
                   placeholder="keyword"
                   icon="ios-search-strong"/>
          </li>
        </ul>
      </div>
      <Table style="width: 100%; font-size: 16px;" :columns="problemTableColumns" :data="problemList" disabled-hover></Table>
    </Panel>
    <Pagination :total="total" :page-size="limit" @on-change="getProblemList"></Pagination>

    </Col>

    <Col :span="4">
    <Table :columns="tagTableColumns" :data="tagList"></Table>
    <Spin v-if="spinShow" fix size="large"></Spin>
    </Col>
  </Row>
</template>

<script>
  import api from '@/api.js'
  import utils from '@/utils/utils'
  import Pagination from '../../components/Pagination'

  export default {
    name: 'ProblemList',
    components: {
      Pagination
    },
    data() {
      return {
        tagTableColumns: [
          {
            title: 'Tags',
            key: 'name'
          }
        ],
        tagList: [],
        problemTableColumns: [
          {
            title: '#',
            key: '_id'
          },
          {
            title: 'Title',
            width: '40%',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'problem-details', params: {problemID: params.row._id}})
                  }
                },
                style: {
                  padding: '2px 0'
                }
              }, params.row.title)
            }
          },
          {
            title: 'Level',
            render: (h, params) => {
              let t = params.row.difficulty
              let color = 'blue'
              if (t === 'Low') color = 'green'
              else if (t === 'High') color = 'yellow'
              return h('Tag', {
                props: {
                  color: color
                }
              }, params.row.difficulty)
            }
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

        ],
        problemList: [],
        limit: 5,
        total: 0,
        problemLoading: false,
        tagLoading: false,
        routeName: '',
        filter: {
          keyword: '',
          difficulty: ''
        },
        spinShow: true
      }
    },
    created() {
      this.routeName = this.$route.name
      this.getTagList()
      this.getProblemList()
    },
    methods: {
      getACRate(acCount, totalCount) {
        return utils.getACRate(acCount, totalCount)
      },
      getProblemList(page = 1) {
        this.$Loading.start()
        let self = this
        let offset = (page - 1) * this.limit
        api.getProblemList(offset, this.limit, this.filter).then(res => {
          self.$Loading.finish()
          this.total = res.data.data.total
          this.problemList = res.data.data.results
        }, res => {
          self.$Loading.error()
        })
      },
      getTagList() {
        api.getProblemTagList().then(res => {
          this.tagList = res.data.data
          this.spinShow = false
        }, res => {
          this.spinShow = false
        })
      },
      onDifficultyChange(difficulty) {
        this.filter.difficulty = difficulty
        this.getProblemList()
      },
      onReset() {
        this.filterForm = {
          keyword: '',
          difficulty: ''
        }
        this.getProblemList(1)
      }

    }
  }
</script>

<style scoped lang="less">
  #filterForm {
    .ivu-form-item {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }
</style>
