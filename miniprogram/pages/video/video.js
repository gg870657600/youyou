// pages/video/video.js
const app = getApp()
var fileID = []
var videoListStart = 0
var total
var limitNum = 10;
var fileId = ""
Page({
  /**
 * 页面的初始数据
 */
  data: {
    videoId: [],
    fileid: "",
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    const db = wx.cloud.database();

    async function videodata() {
      const db = wx.cloud.database()
      //获取video数据总条数      
      const rescount = await db.collection('video').count()
      total = rescount.total
      //分几次取
      const count = Math.ceil(total / 20)
      console.log('count:', rescount)
     
      const vdata = await db.collection('video').orderBy('createTime', 'desc').skip(videoListStart).limit(limitNum).get()
      vdata.data.forEach(item => {
        fileID.push(item.fileId)
      })
      console.log('fileID:', fileID)
      
      _this.setData({
        videoId: fileID
      })

    }
    videodata()
    fileID = []
  },

  //长按事件
  bindLongTap(e) {
    const t = e.target.dataset.fileid
    fileId = e.target.dataset.fileid;
    console.log("长按事件",t)
    this.setData({
      show : true,
      fileid: t
    })
  },
  //下载视频
  downloadVideo(e) {
    const fileUrl = this.data.fileid
    console.log('fileUrl', fileUrl)
    this.setData({
      show: false
    })
    wx.showLoading({
      title: '下载中',
    })
    wx.cloud.downloadFile({
      fileID: fileUrl,
      success: res => {
        // 获取零时路径
        console.log(res.tempFilePath)
        wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res3 => {
            console.log(res3)
            // wx.showToast({
            //   title: '下载成功',
            //   icon: 'success',
            //   mask: true,
            //   duration: 5000
            // })
            wx.hideLoading()
          }
        })
        
      },
      fail: err => {
        // handle error
      }
    })
  },
  //关闭隐藏页面
  hidePageClose() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    const db = wx.cloud.database()
    //获取image数据总条数      
    const rescount = db.collection('video').count()
    if (total != rescount.total) {
      _this.onLoad();
    }
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  //需要在app.json中配置window   "enablePullDownRefresh": true
  onPullDownRefresh: function () {
    console.log('xiala')    
    if (videoListStart - limitNum >= 0) {
      videoListStart -= limitNum
      this.onLoad()
      wx.showToast({
        icon: 'none',
        title: '上一页...',
        duration: 2000
      })
    }
    wx.stopPullDownRefresh();
  },

  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {   
    if (videoListStart + limitNum < total) {
      videoListStart += limitNum
      this.onLoad()
      wx.showToast({
        icon: 'none',
        title: '下一页...',
        duration: 2000
      })
      return
    }
    wx.showToast({
      icon: 'none',
      title: '没有啦...',
      duration: 2000
    })
  },
  deleteVideo:function(e){
    console.log('fileId:', fileId);
    var _this = this;
    //有时候长按会获取不到id
    if (fileId == null) {
      wx.showToast({
        title: '未获取到id，请长按重新尝试',
        icon: 'none',
      })
      return
    }

    wx.showModal({
      title: '提示',
      content: '确定要删除该视频吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          })
          //数据库 原生删除
          const db = wx.cloud.database();
          db.collection('video').where({
            fileId: fileId
          }).remove()
            .then(() => {
              console.log("数据库视频删除成功");
              wx.hideLoading();
            })
            .catch(err => {
              console.log(err);
            });
          //云函数删除
          wx.cloud.callFunction({
            name: "cloudStorage",
            data: {
              fileId: fileId
            },
            success: res => {
              wx.showToast({
                title: '[云存储] 删除成功！！',
                icon: 'none',
              })
              console.log('[云存储] 删除成功！！ ', res)
              wx.hideLoading();
              fileId = ""
              _this.hidePageClose();
              _this.onLoad();
            },
            fail: err => {
              wx.showToast({
                title: '[云存储] 调用失败' + err,
                icon: 'none',
              })
              console.error('[云存储] 调用失败', err)
            }
          })
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
})