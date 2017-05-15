<template>
  <div style="margin-top: 30px">
    <div class="header">
      <span>
        Language:
        <el-select v-model="lang" @change="onLangChange">
          <el-option v-for="item in languages" :label="item" :value="item">
          </el-option>
        </el-select>
      </span>
      <span style="float: right">
        Theme:
        <el-select v-model="theme" @change="onThemeChange">
          <el-option v-for="item in themes" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </span>
    </div>
    <codemirror :code="currentValue" :options="options" @change="onEditorCodeChange" ref="myEditor">
    </codemirror>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/3024-day.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/twilight.css'
import 'codemirror/theme/material.css'

// mode
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'

// active-line.js
import 'codemirror/addon/selection/active-line.js'

// // foldGutter
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/brace-fold.js'
// import 'codemirror/addon/fold/foldcode.js'
// import 'codemirror/addon/fold/foldgutter.js'
// import 'codemirror/addon/fold/indent-fold.js'

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
        return ['C', 'C++', 'Java', 'Python']
      }
    }
  },
  data() {
    return {
      currentValue: '',
      lang: 'C++',
      theme: 'solarized',
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
        'Python': 'text/x-python'
      },
      themes: [
        { label: 'Monokai', value: 'monokai' },
        { label: 'Solarized Light', value: 'solarized' },
        { label: 'BrightDay', value: '3024-day' },
        { label: 'Base16', value: 'base16-light' },
        { label: 'Twilight', value: 'twilight' },
        { label: 'material', value: 'material' }
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
    },
    onThemeChange(newVal) {
      console.log(newVal)
      this.$refs.myEditor.editor.setOption('theme', newVal)
    }
  }
}
</script>

<style>
.CodeMirror {
  height: auto !important;
}

.CodeMirror-scroll {
  min-height: 300px;
}

.header {
  margin: 20px 5px;
}
</style>
