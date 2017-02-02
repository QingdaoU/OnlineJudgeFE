<template>
  <div class="problem">
    <Panel title="Add problem">
      <el-form label-position="top" label-width="70px">
        <el-form-item label="Title">
          <el-input placeholder="Title" v-model="title"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Description">
              <Simditor placeholder="" v-model="description"></Simditor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Input Description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="Input Description"
                v-model="inputDescription">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Output Description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="Output Description"
                v-model="outputDescription">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Time Limit">
              <el-input type="Number" placeholder="Time Limit" v-model="timeLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Memory limit">
              <el-input type="Number" placeholder="Memory Limit" v-model="memoryLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Difficulty">
              <el-select class="difficulty-select" size="small" placeholder="Difficulty" v-model="difficulty">
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
                v-model="visible"
                on-text=""
                off-text="">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Tag">
              <span class="tags">
                <el-tag
                  v-for="tag in tags"
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
            <el-form-item label="Languages">
              <el-checkbox-group v-model="languages">
                <el-tooltip class="spj-radio" v-for="lang in allLanguage.languages" effect="dark" :content="lang.description" placement="top-start">
                  <el-checkbox :label="lang.name"></el-checkbox>
                </el-tooltip>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
        <el-form-item v-for="(sample, index) in samples">
          <Accordion :title="'Sample' + (index + 1)">
            <el-button type="warning" size="small" icon="delete" slot="header" @click="deleteSample(index)">Delete</el-button>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Input Samples">
                  <el-input
                    :rows="5"
                    type="textarea"
                    placeholder="Input Samples"
                    v-model="sample.input">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Output Samples">
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
        <el-form-item label="Special Judge">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-checkbox v-model="spj.useSpj">Use Special Judge</el-checkbox>
            </el-col>
            <el-col v-show="spj.useSpj" :span="12">
              <el-form-item label="Special Judge Language">
                <el-radio-group v-model="spj.language">
                  <el-tooltip class="spj-radio" v-for="lang in allLanguage.spj_languages" effect="dark" :content="lang.description" placement="top-start">
                    <el-radio :label="lang.name">{{ lang.name }}</el-radio>
                  </el-tooltip>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="spj.useSpj" :gutter="20">
            <el-col :span="24">
              <el-form-item label="Special Judge Code">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="Output Description"
                  v-model="spj.code">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="Testcase">
              <el-upload
                action="/api/admin/test_case/upload"
                name="file"
                :data="{spj: spj.useSpj}"
                :show-upload-list="false"
                :on-success="uploadSucceeded"
                :on-error="uploadFailed">
                <el-button size="small" type="primary">Choose File</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Type">
              <el-radio-group v-model="ruleType">
                <el-radio label="ACM">ACM</el-radio>
                <el-radio label="OI">OI</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="testCase.testCaseList"
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
                    :disabled="ruleType !== 'OI'">
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-form-item label="Hint">
          <Simditor v-model="hint" placeholder=""></Simditor>
        </el-form-item>
        <el-form-item label="Source">
          <el-input placeholder="Source" v-model="source"></el-input>
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
  import api from '../../api'
  export default{
    name: 'Problem',
    components: {
      Panel, Simditor, Accordion
    },
    data () {
      return {
        title: '',
        description: '',
        inputDescription: '',
        outputDescription: '',
        timeLimit: 1000,
        memoryLimit: 256,
        difficulty: 'Low',
        visible: true,
        tags: [],
        languages: [],
        samples: [{input: '', output: ''}],
        spj: {
          useSpj: false,
          language: 'C',
          code: ''
        },
        testCase: {
          uploaded: false,
          testCaseList: [],
          isSpj: false,
          testCaseId: ''
        },
        ruleType: 'ACM',
        hint: '',
        source: '',
        allLanguage: {},
        inputVisible: false,
        tagInput: ''
      }
    },
    mounted () {
      api.getLanguages().then(res => {
        let allLanguage = res.data.data
        this.allLanguage = allLanguage
        for (let item of allLanguage.languages) {
          this.languages.push(item.name)
        }
      })
    },
    watch: {
      'spj.useSpj' (newVal) {
        if (this.testCase.uploaded && newVal !== this.testCase.spj) {
          this.$confirm('If you change problem judge method, you need to re-upload test cases', 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.resetTestCase()
          }).catch(() => {})
        }
      }
    },
    methods: {
      querySearch (queryString, cb) {
        api.getProblemTagList().then(res => {
          let tagList = []
          for (let tag in res.data.data) {
            tagList.push({value: tag})
          }
          cb(tagList)
        }).catch(() => {})
      },
      resetTestCase () {
        this.testCase.uploaded = false
        this.testCase.testCaseList = []
        this.testCase.testCaseId = ''
      },
      addTag () {
        let inputValue = this.tagInput
        if (inputValue) {
          this.tags.push(inputValue)
        }
        this.inputVisible = false
        this.tagInput = ''
      },
      closeTag (tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      },
      addSample () {
        this.samples.push({input: '', output: ''})
      },
      deleteSample (index) {
        this.samples.splice(index, 1)
      },
      uploadSucceeded (response) {
        if (response.error) {
          this.$error(response.data)
          return
        }
        let fileList = response.data.info
        for (let file of fileList) {
          file.score = 0
          if (this.spj.useSpj) {
            file.output_name = '-'
          }
        }
        this.testCase.testCaseList = fileList
        this.testCase.isSpj = response.data.spj
        this.testCase.uploaded = true
        this.testCase.testCaseId = response.data.id
      },
      uploadFailed () {
        this.$error('Upload failed')
      },
      submit () {
        if (!this.samples.length) {
          this.$error('Sample is required')
          return
        }
        for (let sample of this.samples) {
          if (!sample.input || !sample.output) {
            this.$error('Sample input and output is required')
            return
          }
        }
        if (!this.tags.length) {
          this.$error('Please add at least one tag"')
          return
        }
        if (this.spj.useSpj && !this.spj.code) {
          this.$error('Spj code is required')
          return
        }
        if (!this.languages.length) {
          this.$error('Please choose at least one language for problem')
          return
        }
        if (!this.testCase.uploaded) {
          this.$error('Test case is not uploaded yet')
          return
        }
        if (this.ruleType === 'OI') {
          for (let item of this.testCase.testCaseList) {
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
        let data = {title: this.title,
          description: this.description,
          input_description: this.inputDescription,
          output_description: this.outputDescription,
          time_limit: this.timeLimit,
          memory_limit: this.memoryLimit,
          difficulty: this.difficulty,
          visible: this.visible,
          tags: this.tags,
          languages: this.languages,
          samples: this.samples,
          spj: this.spj.useSpj,
          spj_language: this.spj.language,
          spj_code: this.spj.code,
          test_case_id: this.testCase.testCaseId,
          test_case_score: this.testCase.testCaseList,
          rule_type: this.ruleType,
          hint: this.hint,
          source: this.source}
        api.createProblem(data).catch(() => {})
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

