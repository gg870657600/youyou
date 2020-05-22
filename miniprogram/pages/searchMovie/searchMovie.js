// pages/selectMovie/selectMovie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    searchMoviesList:[],
    // searchMoviesObj:{},
    show:false
  },
  updateValue: function (e) {
    var _this = this
    _this.setData({
      inputValue: e.detail.value
    })
  },
  searchMovies: function () {
    var _this = this
    //搜索关键词传给云函数，得到搜索列表数据
    wx.cloud.callFunction({
      name: "selectMovies",
      data: {
        key: _this.data.inputValue,
      },
      success: res => {
        let result = JSON.parse(res.result);
        _this.setData({
          searchMoviesList: result.list
        })
        console.log("searchMoviesList:", _this.data.searchMoviesList);
      },
      fail: err => {
        console.error('[云函数db] 调用失败', err)
      }
    })
  },
  searchMovies2: function (e) {
    var _this = this
    var url = e.currentTarget.dataset.url;
    console.log("url:", url);
    //点击searchMoviesList中的button，把url传给云函数，得到搜索详情数据
    wx.cloud.callFunction({
      name: "selectMovies2",
      data: {
        url: url,
      },
      success: res => {        
        console.log("res:", res);
        //跳转到播放页面
        wx.navigateTo({
          url: "/pages/searchPlayMovie/searchPlayMovie?searchMoviesObj=" + res.result,
        })
      },
      fail: err => {
        console.error('[云函数db] 调用失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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