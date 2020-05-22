// pages/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */

  // indicator-dots：控制底下显示的圆点。
  // autoplay：控制自动播放。
  // interval：如果开启自动播放，控制切换时间间隔。
  // duration：滑动动画时长。
  data: {
    hidden: false,
    // 链接来自路过图床
    imgList: [
      'https://s1.ax1x.com/2020/04/29/JTnkNj.jpg',
      'https://s1.ax1x.com/2020/04/29/JTKkpn.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlWND.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlRAO.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlgHK.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlcB6.jpg',
      'https://s1.ax1x.com/2020/04/29/JTl6nx.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlsj1.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlrcR.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlD39.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlB9J.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlwh4.jpg',
      'https://s1.ax1x.com/2020/04/29/JTldNF.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlaAU.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlN7T.jpg',
      'https://s1.ax1x.com/2020/04/29/JTltBV.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlYn0.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlGXq.jpg',
      'https://s1.ax1x.com/2020/04/29/JTl8cn.jpg',
      'https://s1.ax1x.com/2020/04/29/JTl31s.jpg',
      'https://s1.ax1x.com/2020/04/29/JTl1pj.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlQhQ.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlMtg.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlKAS.jpg',
      'https://s1.ax1x.com/2020/04/29/JTln78.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlm0f.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlenP.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlVXt.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlE6I.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlA1A.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlkpd.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlifH.jpg',
      'https://s1.ax1x.com/2020/04/29/JTlPte.jpg',
      'https://s1.ax1x.com/2020/04/29/JTKkpn.jpg',
    ],
    autoplay: false,
    indicatordots: false,
    duration: 1500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hidden: true,
    })
  },
  onSlideChange: function (event) {
    var postId = event.detail.current;
    console.log(postId);
  },
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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})