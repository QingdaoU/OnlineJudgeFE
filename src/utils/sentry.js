import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

const options = {
  release: process.env.VERSION,
  ignoreUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Firefox extensions
    /^resource:\/\//i,
    // Ignore Google flakiness
    /\/(gtm|ga|analytics)\.js/i
  ]
}

Raven
  .config('https://6234a51e61a743b089ed64c51d2f6ea9@sentry.io/258234', options)
  .addPlugin(RavenVue, Vue)
  .install()

Raven.setUserContext({
  version: process.env.VERSION,
  location: window.location
})
