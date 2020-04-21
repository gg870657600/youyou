// pages/images/images.js
var fileID = []
var imgListStart = 0     //返回的img fileId列表，从索引0开始取数据
var total     //返回的img fileId列表元素总数
var limitNum = 10    //从数据库取多少个元素
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageId:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this
    const db = wx.cloud.database();
    
    async function imgdata() { 
      const db = wx.cloud.database()
      //获取image数据总条数      
      const rescount = await db.collection('image').count()
      total = rescount.total

      console.log('count:', rescount)

      //把取的的数据倒序排列，push到fileID集合
      const imagedata = await db.collection('image').orderBy('createTime', 'desc').skip(imgListStart).limit(limitNum).get()      
      imagedata.data.forEach(item => {
        fileID.push(item.fileId)
      })
      console.log('fileID:', fileID)

      _this.setData({
        imageId: fileID
      })

    }
    imgdata()
    fileID = [];
    // console.log('imageId:',_this.data.imageId)
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
    var _this = this
    const db = wx.cloud.database()
    //获取image数据总条数      
    const rescount = db.collection('image').count()
    if (total != rescount.total){
      _this.onLoad();
    }
    
  },

  // 点击图片预览
  imgClick:(event) =>{
    const src = event.currentTarget.dataset.src //获取data-src，点击图片的fileId
    const imgList = event.currentTarget.dataset.list //获取data-list,要预览的图片的fileId集合
    console.log('src:', imgList)

    //图片预览接口
    wx.previewImage({
      current: src, // 当前显示图片的http链接或fileId
      urls: imgList // 需要预览的图片http链接或fileId列表
    })
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
    console.log('xiala')
    if (imgListStart - limitNum >= 0) {
      imgListStart -= limitNum
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
    if (imgListStart + limitNum < total){
      imgListStart += limitNum
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
    wx.showToast({
      icon: 'none',
      title: '没有啦...',
      duration: 2000
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})