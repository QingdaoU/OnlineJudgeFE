import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from 'iview/dist/locale/en-US'
import zhCN from 'iview/dist/locale/zh-CN'
import zhTW from 'iview/dist/locale/zh-TW'

Vue.use(VueI18n)

const languages = [
  {value: 'en-US', label: 'English', ui: enUS},
  {value: 'zh-CN', label: '简体中文', ui: zhCN},
  {value: 'zh-TW', label: '繁體中文', ui: zhTW}
]
const messages = {}

// combine admin and oj
for (let lang of languages) {
  let locale = lang.value
  let m = require(`./oj/${locale}`).m
  Object.assign(m, require(`./admin/${locale}`).m)
  messages[locale] = Object.assign({m: m}, lang.ui)
}
// load language packages
export default new VueI18n({
  locale: 'zh-CN',
  messages: messages
})

export {languages}
