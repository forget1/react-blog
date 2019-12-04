'use strict';

module.exports = app => {
  const { router, controller } = app;
  let adminauth = app.middleware.adminauth();
  router.get('/admin/index', adminauth, controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
};