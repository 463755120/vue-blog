
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const historyApiFallback = require('koa2-connect-history-api-fallback');
const config = require('./webpack.common.conf')('development')
const historyApi = require('./historyApi')
const compiler = webpack(config)
// 处理静态资源文件到webpack内存中
const wdm = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
})
module.exports = function middlewareWbpack(app) {
  //必须放在最前面
  app.use(historyApiFallback({
    verbose: true //打出转发日志
  }))
  app.use(wdm)
  app.use(webpackHotMiddleware(compiler))
}