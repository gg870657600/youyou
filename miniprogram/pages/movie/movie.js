// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData:[
      { name: "复仇者联盟4", src:"https://56.com-t-56.com/20190426/15648_12fefab2/index.m3u8"},
      { name: "死侍2", src: "https://letv.com-v-letv.com/20180810/7187_944c4727/index.m3u8"},
      { name: "月球", src: "http://yi.jingdianzuida.com/20191125/bCZ922ZT/index.m3u8" },
      { name: "毒液：致命守护者", src: "https://pptv.com-h-pptv.com/20190109/12495_b5a70ead/index.m3u8" },
      { name: "蝙蝠侠：黑暗骑士", src: "https://youku.cdn6-okzy.com/20200125/10126_3eaabc43/index.m3u8" },
      { name: "釜山行", src: "https://zk2.603ee.com/2020/01/10/4hCBNvSgwX87mAHV/playlist.m3u8" },
      { name: "十二只猴子", src: "https://www.mmicloud.com:65/20190325/bnFKEFwq/index.m3u8" },
      { name: "源代码", src: "https://www.mmicloud.com:65/20190619/Fubw1O8A/index.m3u8" },
      { name: "星际穿越", src: "https://www.mmicloud.com:65/20190615/Wz8BFBwM/index.m3u8" },
      { name: "无姓之人", src: "https://www.mycqzx.com:65/20190905/LoGzNZHT/index.m3u8" },
      { name: "超时空接触", src: "https://www.mmicloud.com:65/20190310/M3qUn3jr/index.m3u8" },
      { name: "头号玩家", src: "https://www.mmicloud.com:65/20190630/zOTFTAyy/index.m3u8" },
      { name: "致命魔术", src: "https://www.mmicloud.com:65/20190404/Eoxt9tiu/index.m3u8" },
      { name: "发条橙", src: "https://youku.com-t-youku.com/20190501/16316_078d07de/index.m3u8" },
      { name: "感官游戏", src: "https://www.mmicloud.com:65/20190418/vnWQqvHz/index.m3u8" },
      { name: "机械姬", src: "http://yushou.qitu-zuida.com/20180221/NY8JmUlV/index.m3u8" },
      { name: "火星救援", src: "https://www.mmicloud.com:65/20190407/EkcdDD1H/index.m3u8" },
      { name: "这个男人来自地球", src: "http://yi.jingdianzuida.com/20191122/e2XX5E0L/index.m3u8" },
      { name: "少数派报告", src: "https://www.mmicloud.com:65/20190401/g8i5IXyi/index.m3u8" },            
      { name: "机械公敌", src: "https://www.gentaji.com:65/20200218/yUdFfsE1/index.m3u8" },
      { name: "彗星来的那一夜", src: "http://yiyi.55zuiday.com/20171208/HF10h5lP/index.m3u8" },
      { name: "2001太空漫游", src: "http://hong.tianzhen-zuida.com/20191019/11322_ad911146/index.m3u8" },
      { name: "盗梦空间", src: "https://www.mmicloud.com:65/20190523/7gz6dcjB/index.m3u8" },
      { name: "银翼杀手2049", src: "https://www.mmicloud.com:65/20190418/lbxSjzBB/index.m3u8" },
      { name: "机器人总动员", src: "https://www.mmicloud.com:65/20190323/VhUBvTXM/index.m3u8" },
      //喜剧
      { name: "美丽人生", src: "http://bili.meijuzuida.com/20191230/22139_e860b133/index.m3u8"},
      { name: "疯狂动物城", src: "http://leshi.cdn-zuyida.com/20171102/tSKThWZI/index.m3u8"}, 
      { name: "寻梦环游记", src: "https://www.mycqzx.com:65/20190803/2d2gh7xz/index.m3u8" },
      { name: "绿皮书", src: "http://feifei.feifeizuida.com/20190220/5569_d8e2612b/index.m3u8" },    
      { name: "小姐好白", src: "https://www.mmicloud.com:65/20190401/xZYGdV3d/index.m3u8" },
      //
      { name: "何以为家", src: "http://feifei.feifeizuida.com/20190421/9424_8f041bb6/index.m3u8" },
    ],
    src:"",
    // 自定义自己喜欢的颜色
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B",
      "#FFB90F", "#FF6EB4", "#F08080", "#EEA9B8", "#D15FEE","#CDBE70",
      "#CAFF70", "#BCD2EE", "#8B8B00", "#8B795E", "#8B3A3A","#616161",
      "#00EE76", "#000080", "#996666", "#009999", "#FF66CC","#663333",
      "#FA8072", "#EEB422", "#EE6363", "#CAFF70", "#DC143C","#FF0000"],
    // 存储随机颜色
    randomColorArr: [],
    index: null,      //按钮显示旋转图标，表示正在播放
    sonPage: false,
    movieDesc:{}
  },
  //把src传递给vedio组件
  srcFun: function (e) {
    var _this = this;
    var srcData = e.target.dataset.src
    var nameData = e.target.dataset.name
    console.log('srcData:', srcData);
    console.log('currentTarget:', e.target.dataset)
    //把影片name传给云函数获取影片简介
    wx.cloud.callFunction({
      name: "movieHttp",
      data: {
        name: nameData,
      },
      success: res => {
        let d = JSON.parse(res.result)
        console.log(d.result)
        _this.setData({ 
          movieDesc: d.result,
          sonPage: true
          });
        // console.log("movieDesc:", _this.data.movieDesc.result.title)
        _this.data.movieDesc = {}
      },
      fail: err => {
        console.error('[云函数db] 调用失败', err)
      }
    })
    _this.setData({ 
      src: srcData,
      index: e.target.dataset.key,
      
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
      movieDataLen = that.data.movieData.length,
      colorArr = that.data.colorArr,
      colorLen = colorArr.length,
      randomColorArr = [];
    //判断执行
    do {
      let random = colorArr[Math.floor(Math.random() * colorLen)];
      randomColorArr.push(random);
      movieDataLen--;
    } while (movieDataLen > 0)

    that.setData({
      randomColorArr: randomColorArr
    });
  },
  hidePageClose() {
    this.setData({ sonPage: false })
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