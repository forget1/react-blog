let ipURL = 'http://localhost:7001/';

let servicePath = {
  getArticleList: ipURL + 'default/getArticleList',
  getArticleById: ipURL + 'default/getArticleById?id=',
  getTypeInfo: ipURL + 'default/getTypeInfo',
  getListById: ipURL + 'default/getListById?id=',
  checkLogin: ipURL + 'admin/checkLogin',
}

export default servicePath;