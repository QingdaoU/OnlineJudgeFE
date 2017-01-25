<template>
  <div class="problem">
    <Panel title="Add problem" :small="true">
      <el-form label-position="top" label-width="70px">
        <el-form-item label="Title">
          <el-input placeholder="problem title"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Description">
              <Simditor placeholder=""></Simditor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Time limit (MS, range 1-10000ms)">
              <el-input type="Number" placeholder="time limit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Memory limit (MB, minimum 16M, Java not less than 32M)">
              <el-input type="Number" placeholder="memory limit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Difficulty">
              <el-select class="difficulty-select" size="small" placeholder="Difficulty">
                <el-option label="low" value="low"></el-option>
                <el-option label="mid" value="mid"></el-option>
                <el-option label="high" value="high"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="visible">
              <el-switch
                v-model="visible"
                on-text=""
                off-text="">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="tag">
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
                :fetch-suggestions="querySearch"
              ></el-autocomplete>
              <el-button class="button-new-tag" v-else size="small" @click="inputVisible = true">+ New Tag</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Input Description">
              <el-input
                type="textarea"
                placeholder="Input Description">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Output Description">
              <el-input
                type="textarea"
                placeholder="Output Description">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Samples">
          <Accordion title="Samples 1">
            <el-button type="warning" size="small" icon="delete" slot="header">delete</el-button>
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
          <button class="add-samples"><i class="el-icon-plus"></i>Add Samples</button>
        </el-form-item>
        <el-form-item label="Special Judge">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-checkbox v-model="isUseSpj">use Special Judge</el-checkbox>
              <p class="info">Special Judge用于答案不唯一的情况,需要自己上传判题代码。上传测试用后如需要修改, 必须重新上传对应类型的新测试用例。<a target="_blank" href="https://github.com/QingdaoU/OnlineJudge/wiki/SpecialJudge">帮助和示例</a></p>
            </el-col>
            <el-col v-show="isUseSpj" :span="12">
              <el-form-item label="Special Judge Language">
                <el-radio-group v-model="specialJudgeLanguage">
                  <el-radio :label="3">C</el-radio>
                  <el-radio :label="6">C++</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="isUseSpj" :gutter="20">
            <el-col :span="24">
              <el-form-item label="Special Judge Code">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="Output Description">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Testcase">
          <p class="info">请将所有测试用例打包在一个zip文件中上传，所有文件要在压缩包的根目录，且输入输出文件名要以从1开始连续数字标识要对应例如：
            1.in 1.out 2.in 2.out(普通题目)或者1.in 2.in 3.in(Special Judge) <a target="_blank" href="https://github.com/QingdaoU/OnlineJudge/wiki/%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B%E4%B8%8A%E4%BC%A0">帮助</a></p>
          <el-upload
            action="//jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :default-file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
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
  export default{
    components: {
      Panel, Simditor, Accordion
    },
    data () {
      return {
        visible: true,
        inputVisible: false,
        tags: [],
        tagInput: '',
        isUseSpj: false,
        specialJudgeLanguage: '',
        hint: ''
      }
    },
    mounted () {
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
      }
    }
  }
</script>

<style lang="less" scoped>
.problem{
  .difficulty-select{
    width: 120px;
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
    &:hover {
      background-color: #f9fafc;
    }
    i{
      margin-right: 10px;
    }
  }
  .info{
    font-size: 12px;
    color: #666;
    line-height: 18px;
    margin-top: 0;
  }
}
</style>

