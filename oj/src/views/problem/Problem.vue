<template>
  <Row type="flex" justify="space-around">

    <!--problem main-->
    <Col :span=16>
    <Card :padding="20" class="problem-main">
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
    </Col>
    <!--problem main end-->

    <Col :span=6>
    <Row>

      <Col :span="24">
      <Card :padding="0">
        <ul id="operation-menu">
          <li><a @click.prevent="submitDialogVisible=true">
            <Icon type="compose"></Icon>
            Submit Code</a></li>
          <li><a>
            <Icon type="navicon-round"></Icon>
            MySubmissions</a></li>
          <li><a>
            <Icon type="pie-graph"></Icon>
            Statistic</a></li>
        </ul>

      </Card>
      </Col>

      <!--<Col :span="24">-->
      <!--<Card style="overflow: hidden;">-->
      <!--<div slot="title">-->
      <!--Information-->
      <!--</div>-->
      <!--<dl>-->
      <!--<dt>Time Limit</dt>-->
      <!--<dd>{{problem.time_limit}}ms</dd>-->

      <!--<dt>Memory Limit</dt>-->
      <!--<dd>{{problem.memory_limit}}MB</dd>-->

      <!--<dt>Created By</dt>-->
      <!--<dd>{{problem.created_by.username}}</dd>-->

      <!--<dt>Source</dt>-->
      <!--<dd>{{problem.source}}</dd>-->
      <!--</dl>-->
      <!--</Card>-->
      <!--</Col>-->
    </Row>
    </Col>

    <Modal v-model="submitDialogVisible" :mask-closable="false" width="800" title="Submit Code"
           @on-cancel="statusVisible=false">
      <CodeMirror :value="code" @changeCode="onChangeCode" @changeLang="onChangeLang"></CodeMirror>
      <div slot="footer">
        <Row type="flex" justify="space-between">
          <Col :span="10">
          <div id="status" v-if="statusVisible">
            <span>Status:</span>
            <Tag type="dot" :color="submissionStatus.color">{{submissionStatus.text}}</Tag>
          </div>
          </Col>
          <Col :span="10">
          <Button type="ghost" @click="submitDialogVisible=false">Cancel</Button>
          <Button type="info" :loading="submitting" @click="submitCode">
            <span v-if="!submitting">Submit</span>
            <span v-else>Submitting</span>
          </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </Row>

</template>

<script>
  import CodeMirror from '../../components/CodeMirror'
  import api from '../../api'
  import {STATUS} from '../../utils/consts'
  import bus from '../../utils/eventBus'

  export default {
    name: 'Problem',
    components: {
      CodeMirror
    },
    data() {
      return {
        submitDialogVisible: false,
        statusVisible: false,
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
      api.getProblem(this.$route.params.id).then(res => {
        this.problem = res.data.data
        bus.$emit('changeBread', this.problem.title)
      })
    },
    methods: {
      handleClick() {
        console.log('hello')
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
        api.submitCode(this.$route.params.id, this.language, this.code).then(res => {
          this.submissionId = res.data.data.submission_id
          // 定时检查状态
          this.refreshStatus = setInterval(() => {
            let id = this.submissionId
            api.getSubmission(id).then(res => {
              this.result = res.data.data
              if (Object.keys(res.data.data.info).length !== 0) {
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
          text: STATUS[this.result.result]['name'],
          color: STATUS[this.result.result]['color']
        }
      }
    },
    // 防止切换组件后仍然不断请求
    beforeDestroy() {
      clearInterval(this.refreshStatus)
    }
  }
</script>

<style lang="less" scoped>
  .problem-main {
    .title {
      font-size: 19px;
      font-weight: 500;
      margin: 25px 0 8px 0;
    }
    .content {
      text-indent: 1.3em;
      font-size: 15px
    }
  }

  #operation-menu {
    & > li > a {
      color: #495060;
      display: block;
      text-align: left;
      padding: 15px 25px;
      &:hover {
        background: #f8f8f9;
        border-left: 3px solid #5cadff;
      }
      & > .ivu-icon {
        font-size: 16px;
        margin-right: 8px;
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

  dl {
    margin: 0;
    padding: 0;
    dt {
      float: left;
      width: 40%;
      overflow: hidden;
      clear: left;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      padding-right: .625rem;
    }
    dd {
      float: left;
      width: 40%;
    }
  }


</style>

