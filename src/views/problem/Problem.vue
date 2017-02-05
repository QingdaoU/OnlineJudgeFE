<template>
  <div class="problem">
    <Panel :title="title">
      <el-form ref="form" :model="problem" :rules="rules" label-position="top" label-width="70px">
        <el-form-item prop="title" label="Title" required>
          <el-input placeholder="Title" v-model="problem.title"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="description" label="Description" required>
              <Simditor placeholder="" v-model="problem.description"></Simditor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item required prop="input_description" label="Input Description" required>
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="Input Description"
                v-model="problem.input_description">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item required prop="output_description" label="Output Description" required>
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="Output Description"
                v-model="problem.output_description">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Time Limit" required>
              <el-input type="Number" placeholder="Time Limit" v-model="problem.time_limit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Memory limit" required>
              <el-input type="Number" placeholder="Memory Limit" v-model="problem.memory_limit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Difficulty">
              <el-select class="difficulty-select" size="small" placeholder="Difficulty" v-model="problem.difficulty">
                <el-option label="Low" value="Low"></el-option>
                <el-option label="Mid" value="Mid"></el-option>
                <el-option label="High" value="High"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Visible">
              <el-switch
                v-model="problem.visible"
                on-text=""
                off-text="">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Tag" :error="error.tags" required>
              <span class="tags">
                <el-tag
                  v-for="tag in problem.tags"
                  :closable="true"
                  :close-transition="false"
                  type="success"
                  @close="closeTag(tag)"
                >{{tag}}</el-tag>
              </span>
              <el-autocomplete
                v-if="inputVisible"
                size="mini"
                class="input-new-tag"
                v-model="tagInput"
                :trigger-on-focus="false"
                @keyup.enter.native="addTag"
                @select="addTag"
                :fetch-suggestions="querySearch">
              </el-autocomplete>
              <el-button class="button-new-tag" v-else size="small" @click="inputVisible = true">+ New Tag</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Languages" :error="error.languages" required>
              <el-checkbox-group v-model="problem.languages">
                <el-tooltip class="spj-radio" v-for="lang in allLanguage.languages" effect="dark" :content="lang.description" placement="top-start">
                  <el-checkbox :label="lang.name"></el-checkbox>
                </el-tooltip>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
        <el-form-item v-for="(sample, index) in problem.samples">
          <Accordion :title="'Sample' + (index + 1)">
            <el-button type="warning" size="small" icon="delete" slot="header" @click="deleteSample(index)">Delete</el-button>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Input Samples" required>
                  <el-input
                    :rows="5"
                    type="textarea"
                    placeholder="Input Samples"
                    v-model="sample.input">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Output Samples" required>
                  <el-input
                    :rows="5"
                    type="textarea"
                    placeholder="Output Samples"
                    v-model="sample.output">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </Accordion>
        </el-form-item>
        </div>
        <div class="add-sample-btn">
          <button type="button" class="add-samples" @click="addSample()"><i class="el-icon-plus"></i>Add Samples</button>
        </div>
        <el-form-item label="Code Template">
          <el-row>
            <el-col :span="24" v-for="(v, k) in template">
              <el-form-item>
                <el-checkbox v-model="v.checked">{{ k }}</el-checkbox>
                <div v-if="v.checked">
                  <code-mirror v-model="v.code" :mode="v.mode"></code-mirror>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Special Judge" :error="error.spj">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-checkbox v-model="problem.spj" @click.native.prevent="switchSpj()">Use Special Judge</el-checkbox>
            </el-col>
            <el-col v-if="problem.spj" :span="12">
              <el-form-item label="Special Judge Language">
                <el-radio-group v-model="problem.spj_language">
                  <el-tooltip class="spj-radio" v-for="lang in allLanguage.spj_languages" effect="dark" :content="lang.description" placement="top-start">
                    <el-radio :label="lang.name">{{ lang.name }}</el-radio>
                  </el-tooltip>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item v-if="problem.spj" label="Special Judge Code">
            <code-mirror v-model="problem.spj_code" :mode="mode"></code-mirror>
          </el-form-item>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="TestCase" :error="error.testcase">
              <el-upload
                action="/api/admin/test_case/upload"
                name="file"
                :data="{spj: problem.spj}"
                :show-upload-list="false"
                :on-success="uploadSucceeded"
                :on-error="uploadFailed">
                <el-button size="small" type="primary">Choose File</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Type">
              <el-radio-group v-model="problem.rule_type">
                <el-radio label="ACM">ACM</el-radio>
                <el-radio label="OI">OI</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="problem.test_case_score"
              style="width: 100%">
              <el-table-column
                prop="input_name"
                label="Input">
              </el-table-column>
              <el-table-column
                prop="output_name"
                label="Output">
              </el-table-column>
              <el-table-column
                prop="score"
                label="Score">
                <template scope="scope">
                  <el-input
                    size="small"
                    placeholder="Score"
                    v-model="scope.row.score"
                    :disabled="problem.rule_type !== 'OI'">
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-form-item style="margin-top: 20px" label="Hint">
          <Simditor v-model="problem.hint" placeholder=""></Simditor>
        </el-form-item>
        <el-form-item label="Source">
          <el-input placeholder="Source" v-model="problem.source"></el-input>
        </el-form-item>
        <el-button type="success" @click="submit()">Save</el-button>
      </el-form>
    </Panel>
  </div>
</template>

<script>
  import Panel from '../../components/Panel'
  import Simditor from '../../components/Simditor'
  import Accordion from '../../components/Accordion'
  import CodeMirror from '../../components/CodeMirror'
  import api from '../../api'
  export default{
    name: 'Problem',
    components: {
      Panel, Simditor, Accordion, CodeMirror
    },
    data () {
      return {
        rules: {
          title: { required: true, message: 'title is required', trigger: 'blur' },
          input_description: { required: true, message: 'Input Description is required', trigger: 'blur' },
          output_description: { required: true, message: 'Output Description is required', trigger: 'blur' }
        },
        mode: 'text/x-src',
        problem: {
          languages: []
        },
        reProblem: {
          languages: []
        },
        testCaseUploaded: false,
        allLanguage: {},
        inputVisible: false,
        tagInput: '',
        template: {},
        title: '',
        error: {
          tags: '',
          spj: '',
          languages: '',
          testCase: ''
        }
      }
    },
    mounted () {
      this.problem = this.reProblem = {
        title: '',
        description: '',
        input_description: '',
        output_description: '',
        time_limit: 1000,
        memory_limit: 256,
        difficulty: 'Low',
        visible: true,
        tags: [],
        languages: [],
        template: {},
        samples: [{input: '', output: ''}],
        spj: false,
        spj_language: 'C',
        spj_code: '',
        test_case_id: '',
        test_case_score: [],
        rule_type: 'ACM',
        hint: '',
        source: ''
      }
      api.getLanguages().then(res => {
        let allLanguage = res.data.data
        this.allLanguage = allLanguage

        // get problem after getting languages list to avoid find undefined value in `watch problem.languages`
        if (this.$route.name === 'edit-problem') {
          this.title = 'Edit Problem'
          api.getProblem(this.$route.params.id).then(problemRes => {
            let data = problemRes.data.data
            if (!data.spj_code) {
              data.spj_code = ''
            }
            data.spj_language = data.spj_language || 'C'
            this.problem = data
            setTimeout(() => {
              this.testCaseUploaded = true
            })
          })
        } else {
          this.title = 'Add Problem'
          for (let item of allLanguage.languages) {
            this.problem.languages.push(item.name)
          }
        }
      })
    },
    watch: {
      '$route' () {
        this.$refs.form.resetFields()
        this.problem = this.reProblem
      },
      'problem.languages' (newVal) {
        let data = {}
        for (let item of newVal) {
          if (this.template[item] === undefined) {
            let mode = this.allLanguage.languages.find(lang => {
              return lang.name === item
            }).content_type
            if (this.problem.template[item] === undefined) {
              data[item] = {checked: false, code: '', mode: mode}
            } else {
              data[item] = {checked: true, code: this.problem.template[item], mode: mode}
            }
          } else {
            data[item] = this.template[item]
          }
        }
        this.template = data
      },
      'spj.language' (newVal) {
        this.spj.mode = this.allLanguage.spj_languages.find(item => {
          return item.name === this.spj.language
        }).content_type
      }
    },
    methods: {
      switchSpj () {
        if (this.testCaseUploaded) {
          this.$confirm('If you change problem judge method, you need to re-upload test cases', 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.problem.spj = !this.problem.spj
            this.resetTestCase()
          }).catch(() => {})
        } else {
          this.problem.spj = !this.problem.spj
        }
      },
      querySearch (queryString, cb) {
        api.getProblemTagList().then(res => {
          let tagList = []
          for (let tag of res.data.data) {
            tagList.push({value: tag})
          }
          cb(tagList)
        }).catch(() => {})
      },
      resetTestCase () {
        this.testCaseUploaded = false
        this.problem.test_case_score = []
        this.problem.test_case_id = ''
      },
      addTag () {
        let inputValue = this.tagInput
        if (inputValue) {
          this.problem.tags.push(inputValue)
        }
        this.inputVisible = false
        this.tagInput = ''
      },
      closeTag (tag) {
        this.problem.tags.splice(this.problem.tags.indexOf(tag), 1)
      },
      addSample () {
        this.problem.samples.push({input: '', output: ''})
      },
      deleteSample (index) {
        this.problem.samples.splice(index, 1)
      },
      uploadSucceeded (response) {
        if (response.error) {
          this.$error(response.data)
          return
        }
        let fileList = response.data.info
        for (let file of fileList) {
          file.score = 0
          if (this.problem.spj) {
            file.output_name = '-'
          }
        }
        this.problem.test_case_score = fileList
        this.testCaseUploaded = true
        this.problem.test_case_id = response.data.id
      },
      uploadFailed () {
        this.$error('Upload failed')
      },
      submit () {
        if (!this.problem.samples.length) {
          this.$error('Sample is required')
          return
        }
        for (let sample of this.problem.samples) {
          if (!sample.input || !sample.output) {
            this.$error('Sample input and output is required')
            return
          }
        }
        if (!this.problem.tags.length) {
          this.error.tags = 'Please add at least one tag'
          this.$error(this.error.tags)
          return
        }
        if (this.problem.spj && !this.problem.spj_code) {
          this.error.spj = 'Spj code is required'
          this.$error(this.error.spj)
          return
        }
        if (!this.problem.languages.length) {
          this.error.languages = 'Please choose at least one language for problem'
          this.$error(this.error.languages)
          return
        }
        if (!this.testCaseUploaded) {
          this.error.testCase = 'Test case is not uploaded yet'
          this.$error(this.error.testCase)
          return
        }
        if (this.problem.rule_type === 'OI') {
          for (let item of this.problem.test_case_score) {
            try {
              if (parseInt(item.score) <= 0) {
                this.$error('Invalid test case score')
                return
              }
            } catch (e) {
              this.$error('Test case score must be an integer')
              return
            }
          }
        }
        this.problem.template = {}
        for (let k in this.template) {
          if (this.template[k].checked) {
            this.problem.template[k] = this.template[k].code
          }
        }
        let funName = this.$route.name === 'edit-problem' ? 'editProblem' : 'createProblem'
        api[funName](this.problem).then(res => {
          this.$router.push({name: 'problems'})
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="less" scoped>
.problem{
  .difficulty-select{
    width: 120px;
  }
  .spj-radio{
    margin-right: 15px;
  }
  .input-new-tag{
    width: 78px;
  }
  .button-new-tag{
    height: 24px;
    line-height: 22px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .tags{
    .el-tag{
      margin-right: 10px;
    }
  }
  .accordion{
    margin-bottom: 10px;
  }
  .add-samples{
    width: 100%;
    background-color: #fff;
    border: 1px dashed #aaa;
    outline: none;
    cursor: pointer;
    color: #666;
    height: 35px;
    font-size: 14px;
    &:hover {
      background-color: #f9fafc;
    }
    i{
      margin-right: 10px;
    }
  }
  .add-sample-btn {
    margin-bottom: 10px;
  }
}
</style>

