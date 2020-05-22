// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    srcVideo:'',
    jokeData:[],
    sonPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      wx.setStorageSync('userInfo', e.detail.userInfo)
      console.log(wx.getStorageSync('userInfo'))
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // wx.showLoading({
        //   title: '上传中',
        // })
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        }) 
        const tempFilePaths = res.tempFilePaths
        for (var i = 0; i<tempFilePaths.length ;i++){
          // 上传图片
          const cloudPath = 'image/' + Date.now() + tempFilePaths[i].match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath: tempFilePaths[i],
            success: res => {
              console.log('[上传文件] 成功：', res)
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                mask: true,
                duration: 5000
              }) 
              app.globalData.fileID = res.fileID
              app.globalData.cloudPath = cloudPath
              app.globalData.imagePath = tempFilePaths

              // 跳转页面看上传结果
              // wx.navigateTo({
              //   url: '../storageConsole/storageConsole'
              // })
              //把fileID写进数据库，方便image tab调用
              const db = wx.cloud.database()
              db.collection('image').add({
                data:{
                  fileId: res.fileID,
                  type:"image",
                  createTime: db.serverDate()
                }
              }).then(res =>{
                console.log('add image fileId success')
              }).catch(err =>{
                console.log(err)
              })
              
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        }
        console.log('fileID', app.globalData.fileID)
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  //上传视频
  //上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
  uploadVideo: function () {
    var that = this
    // 选择视频
    wx.chooseVideo({
      compressed: false,
      success: function (res) {
        // wx.showLoading({
        //   title: '上传中',
        // })
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        const tempFilePaths = res.tempFilePath
        console.log('tempFilePaths', res)
        // 上传视频
        const cloudPath = 'video/' + Date.now() + tempFilePaths.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath: tempFilePaths,
          success: res => {
            console.log('[上传文件] 成功：', res)
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              mask: true,
              duration: 5000
            }) 
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = tempFilePaths
            // 跳转页面看上传结果
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
            //把fileID写进数据库，方便video tab调用
            const db = wx.cloud.database()
            db.collection('video').add({
              data: {
                fileId: res.fileID,
                type: "video",
                createTime: db.serverDate()
              }
            }).then(res => {
              console.log('add video fileId success')
            }).catch(err => {
              console.log(err)
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })   
  },
  //跳转到web-view，热门新闻
  webView: function(e){
    var webViewData = e.target.dataset.src
    console.log('webViewData', webViewData)
    wx.navigateTo({
      url: '../webView/webView?webViewSrc='+webViewData
    })
  },
  //跳转到小程序
  navigateToMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'wx519da88d998da681',
      path: '',
      // extraData: {
      //   from: 'bar'
      // },
      // envVersion: 'develop',
      success(res) {
        // 打开其他小程序成功同步触发
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  navigateToMiniProgram2() {
    wx.navigateToMiniProgram({
      appId: 'wxc111e738cfc226b7',
      // path: 'pages/me/me',
      // extraData: {
      //   from: 'bar'
      // },
      // envVersion: 'develop',
      success(res) {
        // 打开其他小程序成功同步触发
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 育儿界面函数
  son() {
    this.setData({sonPage:true})
  },
  hidePageClose() {
    this.setData({ sonPage: false })
  },
  //宝宝树孕育
  navigateToMiniProgram3() {
    wx.navigateToMiniProgram({
      appId: 'wxb7a563d7da8ea2ee',
      // path: 'pages/me/me',
      // extraData: {
      //   from: 'bar'
      // },
      // envVersion: 'develop',
      success(res) {
        // 打开其他小程序成功同步触发
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 小思妈妈营养辅食
  navigateToMiniProgram4() {
    wx.navigateToMiniProgram({
      appId: 'wx9633e6ae01bc6e46',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 宝宝辅食微课堂
  navigateToMiniProgram5() {
    wx.navigateToMiniProgram({
      appId: 'wxb46e48ee0b375615',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 大J育儿说
  navigateToMiniProgram6() {
    wx.navigateToMiniProgram({
      appId: 'wx4178508f9acf2fce',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 年糕妈妈育儿百科
  navigateToMiniProgram7() {
    wx.navigateToMiniProgram({
      appId: 'wx1da266fa6db4c014',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 千千动画屋
  navigateToMiniProgram8() {
    wx.navigateToMiniProgram({
      appId: 'wx637d895095c6a4f3',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 小猪佩琪学画画涂鸦填色
  navigateToMiniProgram9() {
    wx.navigateToMiniProgram({
      appId: 'wx4cd33e9fcc919598',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 宝宝填色涂鸦
  navigateToMiniProgram10() {
    wx.navigateToMiniProgram({
      appId: 'wxb4f9119e22fd8814',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 儿童拼图益智游戏
  navigateToMiniProgram11() {
    wx.navigateToMiniProgram({
      appId: 'wx7460918fead630c5',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 儿童休闲益智娱乐学习
  navigateToMiniProgram12() {
    wx.navigateToMiniProgram({
      appId: 'wxce9c350a5343f289',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 幼儿英语启蒙课堂
  navigateToMiniProgram13() {
    wx.navigateToMiniProgram({
      appId: 'wx937882b9a577922c',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 幼儿英语早教认知闪卡
  navigateToMiniProgram14() {
    wx.navigateToMiniProgram({
      appId: 'wx3e39f943266c2f03',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 糖果绘本阅读
  navigateToMiniProgram15() {
    wx.navigateToMiniProgram({
      appId: 'wx782c34974a1f6751',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 在线读绘本
  navigateToMiniProgram16() {
    wx.navigateToMiniProgram({
      appId: 'wx06d8b05090555405',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
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