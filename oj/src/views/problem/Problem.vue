<template>
  <div class="flex-container">
    <div id="problem-main">
      <!--problem main-->
      <Card :padding="20" dis-hover id="problem-content">
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
      </Card>
      <!--problem main end-->
      <Card :padding="20" id="submit-code" dis-hover>
        <CodeMirror :value="code" @changeCode="onChangeCode" @changeLang="onChangeLang"></CodeMirror>
        <Row type="flex" justify="space-between">
          <Col :span="10">
          <div id="status" v-if="statusVisible">
            <span>Status:</span>
            <a @click.prevent="handleRoute('/status/'+submissionId)">
              <Tag type="dot" :color="submissionStatus.color">{{submissionStatus.text}}</Tag>
            </a>
          </div>
          </Col>
          <Col :span="10">
          <Button type="warning" icon="edit" :loading="submitting" @click="submitCode" class="fl-right">
            <span v-if="!submitting">Submit</span>
            <span v-else>Submitting</span>
          </Button>
          </Col>
        </Row>
      </Card>
    </div>

    <div id="right-column">
      <VerticalMenu @on-click="handleRoute">
        <VerticalMenu-item
          :route="{name: 'submission-list', query: {problemID: this.problemID, contestID: this.contestID}}">
          <Icon type="navicon-round"></Icon>
          Submissions
        </VerticalMenu-item>

        <template v-if="this.contestID !== undefined">
          <VerticalMenu-item :route="{name: 'contest-problem-list', params: {contestID: contestID}}">
            <Icon type="ios-photos"></Icon>
            Problems
          </VerticalMenu-item>

          <VerticalMenu-item :route="{name: 'contest-announcement-list', params: {contestID: contestID}}">
            <Icon type="chatbubble-working"></Icon>
            Announcements
          </VerticalMenu-item>

          <VerticalMenu-item route="">
            <Icon type="pie-graph"></Icon>
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
          <ECharts :option="pie"></ECharts>
        </div>
      </Card>
    </div>

    <Modal v-model="graphVisible">
      <div id="pieChart-detail">
        <ECharts :option="largePie" :initOpts="largePieInitOpts"></ECharts>
      </div>
      <div slot="footer">
        <Button type="ghost">Close</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts-v3/src/lite.vue'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'

  import CodeMirror from '../../components/CodeMirror'
  import api from '../../api'
  import {JUDGE_STATUS} from '../../utils/consts'
  import bus from '../../utils/eventBus'

  // 作图用，如果更改pie图中的顺序 这个也要对应改
  //  const pieNameMap = {
  //    'AC': 4,
  //    'WA': 2,
  //    'TLE': 3,
  //    'MLE': 1,
  //    'RE': 0
  //  }
  const pieMap = {
    'AC': {color: '#19be6b'},
    'WA': {color: '#ed3f14'},
    'TLE': {color: '#495060'},
    'MLE': {color: '#80848f'},
    'RE': {color: '#ff9900'}
  }
  export default {
    name: 'Problem',
    components: {
      CodeMirror,
      ECharts
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
        pie: {
          legend: {
            left: 'center',
            top: '10',
            orient: 'horizontal',
            data: ['AC', 'WA']
          },
          series: [
            {
              name: 'Summary',
              type: 'pie',
              radius: '80%',
              center: ['50%', '55%'],
              itemStyle: {
                normal: {color: this.getPieItemColor}
              },
              data: [
                {value: 0, name: 'WA'},
                {value: 0, name: 'AC'}
              ],
              label: {
                normal: {
                  position: 'inner',
                  show: true,
                  formatter: '{b}: {c}\n {d}%',
                  textStyle: {
                    fontWeight: 'bold'
                  }
                }
              }
            }
          ]
        },
        largePie: {
          selectedMode: 'single',
          legend: {
            left: 'center',
            top: '10',
            orient: 'horizontal',
            itemGap: 20,
            data: ['AC', 'RE', 'WA', 'TLE', 'MLE']
          },
          series: [
            {
              name: 'Detail',
              type: 'pie',
              radius: ['45%', '70%'],
              center: ['50%', '55%'],
              itemStyle: {
                normal: {color: this.getPieItemColor}
              },
              data: [
                {value: 35, name: 'RE'},
                {value: 650, name: 'WA'},
                {value: 110, name: 'TLE'},
                {value: 450, name: 'AC'},
                {value: 0, name: 'MLE'}
              ],
              label: {
                normal: {
                  formatter: '{b}: {c}\n {d}%'
                }
              },
              labelLine: {
                normal: {}
              }
            },
            {
              name: 'Summary',
              type: 'pie',
              radius: '30%',
              center: ['50%', '55%'],
              itemStyle: {
                normal: {color: this.getPieItemColor}
              },
              data: [
                {
                  value: '1245',
                  name: 'WA'
                },
                {
                  value: 450,
                  name: 'AC',
                  selected: true
                }
              ],
              label: {
                normal: {
                  position: 'inner',
                  formatter: '{b}: {c}\n {d}%'
                }
              }
            }
          ]
        },
        // echarts 无法获取隐藏dom的大小，需手动指定
        largePieInitOpts: {
          width: '500',
          height: '500'
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
        let func = this.$route.name === 'problem-details' ? 'getProblem' : 'getContestProblem'
        api[func](this.problemID, this.contestID).then(res => {
          this.problem = res.data.data
          this.changePie(res.data.data)
          bus.$emit('bread-crumb-change', this.problem.title)
        })
      },
      changePie(problemData) {
        let acNum = problemData.total_accepted_number
        this.pie.series[0].data[1].value = acNum
        this.pie.series[0].data[0].value = problemData.total_submit_number - acNum
      },
      getPieItemColor(obj) {
        return pieMap[obj.name].color
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
              if (res.data.data.statistic_info !== undefined) {
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
      font-size: 19px;
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

  #status {
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
    width: 500px;
    height: 500px;
  }
</style>

