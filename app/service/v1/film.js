'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');

class HomeService extends Service {
  async HomeList() {
    const { app, ctx } = this;
    const result = await ctx.curl(app.config.targetUrl, {
      dataType: 'text',
      timeout: 30000,
    });
    const $ = cheerio.load(result.data);
    const returnData = {};
    // 轮播图
    returnData.banner = [];
    const banner = $('.fed-swip-wrapper').find('li');
    for (let i = 0; i < banner.length; i++) {
      let id = banner.eq(i).find('a').attr('href');
      id = id.split('/')[id.split('/').length - 1].split('.')[0];
      returnData.banner.push({
        id,
        src: ctx.helper.amendmentImg(app.config.targetUrl, banner.eq(i).find('a').attr('data-background')),
        name: banner.eq(i).find('.fed-swip-head').text(),
        remarks: banner.eq(i).find('.fed-font-xii').text(),
      });
    }
    // 热门影视
    const page = $('.fed-main-info').children('.fed-part-case').children('div');
    for (let i = 0; i < page.length; i++) {
      const title = page.eq(i).find('.fed-font-xvi').text();
      const li = page.eq(i).find('.fed-list-info').find('li');
      switch (title) {
        case '影院热映':
          returnData.remen = ctx.helper.page(li, app);
          break;
        case '电影':
          returnData.dianying = ctx.helper.page(li, app);
          break;
        case '电视':
          returnData.dianshiju = ctx.helper.page(li, app);
          break;
        case '综艺':
          returnData.zongyi = ctx.helper.page(li, app);
          break;
        case '动漫':
          returnData.dongman = ctx.helper.page(li, app);
          break;
        default:
          break;
      }
    }
    return { code: 200, mag: '获取成功', data: returnData };
  }

  async FilmDetail({ id = 23777, sid = 1, nid = 1 }) {
    const { app, ctx } = this;
    const result = await ctx.curl(`${app.config.targetUrl}/index.php/vod/play/id/${id}/sid/${sid}/nid/${nid}.html`, {
      dataType: 'text',
      timeout: 30000,
    });
    const $ = cheerio.load(result.data);
    const returnData = {};
    // 播放地址
    const video = $('.fed-play-iframe').attr('data-play');
    returnData.video = video;
    returnData.video = new Buffer(video.substring(3, video.length), 'base64').toString();
    const playItem = $('.fed-drop-btms').eq(0).find('.fed-play-item');
    returnData.sid = playItem.length;
    returnData.source = [];
    const play = playItem.eq(playItem.length - sid).find('.fed-btns-info');
    for (let i = 0; i < play.length; i++) {
      const nid = play.eq(i).attr('href').split('/')[9];
      const sid = play.eq(i).attr('href').split('/')[7];
      const name = play.eq(i).text();
      returnData.source.push({
        nid: nid.substring(0, nid.length - 5),
        name,
        sid,
      });
    }
    return { code: 200, msg: '获取成功', data: returnData };
  }

  async FilmSearch({ wd = '一拳超人' }) {
    const { ctx, app } = this;
    const returnData = [];
    const result = await ctx.curl(`${app.config.targetUrl}/index.php/vod/search.html`, {
      dataType: 'text',
      timeout: 30000,
      data: {
        wd,
      },
    });
    const $ = cheerio.load(result.data);
    const item = $('.fed-deta-info');
    for (let i = 0; i < item.length; i++) {
      const leftData = item.eq(i).find('.fed-list-pics');
      const img = ctx.helper.amendmentImg(app.config.targetUrl, leftData.attr('data-original'));
      const remarks = leftData.find('.fed-list-remarks').text();

      const src = item.eq(i).find('.fed-font-xvi');
      const id = src.children('a').attr('href').split('/')[5];

      const content = item.eq(i).find('.fed-part-rows').find('li');
      const year = content.eq(4).children('a').text();
      const area = content.eq(3).children('a').text();
      const classify = content.eq(2).children('a').text();
      const director = content.eq(1).children('a').text();
      const protagonist = content.eq(0).children('a').text();

      returnData.push({
        name: src.text(),
        id: id.substring(0, id.length - 5),
        year,
        area,
        classify,
        director,
        protagonist,
        img,
        remarks,
      });
    }
    return { code: 200, msg: 'success', data: { lists: returnData } };
  }

  async filmClassifyList({ by = 'hits', id = '1', page = '1' }) {
    const { ctx, app } = this;
    const returnData = {
      lists: [],
      classIfy: [],
      page,
    };

    const result = await ctx.curl(`${app.config.targetUrl}/index.php/vod/show/by/${by}/id/${id}/page/${page}.html`, {
      dataType: 'text',
      timeout: 30000,
    });
    const $ = cheerio.load(result.data);
    // 列表
    const listItem = $('.fed-list-info').find('li');
    for (let i = 0; i < listItem.length; i++) {
      const element = listItem.eq(i);
      returnData.lists.push({
        name: element.find('.fed-list-title').text(),
        remarks: element.find('.fed-list-remarks').text(),
        src: ctx.helper.amendmentImg(app.config.targetUrl, element.find('.fed-list-pics').attr('data-original')),
        id: element.find('.fed-list-pics').attr('href').split('/')[5].split('.')[0],
      });
    }
    // 分类
    const classifyItem = $('.fed-casc-list').children('dl').eq(1)
      .find('a');
    for (let i = 0; i < classifyItem.length; i++) {
      const element = classifyItem.eq(i);
      const id = element.attr('href').split('/')[7];
      returnData.classIfy.push({
        name: element.text(),
        id: id ? id.split('.')[0] : '1',
      });
    }

    return { code: 200, msg: 'success', data: returnData };
  }

  async filmWeeks() {
    const { ctx } = this;
    const returnData = {
      lists: [],
    };
    const result = await ctx.curl('http://m.xiaomantu.com/', {
      dataType: 'text',
      timeout: 30000,
    });
    const $ = cheerio.load(result.data);
    const item = $('.week-box').find('.week-animes');
    for (let i = 0; i < item.length; i++) {
      const thisList = [];
      const li = item.eq(i).find('li');
      console.log(li.length);
      for (let n = 0; n < li.length; n++) {
        thisList.push({
          name: li.eq(n).find('img').attr('alt'),
          src: `http://m.xiaomantu.com/static/uploads/posters/${li.eq(n).find('img').attr('value')}`,
          remarks: li.eq(n).find('.utime').text(),
        });
      }
      returnData.lists.push(thisList);
    }
    return { code: 200, msg: 'success', data: returnData };
  }
}

module.exports = HomeService;
