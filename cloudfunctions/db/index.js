// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var id = event._id;
  var name = event.dbName;
  console.log("yun:", event._id)
  try {
    return await db.collection(name).doc(id).remove()
  } catch (e) {
    console.log(e)
  }
}