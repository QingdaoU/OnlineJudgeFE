<template>
  <div class="flex-container">
    <div id="problem-main">
      <!--problem main-->
      <Panel :padding="20" shadow id="problem-content">
        <div slot="title">{{problem.title}}</div>

        <p class="title" style="margin-top: 0">Description</p>
        <p class="content" v-html=problem.description></p>

        <p class="title">Input</p>
        <p class="content" v-html=problem.input_description></p>

        <p class="title">Output</p>
        <p class="content" v-html=problem.output_description></p>


        <div v-for="sample, index in problem.samples">
          <Row type="flex" justify="space-between">
            <Col :span=11>
            <p class="title">Sample Input {{index + 1}}</p>
            <Card dis-hover :padding="8">
              <div>{{sample.input}}</div>
            </Card>
            </Col>
            <Col :span=11>
            <p class="title">Sample Output {{index + 1}}</p>
            <Card dis-hover :padding="8">
              <div>{{sample.output}}</div>
            </Card>
            </Col>
          </Row>
        </div>
        <div v-if="problem.hint">
          <p class="title">Hint</p>
          <Card dis-hover>
            <div class="content" v-html=problem.hint></div>
          </Card>
        </div>
      </Panel>
      <!--problem main end-->
      <Card :padding="20" id="submit-code" dis-hover>
        <CodeMirror :value="code" @changeCode="onChangeCode" @changeLang="onChangeLang"></CodeMirror>
        <Row type="flex" justify="space-between">
          <Col :span="10">
          <div class="status" v-if="statusVisible">
            <span>Status:</span>
            <a @click.prevent="handleRoute('/status/'+submissionId)">
              <Tag type="dot" :color="submissionStatus.color">{{submissionStatus.text}}</Tag>
            </a>
          </div>
          <div class="status" v-if="isSubmitDisabled">
            <Alert type="warning" show-icon>Contest have ended</Alert>
          </div>
          </Col>
          <Col :span="10">
          <Button type="warning" icon="edit" :loading="submitting" @click="submitCode" :disabled="isSubmitDisabled"
                  class="fl-right">
            <span v-if="!submitting">Submit</span>
            <span v-else>Submitting</span>
          </Button>
          </Col>
        </Row>
      </Card>
    </div>

    <div id="right-column">
      <VerticalMenu @on-click="handleRoute">
        <template v-if="this.contestID">
          <VerticalMenu-item :route="{name: 'contest-problem-list', params: {contestID: contestID}}">
            <Icon type="ios-photos"></Icon>
            Problems
          </VerticalMenu-item>

          <VerticalMenu-item :route="{name: 'contest-announcement-list', params: {contestID: contestID}}">
            <Icon type="chatbubble-working"></Icon>
            Announcements
          </VerticalMenu-item>
        </template>

        <VerticalMenu-item
          :route="{name: 'submission-list', query: {problemID: this.problemID, contestID: this.contestID}}">
          <Icon type="navicon-round"></Icon>
          Submissions
        </VerticalMenu-item>

        <template v-if="this.contestID">

          <VerticalMenu-item :route="{name: 'contest-rank', params: {contestID: contestID}}">
            <Icon type="stats-bars"></Icon>
            Ranklist
          </VerticalMenu-item>
          <VerticalMenu-item :route="{name: 'contest-details', params: {contestID: contestID}}">
            <Icon type="home"></Icon>
            View Contest
          </VerticalMenu-item>
        </template>
      </VerticalMenu>

      <Card id="info">
        <div slot="title" class="header">
          <Icon type="information-circled"></Icon>
          <span class="card-title">Information</span>
        </div>
        <ul>
          <li><p>ID</p>
            <p>{{problem._id}}</p></li>
          <li>
            <p>Time Limit</p>
            <p>{{problem.time_limit}}MS</p></li>
          <li>
            <p>Memory Limit</p>
            <p>{{problem.memory_limit}}MB</p></li>
          <li>
            <p>Created By</p>
            <p>{{problem.created_by.username}}</p></li>
          <li>
            <p>Source</p>
            <p>{{problem.source}}</p></li>
        </ul>
      </Card>

      <Card id="pieChart" :padding="0">
        <div slot="title">
          <Icon type="ios-analytics"></Icon>
          <span class="card-title">Statistic</span>
          <Button type="ghost" size="small" id="detail" @click="graphVisible = !graphVisible">Details</Button>
        </div>
        <div class="echarts">
          <ECharts :options="pie"></ECharts>
        </div>
      </Card>
    </div>

    <Modal v-model="graphVisible">
      <div id="pieChart-detail">
        <ECharts :options="largePie" :initOptions="largePieInitOpts"></ECharts>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="graphVisible=false">Close</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import CodeMirror from '@/components/CodeMirror'
  import api from '@/api'
  import auth from '@/utils/auth'
  import storage from '@/utils/storage'
  import {JUDGE_STATUS, STORAGE_KEY} from '@/utils/consts'

  import {pie, largePie} from './chartData'

  export default {
    name: 'Problem',
    components: {
      CodeMirror
    },
    data() {
      return {
        statusVisible: false,
        graphVisible: false,
        contestID: '',
        problemID: '',
        submitting: false,
        code: '',
        language: 'C++',
        submissionId: '',
        isSubmitDisabled: false,
        result: {
          result: 9
        },
        problem: {
          title: '',
          description: '',
          hint: '',
          created_by: {
            username: ''
          }
        },
        pie: pie,
        largePie: largePie,
        // echarts 无法获取隐藏dom的大小，需手动指定
        largePieInitOpts: {
          width: '500',
          height: '480'
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.contestID = this.$route.params.contestID
        this.problemID = this.$route.params.problemID
        if (this.contestID) {
          this.contest = storage.get(STORAGE_KEY.contest + this.contestID)
          this.isSubmitDisabled = this.contest.status !== '0' && this.contest.created_by.id !== auth.getUid()
        }
        let func = this.$route.name === 'problem-details' ? 'getProblem' : 'getContestProblem'
        api[func](this.problemID, this.contestID).then(res => {
          this.problem = res.data.data
          this.changePie(res.data.data)
        })
      },
      changePie(problemData) {
        let acNum = problemData.accepted_number
        let data = [
          {name: 'WA', value: problemData.submission_number - acNum},
          {name: 'AC', value: acNum}
        ]
        this.pie.series[0].data = data
        // 只selected大图，这里需要做一下deepcopy
        let data2 = JSON.parse(JSON.stringify(data))
        data2[1].selected = true
        this.largePie.series[1].data = data2

        // 根据结果设置legend,没有提交过的legend不显示
        let legend = Object.keys(problemData.statistic_info).map(ele => JUDGE_STATUS[ele].short)
        if (legend.length === 0) {
          legend.push('AC', 'WA')
        }
        this.largePie.legend.data = legend

        // 把ac的数据提取出来放在最后
        let acCount = problemData.statistic_info['0']
        delete problemData.statistic_info['0']

        let largePieData = []
        Object.keys(problemData.statistic_info).forEach(ele => {
          largePieData.push({name: JUDGE_STATUS[ele].short, value: problemData.statistic_info[ele]})
        })
        largePieData.push({name: 'AC', value: acCount})
        this.largePie.series[0].data = largePieData
      },
      handleRoute(route) {
        this.$router.push(route)
      },
      onChangeCode(newCode) {
        this.code = newCode
      },
      onChangeLang(newLang) {
        this.language = newLang
      },
      submitCode() {
        if (this.code.trim() === '') {
          this.$error('Code can not be empty')
          return
        }
        this.submissionId = ''
        this.result = {result: 9}
        this.submitting = true
        this.statusVisible = true
        let data = {
          problem_id: this.problemID,
          language: this.language,
          code: this.code,
          contest_id: this.contestID
        }
        api.submitCode(data).then(res => {
          this.submissionId = res.data.data.submission_id
          // 定时检查状态
          this.refreshStatus = setInterval(() => {
            let id = this.submissionId
            api.getSubmission(id).then(res => {
              this.result = res.data.data
              if (Object.keys(res.data.data.statistic_info).length !== 0) {
                this.submitting = false
                clearInterval(this.refreshStatus)
              }
            }, res => {
              this.submitting = false
              clearInterval(this.refreshStatus)
            })
          }, 1000)
        }, res => {
          this.submitting = false
          this.statusVisible = false
        })
      }
    },
    computed: {
      submissionStatus() {
        return {
          text: JUDGE_STATUS[this.result.result]['name'],
          color: JUDGE_STATUS[this.result.result]['color']
        }
      }
    },
    // 防止切换组件后仍然不断请求
    beforeDestroy() {
      clearInterval(this.refreshStatus)
    },
    watch: {
      '$route'() {
        this.init()
      }
    }
  }
</script>

<style lang="less" scoped>
  .card-title {
    margin-left: 8px;
  }

  .flex-container {
    #problem-main {
      flex: auto;
      margin-right: 18px;
    }
    #right-column {
      flex: none;
      width: 220px;
    }
  }

  #problem-content {
    .title {
      font-size: 18px;
      font-weight: 400;
      margin: 25px 0 8px 0;
      color: #3091f2;
    }
    .content {
      text-indent: 1.3em;
      font-size: 15px
    }
  }

  #submit-code {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #info {
    margin-bottom: 20px;
    margin-top: 20px;
    ul {
      list-style-type: none;
      li {
        border-bottom: 1px dotted #e9eaec;
        margin-bottom: 10px;
        p {
          display: inline-block;
        }
        p:first-child {
          width: 90px;
        }
        p:last-child {
          float: right;
        }
      }
    }
  }

  .status {
    float: left;
    span {
      margin-right: 10px;
      margin-left: 10px;
    }
  }

  .fl-right {
    float: right;
  }

  #pieChart {
    .echarts {
      height: 250px;
      width: 210px;
    }
    #detail {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  #pieChart-detail {
    margin-top: 20px;
    width: 500px;
    height: 480px;
  }
</style>

