// pages/recomend/recommend.js
import PubSub from 'pubsub-js';
import request from '../../../pages/until/request'
import config from '../../../pages/until/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',  // 天
    month: '',  // 月份
    recommendList: [], // 推荐列表数据
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload');
    // 更新日期
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })

    // 若登录 则获取每日推荐歌曲
    this.getRecommendList();

    // 订阅来自songdetail页面发布的消息   一定是先订阅再发布  订阅方是接受数据 发布方是传数据
    PubSub.subscribe('switchType', (msg, type) => {
      let {recommendList, count} = this.data;
      if (type === 'pre') { // 上一首
        (count === 0) && (count = recommendList.length);
        count -= 1;
      } else {  // 下一首
        (count === recommendList.length - 1) && (count = -1);
        count +=1;
      }

      this.setData({
          count
      })
      let musicId = recommendList[count].id;
      console.log(musicId);
      // 将musicId回传给songdetail页面
      PubSub.publish('musicId', musicId);
    });

  },

  // 获取用户每日推荐数据
  async getRecommendList() {
    let recommendListData = await request(config.host + '/recommend/songs');
    this.setData({
      recommendList: recommendListData.recommend
    })
  },

  // 跳转至播放页面
  toSongDetail(event) {
    // 跳转页面的时候把数据也传过去
    let { song, index } = event.currentTarget.dataset;
    this.setData({
      index
    })
    wx.navigateTo({
      url: '/songPackage/pages/songDetail/songDetail?musicId=' + song.id,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready');
    wx.setNavigationBarTitle({
      title: '每日推荐',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onunload');
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