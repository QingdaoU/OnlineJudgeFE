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
              <Button type="primary">Filter</Button>
              <Button type="ghost">Reset</Button>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <Table style="width: 100%" :columns="columns" :data="problemList" stripe></Table>
    </Card>
    </Col>

    <Col :span="4">
    <Card>
      <ul>
        <li v-for="tag in tagList">
          {{tag.name}}
        </li>
      </ul>
    </Card>
    </Col>
    <!--<div class="pagination">-->
    <!--<el-pagination layout="prev, pager, next, jumper" @current-change="currentChange" :page-size="pageSize"-->
    <!--:total="total">-->
    <!--</el-pagination>-->
    <!--</div>-->
    <!--</div>-->
  </Row>
</template>

<script>
  import api from '../../api.js'
  export default {
    name: 'ProblemList',

    data() {
      return {
        columns: [
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
            key: 'difficulty'
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
        pageSize: 4,
        total: 0,
        problemList: [],
        problemLoading: false,
        tagLoading: false,
        currentPage: 1,
        routeName: '',
        contestId: '',
        tagList: [],
        filterForm: {
          keyword: '',
          difficulty: '',
          tag: ''
        }
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
      // 切换页码回调
      currentChange(page) {
        this.currentPage = page
        this.getProblemList(page)
      },
      getProblemList(page = 1) {
        let funcName = this.routeName === 'problem-list' ? 'getProblemList' : 'getContestProblemList'
        let offset = (page - 1) * this.pageSize
        api[funcName](offset, this.pageSize, {}, this.contestId).then(res => {
          this.total = res.data.data.total
          this.problemList = res.data.data.results
        }, res => {
        })
      },
      getTagList() {
        api.getProblemTagList().then(res => {
          this.tagList = res.data.data
        })
      },
      onReset() {
        this.searchForm = {
          keyword: '',
          difficulty: 'Low',
          tag: ''
        }
        this.getProblemList(1)
      },
      toDetail(problemId) {
        this.$router.push({name: 'problem-details', params: {problemId}})
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

  /*.pagination {*/
  /*float: right;*/
  /*margin-top: 20px;*/
  /*margin-right: 20px;*/
  /*}*/
</style>
