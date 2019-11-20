'use strict';

// had enabled by egg
// exports.static = true;

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
