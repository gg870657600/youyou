//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        
      })
    }
    var back
    function bindback() {
      back = wx.getBackgroundAudioManager();
      back.src = "http://mp3.9ku.com/m4a/509299.m4a";
      back.title = "天空之城";
      back.play();
      back.onPlay(() => {
        console.log("音乐播放开始");
      })
      back.onEnded(() => {
        console.log("音乐播放结束");
      })
    }
    bindback()
    this.globalData = {
      bindback:bindback
    }

  }
})
