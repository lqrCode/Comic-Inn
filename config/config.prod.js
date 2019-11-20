'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});
  console.log(appInfo.baseDir);
  console.log('+++++++++++++++++++++++++++++++++++++');
  //  Node.js 性能平台
  config.alinode = {
    appid: '80363',
    secret: '88312ea3b3c3eb76e83db4073a3d166525baa9fc',
    packages: [ path.join(appInfo.baseDir, 'package.json') ],
    logdir: path.join(appInfo.baseDir, '/alinode'),
    error_log: [ path.join(appInfo.baseDir, '/alinode/error-alinode.log') ],
  };

  return config;
};
