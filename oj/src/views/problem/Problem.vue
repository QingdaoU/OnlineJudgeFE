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

      <div v-if="problem.hint">
        <p class="title">Hint</p>
        <Card dis-hover>
          <div class="content" v-html=problem.hint></div>
        </Card>
      </div>

      <div v-for="sample, index in problem.samples">
        <Row type="flex" justify="space-between">
          <Col :span=11>
          <p class="title">Sample Input {{index + 1}}</p>
          <Card dis-hover :padding="10">
            <div>{{sample.input}}</div>
          </Card>
          </Col>
          <Col :span=11>
          <p class="title">Sample Output {{index + 1}}</p>
          <Card dis-hover :padding="10">
            <div>{{sample.output}}</div>
          </Card>
          </Col>
        </Row>
      </div>
      </Card>
    </Col>
    <!--problem main end-->

    <Col :span=6>
    <Card style="overflow: hidden;">
      <div slot="title">
        Information
      </div>
      <dl>
        <dt>Time Limit</dt>
        <dd>{{problem.time_limit}}ms</dd>

        <dt>Memory Limit</dt>
        <dd>{{problem.memory_limit}}MB</dd>

        <dt>Created By</dt>
        <dd>{{problem.created_by.username}}</dd>

        <dt>Source</dt>
        <dd>{{problem.source}}</dd>
      </dl>
    </Card>
    </Col>

    <!--<el-dialog title="Submit Code" :visible.sync="dialogVisible">-->
    <!--Baidu INC.-->
    <!--&lt;!&ndash;<CodeMirror :value="code" @changeCode="onChangeCode" @changeLang="onChangeLang"></CodeMirror>&ndash;&gt;-->
    <!--&lt;!&ndash;<span v-show="submissionId">Status: {{sumissionStatus}}</span>&ndash;&gt;-->
    <!--&lt;!&ndash;<Button type="warning" class="fl-right" @click="submitCode"> Submit </Button>&ndash;&gt;-->
    <!--</el-dialog>-->
  </Row>

</template>

<script>
  import CodeMirror from '../../components/CodeMirror'
  import api from '../../api'
  import {STATUS} from '../../utils/utils'
  import bus from '@/utils/eventBus'

  export default {
    name: 'Problem',
    components: {
      CodeMirror
    },
    data() {
      return {
        dialogVisible: true,
        code: '',
        language: 'C++',
        submissionId: '',
        result: {
          result: 6
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
      onChangeCode(newCode) {
        this.code = newCode
      },
      onChangeLang(newLang) {
        this.language = newLang
      },
      openDialog() {
        this.dialogVisible = true
      },
      submitCode() {
        this.submissionId = ''
        this.result = {result: 9}
        api.submitCode(this.$route.params.id, this.language, this.code).then(res => {
          this.submissionId = res.data.data.submission_id
          this.refreshStatus = setInterval(() => {
            let id = this.submissionId
            api.getSubmission(id).then(res => {
              this.result = res.data.data
              if (Object.keys(res.data.data.info).length !== 0) {
                clearInterval(this.refreshStatus)
              }
            })
          }, 1000)
        })
      }
    },
    computed: {
      sumissionStatus() {
        return STATUS[this.result.result]
      }
    },
    // 防止切换组件仍然不断请求
    beforeDestroy() {
      clearInterval(this.refreshStatus)
    }
  }
</script>

<style lang="less" scoped>
  .problem-main {
    .title {
      font-size: 19px;
      font-weight:500;
      margin: 25px 0 8px 0;
    }
    .content {
      text-indent: 1.3em;
      font-size: 15px
    }
  }
  /*.Card {*/
    /*box-shadow: none;*/
    /*background-color: #F9FAFC;*/
  /*}*/

  /*h4 {*/
    /*color: #324057;*/
    /*font-weight: 500;*/
  /*}*/

  /*p {*/
    /*font-weight: 400;*/
    /*margin: 10px 10px;*/
    /*color: #475669;*/
  /*}*/

  /*hr {*/
    /*margin: 20px 5px;*/
    /*border: 0;*/
    /*border-top: 1px solid #eee;*/
  /*}*/

  .fl-right {
    float: right;
  }

  /*.header {*/
    /*line-height: 40px;*/
    /*font-size: 18px;*/
    /*margin-bottom: 10px;*/

  /*}*/

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

