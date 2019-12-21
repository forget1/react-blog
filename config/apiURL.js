let ipURL = 'http://localhost:7001/';

let servicePath = {
  getArticleList: ipURL + 'default/getArticleList',
  getArticleById: ipURL + 'default/getArticleById?id=',
  getTypeInfo: ipURL + 'default/getTypeInfo',
  getListById: ipURL + 'default/getListById?id=',
  checkLogin: ipURL + 'admin/checkLogin', // 检查用户名密码是否正确
  getTypeInfoAdmin: ipURL + 'admin/getTypeInfo', // 获得文章类别信息
  addArticle: ipURL + 'admin/addArticle', // 添加文章
  updateArticle: ipURL + 'admin/updateArticle', // 修改文章
}

export default servicePath;