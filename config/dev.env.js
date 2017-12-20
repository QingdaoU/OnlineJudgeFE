let date = require('moment')().format('YYYYMMDD')
let commit = require('child_process').execSync('git rev-parse HEAD').toString().slice(0, 5)
let version = `"${date}-${commit}"`

console.log(`current version is ${version}`)

module.exports = {
  NODE_ENV: '"development"',
  VERSION: version,
  USE_SENTRY: '0'
}
