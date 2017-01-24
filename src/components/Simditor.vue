<template>
  <textarea id="editor"></textarea>
</template>

<script>
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
import 'simditor-markdown'
import 'simditor-markdown/styles/simditor-markdown.css'
export default {
  props: {
    placeholder: {
      type: String,
      default: 'please input...'
    },
    toolbar: {
      type: Array,
      default: () => ['title', 'bold', 'italic', 'underline', 'fontScale', 'color', 'ol', 'ul', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment', '|', 'markdown']
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      currentValue: this.value
    }
  },
  mounted () {
    Simditor.locale = 'zh-CN'
    this.editor = new Simditor({
      textarea: document.getElementById('editor'),
      placeholder: this.placeholder,
      toolbar: this.toolbar,
      pasteImage: true,
      markdown: true
    })
    this.editor.on('decorate', (e, src) => {
      this.currentValue = this.editor.getValue()
    })
    document.querySelector('.markdown-editor>textarea').oninput = () => {
      this.currentValue = this.editor.getValue()
    }
    this.editor.setValue(this.value)
  },
  watch: {
    'value' (val) {
      this.currentValue = val
      this.editor.setValue(val)
    },
    'currentValue' (newVal, oldVal) {
      this.$emit('change', newVal)
      this.$emit('input', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
