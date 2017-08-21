<template>
  <Row type="flex" :gutter="18">
    <Col :span=20>
    <!--<Card :bordered="false" dis-hover :padding="0">-->
      <!--<div slot="title">-->
        <!--<Form id="filterForm" ref="filterForm" :model="filterForm">-->
          <!--<Row type="flex" justify="space-between">-->
            <!--<Col :span="9">-->
            <!--<Form-item prop="keyword">-->
              <!--<Input icon="search" type="text" placeholder="keyword or problemID"/>-->
            <!--</Form-item>-->
            <!--</Col>-->
            <!--<Col :span="6">-->
            <!--<Form-item prop="difficulty">-->
              <!--<Select v-model="filterForm.difficulty">-->
                <!--<Option value="Low">Low</Option>-->
                <!--<Option value="Mid">Mid</Option>-->
                <!--<Option value="High">High</Option>-->
              <!--</Select>-->
            <!--</Form-item>-->
            <!--</Col>-->
            <!--<Col :span="7">-->
            <!--<Form-item style="float: right">-->
              <!--<Button type="ghost" @click="onReset" style="margin-right: 10px;">Reset</Button>-->
              <!--<Button type="primary" @click="onFilter">Filter</Button>-->
            <!--</Form-item>-->
            <!--</Col>-->
          <!--</Row>-->
        <!--</Form>-->
      <!--</div>-->
    <!--</Card>-->
      <Table style="width: 100%; font-size: 16px;" :columns="problemTableColumns" :data="problemList" disabled-hover></Table>
    <Pagination :total="total" :page-size="pageSize" @on-change="changePage"></Pagination>

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
            key: 'total_submit_number'
          },
          {
            title: 'AC Rate',
            render: (h, params) => {
              return h('span', this.getACRate(params.row.total_accepted_number, params.row.total_submit_number))
            }
          }

        ],
        problemList: [],
        pageSize: 5,
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
    created() {
      this.routeName = this.$route.name
      this.getTagList()
      this.getProblemList()
    },
    methods: {
      getACRate(acCount, totalCount) {
        return utils.getACRate(acCount, totalCount)
      },
      changePage(page) {
        this.$Loading.start()
        this.currentPage = page
        this.getProblemList(page)
      },
      getProblemList(page = 1) {
        let self = this
        let offset = (page - 1) * this.pageSize
        api.getProblemList(offset, this.pageSize, {}, this.contestId).then(res => {
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
      },
      onFilter() {
        console.log(this.filterForm)
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
