import request from '../until/request'
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
    onLoad: async function (options) {
        let bannerListData = await request('http://192.168.11.51:3000/banner/', { type: 2 });
        this.setData({
            // 把拿到的数据更新
            bannerList: bannerListData.banners
        })

        // 获取推荐歌单数据
        let recommendListData = await request('http://192.168.11.51:3000/personalized', { limit: 10 });
        this.setData({
            recommendList: recommendListData.result
        })

        // 获取热歌榜数据
        let index = 0;
        let resultArr = [];
        // 一共发五次请求
        while (index < 5) {
            let topListData = await request('http://192.168.11.51:3000/top/list', { idx: index++});
            let topListItem = {name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0,3)};
            resultArr.push(topListItem);

        // 请求一次渲染一次
            this.setData({
                topList: resultArr
            })
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