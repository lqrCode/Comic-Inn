'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { controller } = app;

  const v1 = app.router.namespace('/api/v1');

  v1.get('/user/wxLogin', controller.v1.user.wxLogin);

  v1.get('/film/HomeList', controller.v1.film.HomeList);
  v1.get('/film/detail', controller.v1.film.FilmDetail);
  v1.get('/film/search', controller.v1.film.FilmSearch);
  v1.get('/film/classifyList', controller.v1.film.filmClassifyList);
  v1.get('/film/weeks', controller.v1.film.filmWeeks);


  v1.get('/comic/home', controller.v1.comic.home);
  v1.get('/comic/detail', controller.v1.comic.detail);
  v1.get('/comic/play', controller.v1.comic.play);
};
