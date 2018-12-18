import koa from "koa"
import cors from "koa-cors"
import opn from "opn"
import mongoose from 'mongoose';
import middleware from './middleware';
import api from './api';
import config from './serverConfig/index';
const app = new koa()
const isProd = process.env.NODE_ENV === 'production';
//必须放在最前面
if (isProd) {

} else {
  require('../build/server')(app)
}
mongoose.Promise = Promise;
// connect mongodb
mongoose.connect(config.mongodb.url, config.mongodbSecret);
mongoose.connection.on('error', console.error);
app.use(middleware())
app.use(api())
app.listen(config.app.port, () => {
  console.log('The server is running at http://localhost:' + 3000);
  if(!isProd) {
  //  opn('http://localhost:3000')
  }
});
