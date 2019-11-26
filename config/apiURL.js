let ipURL = 'http://localhost:7001/default/';

let servicePath = {
  getArticleList: ipURL + 'getArticleList',
  getArticleById: ipURL + 'getArticleById?id=',
  getTypeInfo: ipURL + 'getTypeInfo',
  getListById: ipURL + 'getListById?id=',
  checkLogin: ipURL + 'checkLogin',
}

export default servicePath;