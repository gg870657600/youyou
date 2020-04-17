//index.js
const app = getApp()

Page({
  data: {
    inputValue: "",
    msg: [],
    headImg: "",
    scrollTop: -1,
    srcUrl: "../../images/music1.png",    //音乐播放图标地址
    imgchoose: "music1",     //通过改变类名，控制播放图标的样式
    scrollViewHeight:0
  },

  onLoad: function () {
    var _this = this;
    var msgList = []   //存放每次取的msg数据
    _this.setData({
      headImg: wx.getStorageSync('userInfo').avatarUrl
    })
    // scoll_view必须设置高度，这里通过函数获取动态高度，手机界面高度-头部元素高度-底部元素高度
    //先取出页面高度 windowHeight
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    // 获取节点高度，根据文档，先创建一个SelectorQuery对象实例
    let query = wx.createSelectorQuery();
    query.select('.title').boundingClientRect()
    query.select('.inputContent').boundingClientRect()
    query.exec((res) => {
      let titleHeight = res[0].height                                          // 获取节点高度
      let inputContentHeight = res[1].height
      // 然后就是做个减法
      let scrollViewHeight = windowHeight - titleHeight - inputContentHeight;
      console.log('Height:' + windowHeight + ';' + titleHeight + ';' + inputContentHeight);
      // 算出来之后存到data对象里面
      this.setData({
        scrollViewHeight: scrollViewHeight
      });      
    })

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
      }
      console.log('msgList:', msgList)
      _this.setData({
        msg: msgList,
        //是每次打开页面停留在最底部，给scroll-view设置scroll-top属性，绑定一个变量：每次添加一个msg后数一下当前一共多少个msg，然后每个msg算它高度是1000（只要大于msg的高度都行）
        scrollTop: msgList.length * 1000
      })
      console.log('scrollTop:', _this.data.scrollTop)
      msgList =[]
    }
    msglist()
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.msg = []
    var _this = this
    _this.onLoad()

  },
  updateValue: function (e) {
    var _this = this
    _this.setData({
      inputValue: e.detail.value
    })
  },
  //背景音乐播放、暂停
  backMusic(){
    var _this = this
    if (_this.data.srcUrl == "../../images/music1.png"){  
      wx.stopBackgroundAudio({
        success: res => {
          _this.setData({
            srcUrl: "../../images/music2.png",
            imgchoose: "music2"
          })
        }
      })
    }else{      
      app.globalData.bindback()
      _this.setData({
        srcUrl: "../../images/music1.png",
        imgchoose: "music1"
      })
    }    
  },
  //添加信息
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
      scrollTop: 600
    })
 
  },
  
})
