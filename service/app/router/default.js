'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getBlogArticleList', controller.default.home.getBlogArticleList);
  router.get('/default/getArticleById', controller.default.home.getArticleById);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.get('/default/getListById', controller.default.home.getListById);
};
