//index.js
const app = getApp()
var msgList = []   //存放每次取的msg数据
Page({
  data: {
    inputValue: "",
    msg: [],
    headImg: "",
    scrollTop: -1
  },

  onLoad: function () {
    var _this = this
    _this.setData({
      headImg: wx.getStorageSync('userInfo').avatarUrl
    })
    console.log("99999",_this.data.headImg)
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
       
    async function msglist() {
      const db = wx.cloud.database()
      //获取msg数据总条数      
      const rescount = await db.collection('msg').count()      
      const total = rescount.total
      //分几次取
      const count = Math.ceil(total / 20)
      console.log('count:', rescount)

      for (let i = 1; i < count + 1; i++) {
        const msgdata =await db.collection('msg').skip(i * 20 - 20).limit(20).get()    
        msgdata.data.forEach(item => {
            msgList.push(item)
          })
        console.log('msgList:', msgList)
      }
      _this.setData({
        msg: msgList,
        //是每次打开页面停留在最底部，给scroll-view设置scroll-top属性，绑定一个变量：每次添加一个msg后数一下当前一共多少个msg，然后每个msg算它高度是1000（只要大于msg的高度都行）
        scrollTop: msgList.length * 1000
      })
      msgList =[]
    }
    msglist()
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.data.msg = []
    // var _this = this
    // _this.onLoad()

  },
  updateValue: function (e) {
    var _this = this
    _this.setData({
      inputValue: e.detail.value
    })
  },
  addMsg: function () {
    var _this = this
    console.log("value:", _this.data.inputValue, "owner", app.globalData.userInfo)
    if (!_this.data.inputValue){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }
    var db = wx.cloud.database()
    //获取本地缓存的用户信息
    var username = wx.getStorageSync("userInfo").nickName
    var headimg = wx.getStorageSync('userInfo').avatarUrl
    //获取时间,调用通用函数
    var util = require('../utils/utils.js')
    var time = util.formatTime(new Date())
    console.log('time', time)
    db.collection('msg').add({
      data: {
        message: _this.data.inputValue,
        owner: username,
        headimg: headimg,
        time: time
      }
    }).then(res => {
      console.log('send success')
      wx.showToast({
        title: '正在发表...',
        icon: 'loading',
        mask: true,
        duration: 1000
      }) 
      _this.setData({
        inputValue: "",
        msg: []
      })
      _this.onLoad()
    }).catch(err => {
      console.log('send fail', err)
    })
    
    // 使页面滚动到底部
    wx.pageScrollTo({
      scrollTop: 800
    })
 
  },
  
})
