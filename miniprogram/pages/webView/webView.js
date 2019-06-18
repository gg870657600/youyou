// pages/webView/webView.js
var pagestart = 0
var pageend = 40
var newsListLength
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsData:[],
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this    
    _this.setData({
      src: options.webViewSrc
    })
    console.log('src:', _this.data.src)    
  },

  //点击进入web-view
  // webViewClick:function(){
  //   this.setData({
  //     webView:true
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  //需要在app.json中配置window   "enablePullDownRefresh": true
  onPullDownRefresh: function () {
    // console.log('xiala')
    // this.data.newsData = []
    // pagestart -= 40
    // pageend -= 40
    // if (pagestart >= 0) {
    //   this.onLoad()
    //   wx.showToast({
    //     icon: 'none',
    //     title: '上一页...',
    //     duration: 2000
    //   })
    // }
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.data.newsData =[]
    // pagestart +=40
    // pageend +=40
    // if (pagestart <= newsListLength){
    //   this.onLoad()
    //   wx.showToast({
    //     icon: 'none',
    //     title: '下一页...',
    //     duration: 2000
    //   })
    //   //回到顶部
    //   wx.pageScrollTo({
    //     scrollTop: 0
    //   })
    // }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})