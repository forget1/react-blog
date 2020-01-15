let ipURL = 'http://localhost:7001/';

let servicePath = {
  getBlogArticleList: ipURL + 'default/getBlogArticleList',
  getArticleById: ipURL + 'default/getArticleById?id=',
  getTypeInfo: ipURL + 'default/getTypeInfo',
  getListById: ipURL + 'default/getListById?id=',
  checkLogin: ipURL + 'admin/checkLogin', // 检查用户名密码是否正确
  getTypeInfoAdmin: ipURL + 'admin/getTypeInfo', // 获得文章类别信息
  addArticle: ipURL + 'admin/addArticle', // 添加文章
  updateArticle: ipURL + 'admin/updateArticle', // 修改文章
  getArticleList: ipURL + 'admin/getArticleList', // 文章列表
  delArticle: ipURL + 'admin/delArticle', // 删除文章
  getAdminArticleById: ipURL + 'admin/getAdminArticleById'
}

export default servicePath;