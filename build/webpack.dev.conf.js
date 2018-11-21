const path = require("path");
const webpack = require("webpack");
const historyApi = require('./historyApi')

module.exports = {

  // devtool:'cheap-module-source-map',
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 1000, //防止重复保存频繁重新编译,1000ms内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
  devServer: {
    // 不使用webpack-dev-server port没有用
    // port: 9001,
    // h5 history 功能开启
    historyApiFallback: true,
    proxy: {},
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}