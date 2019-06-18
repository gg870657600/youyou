// pages/images/images.js
var fileID = []
var imgListStart = 0     //返回的img fileId列表，从索引0开始取数据
var total     //返回的img fileId列表元素总数
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


      const imagedata = await db.collection('image').skip(imgListStart).limit(20).get()
      imagedata.data.forEach(item => {
        fileID.push(item.fileId)
      })
      console.log('fileID:', fileID)

      _this.setData({
        imageId: fileID
      })

    }
    imgdata()
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
    // this.onLoad()
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
    this.data.imageId = []
    fileID = []
    imgListStart -= 20
    if (imgListStart >= 0) {
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
    this.setData({
      imageId :[]
    })
    fileID = []
    imgListStart +=20
    if (imgListStart < total){
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})