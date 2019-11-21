'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');

class ComicService extends Service {
  /**
   * ++++++++++【首页】++++++++++
   */
  async home() {
    const { ctx } = this;
    const returnData = { banner: [], floor: [], rank: [] };
    const result = await ctx.curl('https://m.zymk.cn', { dataType: 'text', timeout: 30000 });
    const $ = cheerio.load(result.data);
    const mk = $('.mk-container');
    // banner
    const banner = mk.children('.swiper-banner').children('.swiper-wrapper').find('a');
    for (let i = 0; i < banner.length; i++) {
      const _banner = banner.eq(i);
      const _href = _banner.attr('href');
      returnData.banner.push({
        id: _href.substring(1, _href.length - 1),
        title: _banner.attr('title'),
        image: _banner.attr('data-src'),
      });
    }
    // floor
    const floor = mk.find('.mk-floor');
    for (let i = 0; i < floor.length; i++) {
      const _floor = floor.eq(i);
      const _list = [];
      const li = _floor.children('.swiper-floor').find('li');
      for (let e = 0; e < li.length; e++) {
        const _li = li.eq(e);
        _list.push({
          desc: _li.find('.desc').text(),
          title: _li.find('.title').children('a').text(),
          id: _li.find('img').attr('data-id'),
          score: _li.find('.score').text(),
          chapter: _li.find('.chapter').text(),
          image: _li.find('img').attr('data-src'),
        });

      }
      returnData.floor.push({
        title: _floor.children('.hd').find('.title')
          .text(),
        summary: _floor.children('.hd').find('.summary')
          .text(),
        floor_lists: _list,
      });
    }
    // rank
    const rank = mk.children('#rank-tabs').children('.swiper-container-tab').find('.swiper-slide');
    for (let i = 0; i < rank.length; i++) {
      const _list = [];
      const li = rank.eq(i).find('li');
      for (let e = 0; e < li.length; e++) {
        const _li = li.eq(e);
        _list.push({
          id: _li.find('img').attr('data-id'),
          title: _li.children('.title').children('a').text(),
          remark: _li.children('.count').text(),
          image: _li.find('img').attr('data-src'),
        });
      }
      returnData.rank.push({
        title: mk.children('#rank-tabs').children('.hd').find('.ift-fire')
          .eq(i)
          .text(),
        rank_lists: _list,
      });

    }
    // 数据返回
    return { code: '000000', mag: '获取成功', data: returnData };
  }


  /**
   * ++++++++++【详情】++++++++++
   * @param {Srting} id 漫画ID
   */
  async detail(id = '1') {
    const { ctx } = this;
    const returnData = { chapter: [], production: [] };
    const result = await ctx.curl(`https://m.zymk.cn/${id}/`, { dataType: 'text', timeout: 30000 });
    const $ = cheerio.load(result.data);
    const mk = $('.mk-container');
    // 漫画信息
    const info = mk.find('.comic-info');
    returnData.title = info.children('.name').text();
    returnData.image = info.find('img').attr('data-src');
    returnData.author = info.children('.author').text();
    returnData.hot = info.children('.ift-fire').text();
    // 漫画信息
    const detail = mk.find('.comic-detail');
    returnData.intro = detail.children('.content').text(); // 简介
    returnData.author_info = { // 作者信息
      avatar: detail.find('.author-info').children('img').attr('data-src'),
      name: detail.find('.name').text(),
      fans: detail.find('.fans-num').text(),
    };
    returnData.author_notice = detail.find('.content').eq(2).text(); // 作者公告
    // 集数
    const chapter = mk.children('#comicDetailTab').find('.chapterlist');
    const li = chapter.find('li');
    for (let i = 0; i < li.length; i++) {
      const _li = li.eq(i);
      returnData.chapter.push({
        id: _li.attr('data-id'),
        uptime: _li.attr('data-uptime'),
        name: _li.children('a').text(),
      });
    }
    // 作者作品
    const production = mk.children('#comicDetailTab').find('.autor-production').find('.swiper-slide');
    for (let i = 0; i < production.length; i++) {
      const _li = production.eq(i);
      returnData.production.push({
        image: _li.find('img').attr('data-src'),
        id: _li.find('img').attr('data-id'),
        chapter: _li.find('.chapter').text(),
        desc: _li.find('.desc').text(),
        title: _li.find('.title').children('a').text(),
        score: _li.find('.score').text(),
      });
    }

    // 数据返回
    return { code: '000000', mag: '获取成功', data: returnData };
  }


  /**
   * ++++++++++【播放】++++++++++
   * @param {Srting} id 漫画ID
   * @param {Srting} pid 播放ID
   */
  async play(id = '1', pid = '231390') {
    const { ctx } = this;
    const returnData = { images: [] };
    const result = await ctx.curl(`https://m.zymk.cn/${id}/${pid}.html`, { dataType: 'text', timeout: 30000 });
    const $ = cheerio.load(result.data);
    const mk = $('.header');
    // 图片破解
    const counts = parseInt(mk.find('.total-page').text());
    const start = result.data.indexOf('middle:"');
    const end = result.data.indexOf('$$.jpg-zymk.middle.webp');
    const url = result.data.substring(start + 8, end);
    for (let i = 1; i < counts + 1; i++) {
      returnData.images.push(`https://mhpic.xiaomingtaiji.net/comic/${url}${i}.jpg-zymk.middle.webp`);
    }
    // 数据返回
    return { code: '000000', mag: '获取成功', data: returnData };
  }
}
module.exports = ComicService;
