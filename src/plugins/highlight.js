import hljs from 'highlight.js/lib/highlight'
import cpp from 'highlight.js/lib/languages/cpp'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import 'highlight.js/styles/atom-one-light.css'
import highlightjsLineNumbers from 'highlightjs-line-numbers2.js'
import './linenumbers.css'

hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('java', java)
hljs.registerLanguage('python', python)

export default {
  install (Vue, options) {
    Vue.directive('highlight', {
      deep: true,
      bind: function (el, binding) {
        // init highlightjs-line-numbers2
        highlightjsLineNumbers.init(hljs)
        // on first bind, highlight all targets
        Array.from(el.querySelectorAll('code')).forEach((target) => {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          if (binding.value) {
            target.textContent = binding.value
          }
          hljs.highlightBlock(target)
        })
        // add line numbers
        hljs.initLineNumbersOnLoad({singleLine: true})
      },
      componentUpdated: function (el, binding) {
        // init highlightjs-line-numbers2
        highlightjsLineNumbers.init(hljs)
        // after an update, re-fill the content and then highlight
        Array.from(el.querySelectorAll('code')).forEach((target) => {
          if (binding.value) {
            target.textContent = binding.value
          }
          hljs.highlightBlock(target)
        })
        // add line numbers
        hljs.initLineNumbersOnLoad({singleLine: true})
      }
    })
  }
}
