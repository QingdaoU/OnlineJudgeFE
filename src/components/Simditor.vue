<template>
  <textarea ref="editor"></textarea>
</template>

<script>
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
import 'simditor-markdown'
import 'simditor-markdown/styles/simditor-markdown.css'
export default {
  props: {
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
    Simditor.locale = 'en-US'
    this.editor = new Simditor({
      textarea: this.$refs.editor,
      placeholder: this.placeholder,
      toolbar: this.toolbar,
      pasteImage: true,
      markdown: true
    })
    this.editor.on('decorate', (e, src) => {
      this.currentValue = this.editor.getValue()
    })
    let simditorBody = this.$el.parentNode.querySelector('.simditor-body')
    if (simditorBody !== undefined) {
      simditorBody.oninput = () => {
        this.currentValue = this.editor.getValue()
      }
    }
    this.editor.setValue(this.value)
  },
  watch: {
    'value' (val) {
      if (this.currentValue !== val) {
        this.currentValue = val
        this.editor.setValue(val)
      }
    },
    'currentValue' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('change', newVal)
        this.$emit('input', newVal)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
