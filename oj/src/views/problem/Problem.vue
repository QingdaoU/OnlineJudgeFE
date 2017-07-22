<template>
  <Row type="flex" justify="space-around">

    <!--problem main-->
    <Col :lg="18" :md="18" :sm="17" :xm="16">
    <Card :padding="20" dis-hover id="problem-main">
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
      <!--problem main end-->

    </Card>
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
    </Col>

    <Col :lg="4" :md="4" :sm="5" :xm="6">
    <Row>
      <Col :span="24">
      <VerticalMenu @on-click="handleRoute">
        <VerticalMenu-item
          :route="{name: 'submission-list', query: {problemID: this.problemID, contestID: this.contestID}}">
          <Icon type="navicon-round"></Icon>
          Submissions
        </VerticalMenu-item>

        <VerticalMenu-item v-if="this.contestID === undefined" route="">
          <Icon type="pie-graph"></Icon>
          Statistic
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
      </Col>

      <Col :span="24">
      <Card style="margin-top: 20px;" id="info">
        <div slot="title" class="header">
          Information
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
            <p>AC Count</p>
            <p>{{problem.total_accepted_number}}</p></li>
          <li>
            <p>Total Count</p>
            <p>{{problem.total_submit_number}}</p></li>
          <li>
            <p>Created By</p>
            <p>{{problem.created_by.username}}</p></li>
          <li>
            <p>Source</p>
            <p>{{problem.source}}</p></li>
        </ul>
      </Card>
      </Col>

    </Row>
    </Col>

  </Row>

</template>

<script>
  import CodeMirror from '../../components/CodeMirror'
  import api from '../../api'
  import {JUDGE_STATUS} from '../../utils/consts'
  import bus from '../../utils/eventBus'

  export default {
    name: 'Problem',
    components: {
      CodeMirror
    },
    data() {
      return {
        statusVisible: false,
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
          bus.$emit('bread-crumb-change', this.problem.title)
        })
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
        api.submitCode(this.problemID, this.language, this.code).then(res => {
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
            })
          }, 1000)
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
  #problem-main {
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
  }

  #info {
    .header {
      font-size: 16px;
    }
    ul {
      list-style-type: none;
      li {
        border-bottom: 1px dotted #e9eaec;
        margin-bottom: 10px;
        p {
          display: inline-block;
        }
        p:first-child {
          width: 120px;
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

</style>

