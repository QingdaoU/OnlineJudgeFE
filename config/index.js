'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const commonProxy = {
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Referer', process.env.TARGET)
  },
  target: process.env.TARGET,
  changeOrigin: true
}

module.exports = {
  build: {
    env: require('./prod.env'),
    ojIndex: path.resolve(__dirname, '../dist/index.html'),
    ojTemplate: path.resolve(__dirname, '../src/pages/oj/index.html'),
    adminIndex: path.resolve(__dirname, '../dist/admin/index.html'),
    adminTemplate: path.resolve(__dirname, '../src/pages/admin/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: process.env.USE_SENTRY === '1',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api": commonProxy,
      "/public": commonProxy
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
