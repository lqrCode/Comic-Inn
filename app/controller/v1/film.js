'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async HomeList() {
    const { ctx } = this;
    const res = await ctx.service.v1.film.HomeList();
    ctx.body = res;
  }
  async FilmDetail() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.film.FilmDetail({ id: query.id, sid: query.sid, nid: query.nid });
    ctx.body = res;
  }
  async FilmSearch() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.film.FilmSearch({ wd: query.wd });
    ctx.body = res;
  }
  async filmClassifyList() {
    const { ctx } = this;
    const query = this.ctx.query;
    const res = await ctx.service.v1.film.filmClassifyList({ by: query.by, id: query.id, page: query.page });
    ctx.body = res;
  }
  async filmWeeks() {
    const { ctx } = this;
    const res = await ctx.service.v1.film.filmWeeks();
    ctx.body = res;
  }
}

module.exports = HomeController;
