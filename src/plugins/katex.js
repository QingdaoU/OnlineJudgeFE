import 'katex'
import renderMathInElement from 'katex/contrib/auto-render/auto-render'
import 'katex/dist/katex.min.css'

const defaultOptions = {
  errorCallback: null,
  delimiters: [
    {left: '$', right: '$', display: false},
    {left: '$$', right: '$$', display: true},
    {left: '\\[', right: '\\]', display: true},
    {left: '\\(', right: '\\)', display: false}
  ]
}

function render (el, binding) {
  let options = {}
  if (binding.value) {
    options = binding.value.options || {}
  }
  Object.assign(options, defaultOptions)
  console.log(el, options)
  renderMathInElement(el, options)
}

export default {
  install: function (Vue, options) {
    Vue.directive('katex', {
      bind: render,
      componentUpdated: render
    })
  }
}
