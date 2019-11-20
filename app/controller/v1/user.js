'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async wxLogin() {
    const { ctx } = this;
    const body = ctx.request.body;

    const res = await ctx.service.v1.user.login(body);
    ctx.body = res;
  }
  async info() {
    const { ctx } = this;
    const body = ctx.request.body;
    const data = {
      id: ctx.locals.userid,
      nickName: body.nickName,
      avatarUrl: body.avatarUrl,
      province: body.province,
      city: body.city,
      gender: body.gender,
    };
    const res = await ctx.service.v1.user.info(data);
    ctx.body = res;
  }
}

module.exports = UserController;
