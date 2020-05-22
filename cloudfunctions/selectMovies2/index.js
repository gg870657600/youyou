// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("url:", event.url)
  let url = 'http://api.pingcc.cn/?ysurl=' + event.url;
  return await rp(url)
    .then(function (res) {
      console.log("res:", res)
      return res
    })
    .catch(function (err) {
      return '失败'
    });
}