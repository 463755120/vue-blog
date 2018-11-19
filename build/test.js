const Koa = require('koa')
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const config = require('./webpack.common.conf')('development')
const app = new Koa()
const compiler = webpack(config)
const opn = require('opn')

const wdm = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
})
app.use(wdm)
app.use(webpackHotMiddleware(compiler))
app.listen(3000, () => {
  console.log('The server is running at http://localhost:' + 3000);
  opn('http://localhost:3000')
});
