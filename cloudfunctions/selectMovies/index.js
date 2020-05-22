// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //selectMovies和selectMovies2需要配合使用，selectMovies拿到相关字段后传给selectMovies2
  //url中汉字的处理
  let key = encodeURI(event.key)
  console.log("key:", event.key)
  let url = 'http://api.pingcc.cn/?ysname=' + key;
  return await rp(url)
    .then(function (res) {
      console.log("res:", res)
      return res
    })
    .catch(function (err) {
      return '失败'
    });
}