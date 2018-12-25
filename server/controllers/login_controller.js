import User from '../models/user';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from '../serverConfig/index';
const ERRMESG = '用户账号密码错误'
export async function initUser() {
  let user = await User.find().exec().catch(err => {
    console.log(err,'发生错误*****');
  });
  if (user.length === 0) {
    // 目前还没做修改密码的功能，因为是单用户系统觉得需求不大
    // 如果想更换用户名／密码，先将数据库原有user删除(drop)
    // 配置中加入用户名密码，重启服务即可
    user = new User({
      name: 'wzg',
      username: config.admin.user,
      password: md5(config.admin.pwd).toUpperCase(),
      avatar: '',
      createTime: new Date(),
    });
    await user.save().catch(err => {
      console.log(err);
    });
  }
}
export async function login(ctx) {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  let user = await User.findOne({
    username,
  }).exec();
  if (user !== null) {
    if (user.password === password) {
      const token = jwt.sign({
        uid: user._id,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 天
      }, config.jwt.secret);
      ctx.body = {
        success: true,
        uid: user._id,
        name: user.name,
        token: token,
      };
    }else {
      ctx.body = {
        success: false,
        errMsg:'密码错误'
      };
    }
  } else {
    ctx.body = {
      success: false,
      errMsg:'用户名错误'
    };
  }
}