import koa from "koa"
import cors from "koa-cors"
import path from "path"
import mongoose from 'mongoose';
import middleware from './middleware';
import api from './api';
import config from './serverConfig/index';
import serve  from 'koa-static'
const app = new koa()
const home  = serve(path.join(__dirname+"../../dist/"));
const isDeve = process.env.NODE_ENV === 'development';
//必须放在最前面
console.log(process.env.NODE_ENV,"node中变量")
if (isDeve) {
  require('../build/server')(app)
}
mongoose.Promise = Promise;
// connect mongodb
mongoose.connect(config.mongodb.url, config.mongodbSecret);
mongoose.connection.on('error', console.error);
app.use(home)
app.use(middleware())
app.use(api())
app.listen(config.app.port, () => {
  console.log('The server is running at http://localhost:' + 3000);
  
});
