<template>
  <div class="problem">
    <Panel title="Add problem">
      <el-form label-position="top" label-width="70px">
        <el-form-item label="Title">
          <el-input placeholder="Title"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Description">
              <Simditor placeholder=""></Simditor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Input Description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="Input Description">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Output Description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="Output Description">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Time Limit">
              <el-input type="Number" placeholder="Time Limit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Memory limit">
              <el-input type="Number" placeholder="Memory Limit"></el-input>
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
              <el-checkbox-group v-model="problemAllowedLanguage">
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
                    placeholder="Input Samples">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Output Samples">
                  <el-input
                    :rows="5"
                    type="textarea"
                    placeholder="Output Samples">
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
          <el-input placeholder="Source"></el-input>
        </el-form-item>
        <el-button type="success">Public</el-button>
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
        allLanguage: {},
        problemAllowedLanguage: [],
        samples: [{input: '', output: ''}],
        visible: true,
        inputVisible: false,
        tags: [],
        tagInput: '',
        ruleType: 'ACM',
        spj: {
          useSpj: false,
          language: 'C',
          code: ''
        },
        hint: '',
        difficulty: 'Low',
        testCase: {
          uploaded: false,
          testCaseList: [],
          isSpj: false
        }
      }
    },
    mounted () {
      api.getLanguages().then(res => {
        let allLanguage = res.data.data
        this.allLanguage = allLanguage
        for (let item of allLanguage.languages) {
          this.problemAllowedLanguage.push(item.name)
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
            this.testCase.uploaded = false
            this.testCase.testCaseList = []
          }).catch(() => {})
        }
      }
    },
    methods: {
      querySearch (queryString, cb) {
        cb([
          { 'value': '123' },
          { 'value': '1234' }
        ])
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
        let score = this.ruleType === 'OI' ? 0 : '-'
        for (let file of fileList) {
          file.score = score
          if (this.spj.useSpj) {
            file.output_name = '-'
          }
        }
        this.testCase.testCaseList = fileList
        this.testCase.spj = response.spj
        this.testCase.uploaded = true
      },
      uploadFailed () {
        this.$error('Upload failed')
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

