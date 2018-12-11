const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const env = require('../config/prod.env')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    //打包分析工具
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin('../dist'),
    //解决vue-router 懒加载打包报错 的问题
    new ExtractTextPlugin({
      filename: './static/css/[name].min.css',
      allChunks: true,
    }),
    new UglifyJsPlugin({
      // 开启多线程打包
      parallel: true,
      cache:true,
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {
          // 是否删除console
          drop_console:true,
        },
        mangle: true, // Note `mangle.properties` is `false` by default.
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false,
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({})
    ]
  }
}