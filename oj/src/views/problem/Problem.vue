<template>
  <el-row>
    <el-col :span=22 :offset=2>
      <el-col :span=4>
        <el-card :body-style="{padding: '0px', fontSize: '14px'}">
          <ul>
            <li>
              <span>Time Limit:
                <strong>{{problem.time_limit}}</strong>
              </span>
            </li>
            <li>
              <span>Memory Limit:
                <strong>{{problem.memory_limit}}</strong>
              </span>
            </li>
            <li>
              <span>Created By:
                <strong>{{problem.created_by.username}}</strong>
              </span>
            </li>
            <li>
              <span>Source:
                <strong>{{problem.source}}</strong>
              </span>
            </li>
          </ul>
        </el-card>
  
      </el-col>
      <!--problem main-->
      <el-col :span=17 :offset=1>
        <h1 class="title">{{problem.title}}</h1>
        <h3>Description</h3>
        <p v-html=problem.description></p>
  
        <h3>Input</h3>
        <p v-html=problem.input_description></p>
  
        <h3>Output</h3>
        <p v-html=problem.output_description></p>
  
        <div v-if="problem.hint">
          <h3>Hint</h3>
          <el-card :body-style=cardStyle>
            <div v-html=problem.hint></div>
          </el-card>
        </div>
  
        <div v-for="sample, index in problem.samples">
          <el-row>
            <el-col :span=11>
              <h3>Sample Input {{index + 1}}</h3>
              <el-card :body-style=cardStyle>
                <div>{{sample.input}}</div>
              </el-card>
            </el-col>
            <el-col :span=12 :offset=1>
              <h3>Sample Output {{index + 1}}</h3>
              <el-card :body-style=cardStyle>
                <div>{{sample.output}}</div>
              </el-card>
            </el-col>
          </el-row>
        </div>
  
        <CodeMirror :value="code" @changeCode="onChangeCode" @changeLang="onChangeLang"></CodeMirror>
      </el-col>
      <!--problem main end-->
    </el-col>
    </el-col>
  </el-row>
</template>

<script>
import CodeMirror from '../../components/CodeMirror'
import api from '../../api'
export default {
  name: 'Problem',
  components: {
    CodeMirror
  },
  data() {
    return {
      code: '',
      language: '',
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
      console.log(newLang)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  color: #324057;
  font-weight: 400;
  margin-bottom: 20px;
}

.el-card {
  box-shadow: none;
  background-color: #F9FAFC;
}

h3 {
  color: #324057;
  font-weight: 500;
}

hr {
  margin: 20px 5px;
  border: 0;
  border-top: 1px solid #eee;
}
</style>

