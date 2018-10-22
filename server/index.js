const Koa = require('koa')
const Router = require('koa-router')
let cors = require('koa-cors')
const router = new Router()
const app = new Koa()

// app.use(async (ctx) => {
//   ctx.body = 'hello koa2'
// })
router.get('/api/test', async ctx => {
  // 后端允许cors跨域请求
  await cors()
  // 返回给前端的数据
  ctx.body = '66'
})
// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods())
require('../build/webpack.dev.conf')
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
