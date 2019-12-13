'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'API';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;

    const sql = `select username from admin_user where username = '${userName}' and password = '${password}'`;
    const res = await this.app.mysql.query(sql);

    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { 'openId': openId };
      this.ctx.body = { data: '登录成功', 'openId': openId };
    } else {
      this.ctx.body = { data: '登陆失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId,
    };
  }
}

module.exports = MainController;
