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
  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }
  // 获取文章列表
  async getArticleList() {
    const sql = 'select article.id as id,' +
                'article.title as title,' +
                "from_unixtime(article.addTime, '%Y-%m-%d') as addTime," +
                'type.typeName as typeName ' +
                'from article left join type on article.type_id = type.id ' +
                'order by article.id desc';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { 'id': id });
    this.ctx.body = {
      data: res,
    };
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getAdminArticleById() {
    const id = this.ctx.params.id;
    const sql = 'select article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "from_unixtime(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT join type on article.type_id = type.id ' +
      'where article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = MainController;
