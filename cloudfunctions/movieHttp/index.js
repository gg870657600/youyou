// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //url中汉字的处理

  let name = encodeURI(event.name)
  let url = 'http://api.avatardata.cn/Movie/Query?key=32713d817f144c2596fe40dcb20f92ed&name=' + name;

  return await rp(url)
    .then(function (res) {
      console.log("res:", res)
      return res
    })
    .catch(function (err) {
      return '失败'
    });
}