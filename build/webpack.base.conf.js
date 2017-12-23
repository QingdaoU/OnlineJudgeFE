'use strict'
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function getEntries () {
  const base = {
    'oj': ['./src/pages/oj/index.js'],
    'admin': ['./src/pages/admin/index.js']
  }
  if (process.env.USE_SENTRY === '1') {
    Object.keys(base).forEach(entry => {
      base[entry].push('./src/utils/sentry.js')
    })
  }
  return base
}

// get all entries
const entries = getEntries()
console.log("All entries: ")
Object.keys(entries).forEach(entry => {
  console.log(entry)
  entries[entry].forEach(ele => {
    console.log("- %s", ele)
  })
  console.log()
})

// prepare vendor asserts
const globOptions = {cwd: resolve('static/js')};
let vendorAssets = glob.sync('vendor.dll.*.js', globOptions);
vendorAssets = vendorAssets.map(file => 'static/js/' + file)


module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@oj': resolve('src/pages/oj'),
      '@admin': resolve('src/pages/admin'),
      '~': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [vendorAssets[0]],
      files: ['index.html', 'admin/index.html'],
      append: false
    }),
  ]
}
