let utils = require('./utils')
let webpack = require('webpack')
let config = require('../config')
let merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  // add local server
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin()
  ],
  mode: 'development'
})
