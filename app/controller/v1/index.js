'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    const { ctx, app } = this;
    const a = await app.jpushAsync.sendToAll('hello world');
    ctx.body = a;
  }
}

module.exports = IndexController;
