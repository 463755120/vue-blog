const Koa = require('koa')
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const historyApiFallback = require('koa2-connect-history-api-fallback');
const config = require('./webpack.common.conf')('development')
const historyApi = require('./historyApi')
const app = new Koa()
const compiler = webpack(config)
const opn = require('opn')
// 处理静态资源文件到webpack内存中
const wdm = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
})
//必须放在最前面
app.use(historyApiFallback({
  verbose: true //打出转发日志
}))
app.use(wdm)
app.use(webpackHotMiddleware(compiler))

const Router = require('koa-router')
let cors = require('koa-cors')
const router = new Router()
router.get('/api/test', async ctx => {
  // 后端允许cors跨域请求
  await cors()
  // 返回给前端的数据
  ctx.body = '66'
})
// 将koa和两个中间件连起来
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('The server is running at http://localhost:' + 3000);
  opn('http://localhost:3000')
});