'use strict';
const a = require('../app/config');

module.exports = appInfo => {
  const config = { a };
  config.APPID = 'wx6ffc0c443200ada9';
  config.APPSECRET = '8bf2b353c2363c382076d8ab83929126';

  config.login_token_time = 86400;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553069657156_9689';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'jwt' ];

  // add your user config here
  const userConfig = {
    targetUrl: 'https://www.lanmays.com',
  };

  // 跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.mysql = {
    clients: {
      // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
      db1: {
        host: '123.207.38.128',
        port: '3306',
        user: 'welfare',
        password: 'mFwJztTEi4eNaa4N',
        database: 'welfare',
      },
      db2: {
        host: '120.24.45.14',
        port: '3306',
        user: 'root',
        password: 'Junsi@123456',
        database: 'jeeplus_zhyq_qixi',
      },
      // ...
    },
    // 所有数据库配置的默认值
    default: {

    },

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 安全
  config.security = {
    methodnoallow: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  // jwt
  config.jwt = {
    enable: true,
    ignore: [ '/api/v1/test/', '/public/', '/api/v1/user/', '/api/v1/comic/', '/api/v1/film/', '/api/v1/fund/', '/api/v1/music/', '/api/v1/upload' ],
  };

  // Socket.IO
  // config.io = {
  //   init: {},
  //   namespace: {
  //     '/': {
  //       connectionMiddleware: [],
  //       packetMiddleware: [],
  //     },
  //     '/nsp': {
  //       connectionMiddleware: [],
  //       packetMiddleware: [],
  //     },
  //   },
  // }

  return {
    ...config,
    ...userConfig,
  };
};
