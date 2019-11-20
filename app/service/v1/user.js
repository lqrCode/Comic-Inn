'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(data) {
    const { app, ctx } = this;
    const rdata = { code: 1, msg: '' };
    const result = await app.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${app.config.APPID}&secret=${app.config.APPSECRET}&js_code=${data.code}&grant_type=authorization_code`, {
      dataType: 'json',
    });
    if (result.data.openid) {
      const userInfo = await ctx.service.v1.user.userInfo(result.data.openid);
      if (userInfo) {
        const token = ctx.helper.loginToken({ userid: userInfo.id, openid: result.data.openid }, app.config.login_token_time);
        rdata.data = {
          token,
          phone: userInfo.phone,
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
        };
      } else {
        const createUser = await ctx.service.v1.user.createUser(result.data.openid);
        if (createUser) {
          const token = ctx.helper.loginToken({ userid: createUser, openid: result.data.openid }, app.config.login_token_time);
          rdata.data = {
            token,
          };
        } else {
          rdata.code = 0;
          rdata.msg = '用户创建失败';
        }
      }
    } else {
      rdata.errcode = result.data.errcode;
      rdata.msg = result.data.errmsg;
    }
    return rdata;
  }
  // 查找用户信息
  async userInfo(openid) {
    const { app } = this;
    const userInfo = await app.mysql.get('user', { openid });
    return userInfo;
  }
  // 创建用户
  async createUser(openid) {
    const { app } = this;
    const result = await app.mysql.insert('user', { openid });
    console.log(result);
    return result.insertId;
  }
  // 用户信息
  async info(data) {
    const { app } = this;
    const rdata = { code: 1, msg: 'success' };
    console.log(data);
    const result = await app.mysql.update('user', data);
    if (result.affectedRows === 0) {
      rdata.code = 0;
      rdata.msg = result.affectedRows;
    }
    return rdata;
  }
}

module.exports = UserService;
