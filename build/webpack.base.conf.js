'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf'),
MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

console.log(__dirname)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['@babel/polyfill','./src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  target: ['web', 'es5'],

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname,'../src'),
      '@@': path.resolve(__dirname,'../src'),
      'Lib': path.resolve(__dirname,'../src/utils'),
      '@rankadmin':path.resolve(__dirname,'../../rankingvue/src/modules')
    },
    fallback: { "timers": false }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), path.resolve(__dirname,'../../rankingvue/src/modules')],
        options: {
          configFile: './babel.config.json'
      }
      },
      {
        test: /\.scss$/,
        use: [
        MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
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
  plugins:[new VueLoaderPlugin()],
  node:false,
  //3.0后改动
  // node: {
  //   // prevent webpack from injecting useless setImmediate polyfill because Vue
  //   // source contains it (although only uses it if it's native).
  //   //setImmediate: false,
  //   // prevent webpack from injecting mocks to Node native modules
  //   // that does not make sense for the client
  //   __dirname:false,
  // }
}
