let startY = 0;  // 手指起始的位置
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
import request from '../until/request'
import config from '../until/config'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 移动距离初始化
        coverTransform: 'translateY(0)',
        // 过渡初始化
        coverTransition: '',
        userInfo: {},   // 用户信息
        recentPlayList: [] // 用户播放记录
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 读取用户的基本信息
        let userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({
                userInfo: JSON.parse(userInfo)
            })
            // 获取用户播放记录
            this.getUserRecentPlayList(this.data.userInfo.userId)
        }
    },

    // 获取用户播放记录的功能函数
    async getUserRecentPlayList(userId) {
        let recentPlayListData = await request(config.host + '/user/record', {uid: userId, type: 0});
        let index = 0;
        let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item =>{
            item.count = index++;
            return item;
        })
        this.setData({
           recentPlayList
        })
    },

    handleTouchStart(event) {
        // 滑动时清除过度效果
        this.setData({
            coverTransition: 'transform 0.15s linear'
        })
        // 获取开始的坐标
        startY = event.touches[0].clientY;
    },
    handleTouchMove(event) {
        // 获取移动的坐标
        moveY = event.touches[0].clientY;
        // 获取移动的距离
        moveDistance = moveY - startY;
        // 如果是负数 说明再向上滑动 不允许滑动
        if (moveDistance <= 0) {
            return;
        }
        // 如果大于80就不允许继续滑动
        if (moveDistance >= 80) {
            moveDistance = 80;
        }
        // 更新移动的距离
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`
        })
    },
    handleTouchEnd() {
        // 在手指离开时回归原位置 并且添加过渡
        this.setData({
            coverTransform: `translateY(0rpx)`,
            coverTransition: 'transform 0.4s linear'
        })
    },
    // 跳转登录界面
    toLogin() {
        // 如果用户已登录 则不跳转 否则跳转
        let userInfo = wx.getStorageSync('userInfo');
        if (!userInfo){
        wx.navigateTo({
            url: '/pages/login/login',
            success: (result)=>{
                
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    }else {
        return;
    }
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