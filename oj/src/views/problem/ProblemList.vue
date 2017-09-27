<template>
  <Row type="flex" :gutter="18">
    <Col :span=20>
    <Panel shadow>
      <div slot="title">Problem List</div>
      <div slot="extra">
        <ul class="filter move-right">
          <li>
            <Dropdown @on-click="filterByDifficulty">
              <span>{{query.difficulty === '' ? 'Difficulty' : query.difficulty}}
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
            <Input v-model="query.keyword"
                   @on-enter="pushRouter"
                   @on-click="pushRouter"
                   placeholder="keyword"
                   icon="ios-search-strong"/>
          </li>
          <li>
            <Button type="primary" @click="onReset">
              <Icon type="refresh"></Icon>
              Reset
            </Button>
          </li>
        </ul>
      </div>
      <Table style="width: 100%; font-size: 16px;"
             :columns="problemTableColumns"
             :data="problemList"
             disabled-hover></Table>
    </Panel>
    <Pagination :total="total" :page-size="limit" @on-change="pushRouter" :current.sync="query.page"></Pagination>

    </Col>

    <Col :span="4">
    <Panel :padding="10">
      <div slot="title" class="taglist-title">Tags</div>
      <Button v-for="tag in tagList"
              key="tag"
              @click="filterByTag(tag.name)"
              type="ghost"
              :disabled="query.tag === tag.name"
              shape="circle"
              class="tag-btn">{{tag.name}}
      </Button>

      <Button long
              id="pick-one">
        <Icon type="shuffle"></Icon>
        Pick one
      </Button>
    </Panel>
    <Spin v-if="spinShow" fix size="large"></Spin>
    </Col>
  </Row>
</template>

<script>
  import {mapGetters} from 'vuex'
  import api from '@/api.js'
  import utils from '@/utils/utils'
  import {ProblemMixin} from '~/mixins'
  import Pagination from '../../components/Pagination'

  export default {
    name: 'ProblemList',
    mixins: [ProblemMixin],
    components: {
      Pagination
    },
    data() {
      return {
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
        limit: 2,
        total: 0,
        problemLoading: false,
        tagLoading: false,
        routeName: '',
        query: {
          keyword: '',
          difficulty: '',
          tag: '',
          page: 10
        },
        spinShow: true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init(simulate = false) {
        this.routeName = this.$route.name
        let query = this.$route.query
        this.query.difficulty = query.difficulty || ''
        this.query.keyword = query.keyword || ''
        this.query.tag = query.tag || ''
        this.query.page = parseInt(query.page) || 1
        if (!simulate) {
          this.getTagList()
        }
        this.getProblemList()
      },
      pushRouter() {
        this.$router.push({
          name: 'problem-list',
          query: utils.filterEmptyValue(this.query)
        })
      },
      getProblemList() {
        this.$Loading.start()
        let self = this
        let offset = (this.query.page - 1) * this.limit
        api.getProblemList(offset, this.limit, this.query).then(res => {
          self.$Loading.finish()
          this.total = res.data.data.total
          this.problemList = res.data.data.results
          if (this.isAuthenticated) {
            this.addStatusColumn(res.data.data.results)
          }
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
      filterByTag(tagName) {
        this.query.tag = tagName
        this.pushRouter()
      },
      filterByDifficulty(difficulty) {
        this.query.difficulty = difficulty
        this.pushRouter()
      },
      onReset() {
        this.$router.push({name: 'problem-list'})
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    watch: {
      '$route'(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init(true)
        }
      },
      'isAuthenticated'(newVal) {
        if (newVal === true) {
          this.init()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .move-right {
    margin-right: -20px;
  }

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
