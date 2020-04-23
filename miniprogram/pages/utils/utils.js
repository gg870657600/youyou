function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//长按删除数据库数据
function handleLongPress(e) {
  console.log('id:', e.currentTarget.dataset.id);
  var id = e.currentTarget.dataset.id; //获取当前长按msg id
  //有时候长按会获取不到id
  if (id == null) {
    wx.showToast({
      icon: 'none',
      title: '未获取到id，请长按重新尝试',
    })
    return
  }
  //原生删除
  // const db = wx.cloud.database();
  // db.collection('msg').doc(id).remove({
  //   success(res) {
  //     console.log(res.data)
  //   }
  // })
  wx.showModal({
    title: '提示',
    content: '确定要删除该条信息吗？',
    success: function (res) {
      if (res.confirm) {
        wx.showLoading({
          title: '删除中...',
        })
        //云函数删除
        wx.cloud.callFunction({
          name: "db",
          data: {
            _id: id,
          },
          success: res => {
            console.log(id)
            wx.showToast({
              title: '[云函数db] 删除成功！！',
            })
            console.log('[云函数db] 删除成功！！ ', res)
            wx.hideLoading();
          },
          fail: err => {
            wx.showToast({
              title: '[云函数db] 调用失败' + err,
            })
            console.error('[云函数db] 调用失败', err)
          }
        })
      } else if (res.cancel) {
        return false;
      }

    }
  })

}
module.exports = {
  formatTime: formatTime,
  handleLongPress: handleLongPress
}