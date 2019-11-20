'use strict';

const Controller = require('egg').Controller;

class MusicController extends Controller {
  async search() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.music.search({ wd: query.wd, source: query.source });
    ctx.body = res;
  }
  async playlist() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.music.playlist({ id: query.id });
    ctx.body = res;
  }
  async palyUrl() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.music.palyUrl({ id: query.id, source: query.source, pic_id: query.pic_id, lyric_id: query.lyric_id });
    ctx.body = res;
  }
}

module.exports = MusicController;
