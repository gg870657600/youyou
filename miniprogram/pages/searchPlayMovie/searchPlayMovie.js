// pages/searchPlayMovie/searchPlayMovie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    language:"",
    genre: "",
    performer: "",
    year: "",
    region: "",
    num: "",
    director:"",
    imgUrl: "",
    urlList:[],
    m3u8url: "",
    onlineurl: "",
    m3u8:true
  },
  updateUrl:function(e){
    console.log('updateUrl',e.target.dataset.url);
    this.setData({
      m3u8url: e.target.dataset.url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let searchMoviesObj = JSON.parse(options.searchMoviesObj);
    // 接口有些m3u8url、onlineurl数据搞反了，这里判断一下
    if (searchMoviesObj.list[0].m3u8url.indexOf(".m3u8") >= 0) {
      console.log('包含此字符串');
      this.setData({
        name: searchMoviesObj.data.name,
        director: searchMoviesObj.data.director,
        language: searchMoviesObj.data.Language,
        genre: searchMoviesObj.data.genre,
        performer: searchMoviesObj.data.performer,
        year: searchMoviesObj.data.Release,
        region: searchMoviesObj.data.region,
        // num: searchMoviesObj.list[0].num,
        imgUrl: searchMoviesObj.data.cover,
        m3u8url: searchMoviesObj.list[0].m3u8url,
        urlList: searchMoviesObj.list,
        onlineurl: searchMoviesObj.list[0].onlineurl,
      })      
    }else{
      // this.setData({m3u8 : false})
      this.setData({
        m3u8: false,
        name: searchMoviesObj.data.name,
        director: searchMoviesObj.data.director,
        language: searchMoviesObj.data.Language,
        genre: searchMoviesObj.data.genre,
        performer: searchMoviesObj.data.performer,
        year: searchMoviesObj.data.Release,
        region: searchMoviesObj.data.region,
        // num: searchMoviesObj.list[0].num,
        imgUrl: searchMoviesObj.data.cover,
        onlineurl: searchMoviesObj.list[0].m3u8url,
        urlList: searchMoviesObj.list,
        m3u8url: searchMoviesObj.list[0].onlineurl,
      })
    }  
    //有些资源还有下载地址，这里我还未做下载功能
    console.log("searchMoviesObj", options.searchMoviesObj)
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