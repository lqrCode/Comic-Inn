'use strict';
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = {
  // loginToken
  loginToken(data, expires) {
    const exp = Math.floor(Date.now() / 1000) + expires;
    const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));
    const token = jwt.sign({ data, exp }, cert, { algorithm: 'RS256' });
    return token;
  },

  // 文件写入
  async writeFile(_path = 'lqrui', _name = 'lqrui.text', _data = 'lqrui.cn') {
    try {
      _path = _path.split('/');
      let this_path = '';
      for (let i = 0; i < _path.length; i++) {
        this_path += `/${_path[i]}`;
        if (!(await fs.existsSync(path.join(__dirname, `../public${this_path}`)))) await fs.mkdirSync(path.join(__dirname, `../public${this_path}`));
      }
      await fs.writeFileSync(path.join(__dirname, `../public${this_path}/${_name}`), _data);
      return `${this_path}/${_name}`;
    } catch (err) {
      return false;
    }
  },

  async getParam(url) {
    const theRequest = {};
    if (url.indexOf('?') !== -1) {
      const str = url.substr(url.indexOf('?') + 1, url.length);
      const strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  },
  RandomNumBoth(Min, Max) {
    return Min + Math.round(Math.random() * Max - Min);
  },

  // 电影爬虫处理
  page(data, app) {
    const returnData = [];
    for (let i = 0; i < data.length; i++) {
      let id = data.eq(i).find('a').attr('href');
      id = id.split('/')[id.split('/').length - 1].split('.')[0];
      let src = data.eq(i).find('a').attr('data-original');
      if (src.indexOf('http') === -1) {
        src = app.config.targetUrl + data.eq(i).find('a').attr('data-original');
      }
      returnData.push({
        id,
        src: this.amendmentImg(app.config.targetUrl, src),
        score: data.eq(i).find('.fed-list-score').text(),
        remarks: data.eq(i).find('.fed-list-remarks').text(),
        name: data.eq(i).find('.fed-list-title').text(),
      });
    }
    return returnData;
  },

  amendmentImg(http, src) {
    if (src.indexOf('http') === -1) return http + src;
    return src;
  },


};
