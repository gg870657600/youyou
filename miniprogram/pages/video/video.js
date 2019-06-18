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