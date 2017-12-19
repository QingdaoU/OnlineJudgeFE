import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven
    .config('https://6234a51e61a743b089ed64c51d2f6ea9@sentry.io/258234')
    .addPlugin(RavenVue, Vue)
    .install()
Raven.setUserContext({
  version: process.env.VERSION,
  location: window.location
})
