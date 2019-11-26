'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.get('blog_content', {});
    console.log(result);
    this.ctx.body = result;
  }

  // 获取文章列表
  async getArticleList() {
    const sql = 'select article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "from_unixtime(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
                'article.view_count as view_count,' +
                'type.typeName as typeName from article left join type on article.type_id = type.id';

    const resList = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: resList,
    };
  }

  // 根据id获取具体文章详情
  async getArticleById() {
    const id = this.ctx.query.id;

    const sql = 'select article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                "from_unixtime(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ,' +
                'type.id as typeId ' +
                'FROM article left join type on article.type_id = type.Id ' +
                'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result,
    };
  }

  // 获取文章分类
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {
      data: result,
    };
  }

  // 根据类别id获取文章列表
  async getListById() {
    const id = this.ctx.query.id;

    const sql = 'select article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "from_unixtime(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
                'article.view_count as view_count,' +
                'type.typeName as typeName ' +
                'from article left join type on article.type_id = type.id ' +
                'where type_id =' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = HomeController;
