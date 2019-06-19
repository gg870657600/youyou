// pages/video/video.js
const app = getApp()
var fileID = []
var videoListStart = 0
var total
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

      
      const vdata = await db.collection('video').skip(videoListStart).limit(10).get()
      vdata.data.forEach(item => {
        fileID.push(item.fileId)
      })
      console.log('fileID:', fileID)
      
      _this.setData({
        videoId: fileID
      })

    }
    videodata()
    
  },

  //长按事件
  bindLongTap(e) {
    const t = e.target.dataset.fileid
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
    // this.onLoad()
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  //需要在app.json中配置window   "enablePullDownRefresh": true
  onPullDownRefresh: function () {
    console.log('xiala')
    this.data.videoId = []
    fileID = []
    videoListStart -= 10
    if (videoListStart >= 0) {
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
    this.data.videoId = []
    fileID = []
    videoListStart += 20
    if (videoListStart < total) {
      this.onLoad()
      wx.showToast({
        icon: 'none',
        title: '下一页...',
        duration: 2000
      })
      //回到顶部
      // wx.pageScrollTo({
      //   scrollTop: 0
      // })
    }

  },
})