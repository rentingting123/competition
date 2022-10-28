'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const WebpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssPlugin = require("mini-css-extract-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')


const webpackConfig = WebpackMerge.merge(baseWebpackConfig, {
  mode:'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  //devtool:'eval-cheap-module-source-map',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  optimization: {
    moduleIds: 'named',
    splitChunks: {
        chunks: "all",
    },
    minimizer: [
        new TerserWebpackPlugin({
            terserOptions: {
                compress: {
                    drop_console: process.env.NODE_ENV!='test',
                }
            }
        })
    ]},
    target:['web','es5'],

  plugins: [
    new webpack.DefinePlugin({
      'COOKIE_SUFFIX': JSON.stringify('-cctest')
    }),
    new MiniCssPlugin({
      filename: utils.assetsPath('css/[chunkhash].[name].css'),
      chunkFilename: utils.assetsPath('css/[chunkhash].[id].css'),
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'auto'
    }),  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
