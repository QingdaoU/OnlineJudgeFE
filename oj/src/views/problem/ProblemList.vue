<template>
  <Row type="flex" justify="space-around">
    <Col :span=18>
    <Card dis-hover :padding="0">
      <div slot="title">
        <Form id="filterForm" ref="filterForm" :model="filterForm">
          <Row type="flex" justify="space-between">
            <Col :span="9">
            <Form-item prop="keyword">
              <Input icon="search" type="text" placeholder="keyword or problemID"/>
            </Form-item>
            </Col>
            <Col :span="6">
            <Form-item prop="difficulty">
              <Select v-model="filterForm.difficulty">
                <Option value="Low">Low</Option>
                <Option value="Mid">Mid</Option>
                <Option value="High">High</Option>
              </Select>
            </Form-item>
            </Col>
            <Col :span="7">
            <Form-item style="float: right">
              <Button type="ghost" @click="onReset" style="margin-right: 10px;">Reset</Button>
              <Button type="primary">Filter</Button>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <Table style="width: 100%" :columns="problemTableColumns" :data="problemList" stripe></Table>
    </Card>
    <Page class="pagination" :total="total" :page-size="pageSize" @on-change="changePage"></Page>

    </Col>

    <Col :span="4">
    <Table :columns="tagTableColumns" :data="tagList"></Table>
    <Spin v-if="spinShow" fix size="large"></Spin>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api.js'
  export default {
    name: 'ProblemList',

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
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'problem-details', params: {id: params.row.id}})
                  }
                },
                style: {
                  padding: '2px 0'
                }
              }, params.row.title)
            }
          },
          {
            title: 'Difficulty',
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
            key: 'total_submit_number'
          },
          {
            title: 'Acceptance',
            render: (h, params) => {
              return h('span', this.getACRate(params.row.total_accepted_number, params.row.total_submit_number))
            }
          }

        ],
        problemList: [],
        pageSize: 1,
        total: 0,
        problemLoading: false,
        tagLoading: false,
        currentPage: 1,
        routeName: '',
        contestId: '',
        filterForm: {
          keyword: '',
          difficulty: '',
          tag: ''
        },
        spinShow: true
      }
    },
    mounted() {
      this.routeName = this.$route.name
//      this.contestId = this.$route.params.contestId
      this.getTagList()
      this.getProblemList()
    },
    methods: {
      getACRate(acCount, totalCount) {
        let rate = totalCount === 0 ? 0.00 : (acCount / totalCount * 100).toFixed(2)
        return String(rate) + '%'
      },
      changePage(page) {
        this.$Loading.start()
        this.currentPage = page
        this.getProblemList(page)
      },
      getProblemList(page = 1) {
        let self = this
        let funcName = this.routeName === 'problem-list' ? 'getProblemList' : 'getContestProblemList'
        let offset = (page - 1) * this.pageSize
        api[funcName](offset, this.pageSize, {}, this.contestId).then(res => {
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
      margin-right: 30px;
    }
  }

  .pagination {
    float: right;
    margin-top: 20px;
    margin-right: 10px;
  }
</style>
