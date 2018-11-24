const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors')
const app = new Koa()
const opn = require('opn')
const isProd = process.env.NODE_ENV === 'production';
//必须放在最前面
const router = new Router()
if (isProd) {

} else {
  require('../build/server')(app)
}
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
  if(!isProd) {
    opn('http://localhost:3000')
  }
});
