<template>
  <codemirror v-model="currentValue" :options="options" ref="editor"></codemirror>
</template>
<script>
  import {codemirror} from 'vue-codemirror'
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/mode/python/python.js'
  export default{
    name: 'CodeMirror',
    data () {
      return {
        currentValue: '',
        options: {
          mode: 'text/x-csrc',
          lineNumbers: true,
          line: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autofocus: true
        }
      }
    },
    components: {
      codemirror
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: 'text/x-csrc'
      }
    },
    mounted () {
      this.currentValue = this.value
    },
    watch: {
      'value' (val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      'currentValue' (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('change', newVal)
          this.$emit('input', newVal)
        }
      },
      'mode' (newVal) {
        this.$refs.editor.editor.setOption('mode', newVal)
      }
    }
  }
</script>
