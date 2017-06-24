<template>
  <el-row type="flex" justify="space-around">

    <!--problem main-->
    <el-col :span=16>
      <panel :title="problem.title">
        <template slot="header">
          <el-button type="warning" icon="edit" @click="openDialog">Submit</el-button>
        </template>
        <h4>Description</h4>
        <p v-html=problem.description></p>

        <h4>Input</h4>
        <p v-html=problem.input_description></p>

        <h4>Output</h4>
        <p v-html=problem.output_description></p>

        <div v-if="problem.hint">
          <h4>Hint</h4>
          <el-card :body-style=cardStyle>
            <div v-html=problem.hint></div>
          </el-card>
        </div>

        <div v-for="sample, index in problem.samples">
          <el-row>
            <el-col :span=9>
              <h4>Sample Input {{index + 1}}</h4>
              <el-card :body-style=cardStyle>
                <div>{{sample.input}}</div>
              </el-card>
            </el-col>
            <el-col :span=10 :offset=2>
              <h4>Sample Output {{index + 1}}</h4>
              <el-card :body-style=cardStyle>
                <div>{{sample.output}}</div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </panel>
    </el-col>
    <!--problem main end-->

    <el-col :span=6>
      <Card>
        <div class="header">
          Problem Info
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
    </el-col>

    <el-dialog title="Submit Code" :visible.sync="dialogVisible">
      Baidu INC.
      <!--<CodeMirror :value="code" @changeCode="onChangeCode" @changeLang="onChangeLang"></CodeMirror>-->
      <!--<span v-show="submissionId">Status: {{sumissionStatus}}</span>-->
      <!--<el-button type="warning" class="fl-right" @click="submitCode"> Submit </el-button>-->
    </el-dialog>
  </el-row>

</template>

<script>
  import CodeMirror from '../../components/CodeMirror'
  import Card from '../../components/Card'
  import api from '../../api'
  import {STATUS} from '../../utils/utils'
  import Panel from '../../components/Panel'

  export default {
    name: 'Problem',
    components: {
      Panel,
      CodeMirror,
      Card
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
        },
        cardStyle: {
          padding: '5px 10px'
        }
      }
    },
    mounted() {
      api.getProblem(this.$route.params.id).then(res => {
        this.problem = res.data.data
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
        console.log(this.dialogVisible)
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

  .el-card {
    box-shadow: none;
    background-color: #F9FAFC;
  }

  h4 {
    color: #324057;
    font-weight: 500;
  }

  p {
    font-weight: 400;
    margin: 10px 10px;
    color: #475669;
  }

  hr {
    margin: 20px 5px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .fl-right {
    float: right;
  }

  .header {
    line-height: 40px;
    font-size: 18px;
    margin-bottom: 10px;

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

