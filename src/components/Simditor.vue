<template>
  <textarea id="editor" autofocus></textarea>
</template>

<script>
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
export default {
  props: {
    placeholder: {
      type: String,
      default: '这里输入文字...'
    },
    toolbar: {
      type: Array,
      default: () => ['title', 'bold', 'italic', 'underline', 'fontScale', 'color', 'ol', 'ul', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment']
    }
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    Simditor.locale = 'zh-CN'
    this.editor = new Simditor({
      textarea: document.getElementById('editor'),
      placeholder: this.placeholder,
      toolbar: this.toolbar,
      pasteImage: true
    })
  }
}
</script>

<style lang="less" scoped>
</style>
