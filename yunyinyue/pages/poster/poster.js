// pages/poster/poster.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        erweima: '',   // 二维码
        userImg: '',    // 用户头像
        bgImg: '' // 背景
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 拿到穿过来的数据
       let erweima = wx.getStorageSync('erweima');
       let userInfo = wx.getStorageSync('userInfo');
       let userImg = JSON.parse(userInfo).avatarUrl;
       let bgImg = JSON.parse(options.shareInfo);
       this.setData({
           erweima,
           userImg,
           bgImg: bgImg.bgImage
       })
        


       // 获取屏幕大小信息
        wx.getSystemInfo({
           success: (result)=>{
               this.width = 336 * result.pixelRatio;
               this.height = 287 * result.pixelRatio;
           },
           fail: ()=>{},
           complete: ()=>{}
       });
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