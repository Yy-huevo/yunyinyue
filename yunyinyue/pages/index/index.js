import request from '../until/request'
import config from '../until/config'
// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [], // 轮播图数据
        recommendList: [],  // 推荐歌单数据
        topList: []  // 热歌榜数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        console.log('onload');
        this.getIndexInfo();

    },


    // 获取主页数据
    async getIndexInfo() {
        let bannerListData = await request(config.host + '/banner/', { type: 2 });
        this.setData({
            // 把拿到的数据更新
            bannerList: bannerListData.banners
        })

        // 获取推荐歌单数据
        let recommendListData = await request(config.host + '/personalized', { limit: 10 });
        this.setData({
            recommendList: recommendListData.result
        })

        // 获取热歌榜数据
        let index = 0;
        let resultArr = [];
        // 一共发五次请求
        while (index < 5) {
            let topListData = await request(config.host + '/top/list', { idx: index++ });
            let topListItem = { name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 3) };
            resultArr.push(topListItem);

            // 请求一次渲染一次
            this.setData({
                topList: resultArr
            })
        }
    },

    // 如果登录 跳转至推荐歌曲界面 否则跳转至登录界面
    toRecommend() {
        let userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            wx.navigateTo({
                url: '/songPackage/pages/recommend/recommend'
            });
        } else {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                success: (result) => {
                    wx.reLaunch({
                        url: '/pages/login/login',
                    });
                }
            });
        }
    },

    getDataList() {
        console.log(this.data);
    },

    // 跳转至other页面
    toOther() {
        wx.navigateTo({
            url: '/pages/erweima/erweima'
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('onready');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('onshow');
        let pages = getCurrentPages();
        console.log(pages);
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
        wx.showLoading({
            title: '正在加载中',
            mask: true,
            success: (result) => {
                this.getIndexInfo();
                wx.stopPullDownRefresh();
                wx.hideLoading();
                console.log(111);
            },

            fail: () => { },
            complete: () => { }
        });
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