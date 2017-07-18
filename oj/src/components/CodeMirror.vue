<template>
  <div style="margin: 0px 0px 15px 0px">
    <Row type="flex" justify="space-between" class="header">
      <Col :span=10>
        <div>
          <span>Language:</span>
          <Select v-model="lang" @on-change="onLangChange" class="adjust">
            <Option v-for="item in languages" :key="item" :value="item">{{item}}
            </Option>
          </Select>
        </div>
      </Col>
      <Col :span=10>
        <div class="fl-right">
          <span>Theme:</span>
          <Select v-model="options.theme" class="adjust">
            <Option v-for="item in themes" :key="item.label" :value="item.value">{{item.label}}
            </Option>
          </Select>
        </div>
      </Col>
    </Row>
    <codemirror :code="currentValue" :options="options" @change="onEditorCodeChange" ref="myEditor">
    </codemirror>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'

// theme
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/twilight.css'
import 'codemirror/theme/material.css'

// mode
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'

// active-line.js
import 'codemirror/addon/selection/active-line.js'

// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/indent-fold.js'

export default {
  name: 'CodeMirror',
  components: {
    codemirror
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    languages: {
      type: Array,
      default: () => {
        return ['C', 'C++', 'Java', 'Python2']
      }
    }
  },
  data() {
    return {
      currentValue: '',
      lang: 'C++',
      options: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-c++src',
        theme: 'solarized',
        lineNumbers: true,
        line: true,
        // 代码折叠
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        lineWrapping: false,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
      },
      mode: {
        'C': 'text/x-csrc',
        'C++': 'text/x-c++src',
        'Java': 'text/x-java',
        'Python2': 'text/x-python'
      },
      themes: [
        { label: 'Monokai', value: 'monokai' },
        { label: 'Solarized Light', value: 'solarized' },
        { label: 'Base16', value: 'base16-light' },
        { label: 'Twilight', value: 'twilight' },
        { label: 'Material', value: 'material' }
      ]
    }
  },
  mounted() {
    this.currentValue = this.value
  },
  methods: {
    onEditorCodeChange(newCode) {
      this.currentValue = newCode
      this.$emit('changeCode', newCode)
    },
    onLangChange(newVal) {
      this.$refs.myEditor.editor.setOption('mode', this.mode[newVal])
      this.$emit('changeLang', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
.CodeMirror {
  height: auto !important;
}

.CodeMirror-scroll {
  min-height: 300px;
}

.header {
  margin: 5px 5px 15px 5px;
  .adjust {
    width: 150px;
    margin-left: 10px;
  }
  .fl-right {
    float: right;
  }
}
</style>
