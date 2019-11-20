'use strict';

const Controller = require('egg').Controller;

class ComicController extends Controller {
  async home() {
    const { ctx } = this;
    const res = await ctx.service.v1.comic.home();
    ctx.body = res;
  }
  async detail() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.comic.detail(query.id);
    ctx.body = res;
  }
  async play() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.comic.play(query.id, query.pid);
    ctx.body = res;
  }
}

module.exports = ComicController;
