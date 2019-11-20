'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function userInterceptor(ctx, next) {
    let authToken = ctx.header.authorization;
    if (authToken) {
      authToken = authToken.substring(7);
      const res = verifyToken(authToken);
      if (res.userid) {
        ctx.locals.userid = res.userid;
        ctx.locals.openid = res.openid;
        await next();
      } else {
        ctx.body = { code: 50012, msg: '您的登录状态已过期，请重新登录' };
      }
    } else {
      ctx.body = { code: 50008, msg: '您还没有登录，请登陆后再进行操作' };
    }
  };
};

// 解密
function verifyToken(token) {
  const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'));
  let res = '';
  try {
    const result = jwt.verify(token, cert, { algorithms: [ 'RS256' ] }) || {};
    const { exp } = result,
      current = Math.floor(Date.now() / 1000);
    if (current <= exp) res = result.data || {};
  } catch (e) {
    console.log(e);
  }
  return res;
}
