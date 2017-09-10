import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import iView from 'iview'
import locale from 'iview/src/locale/lang/en-US'
import VueHighlightJS from 'vue-highlightjs'

import 'iview/dist/styles/iview.css'
import 'highlight.js/styles/atom-one-light.css'
import './styles/index.less'

import Panel from '~/Panel.vue'
import VerticalMenu from '~/verticalMenu/verticalMenu.vue'
import VerticalMenuItem from '~/verticalMenu/verticalMenu-item.vue'

import filters from './utils/filters.js'

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markPoint'

// add global EventBus
const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus
    }
  }
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(iView, {locale})
Vue.use(VueHighlightJS)

Vue.component('ECharts', ECharts)
Vue.component(VerticalMenu.name, VerticalMenu)
Vue.component(VerticalMenuItem.name, VerticalMenuItem)
Vue.component(Panel.name, Panel)

// Vue.use(VueI18n)

// 注册全局消息提示
Vue.prototype.$Message.config({
  duration: 1.8
})
Vue.prototype.$error = Vue.prototype.$Message.error
Vue.prototype.$info = Vue.prototype.$Message.info
Vue.prototype.$success = Vue.prototype.$Message.success
new Vue(Vue.util.extend({router}, App)).$mount('#app')

