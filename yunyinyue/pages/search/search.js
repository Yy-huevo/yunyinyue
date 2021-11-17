// pages/search/search.js
import request from '../until/request'
import config from '../until/config'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent: '', // 搜索框默认值
        hotList: [], // 热搜榜数据
        searchContent: '', // 用户输入的表单项数据
        searchList: [], // 关键字模糊匹配的数据
        historyList: [], // 搜素历史记录
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getInitDatas();
        
    },

    // 获取初始化数据
    async getInitDatas() {
        let placeholderData = await request(config.host + '/search/default');
        let hotListData = await request(config.host + '/search/hot/detail');

        let index = 0;
        let hotList = hotListData.data.map(item => {
            item.id = index++;
            return item;
        });

        this.setData({
            placeholderContent: placeholderData.data.showKeyword,
            hotList
        })
    },

    // 表单项内容改变的处理方法 
    inputChange(event) {
        // 更新searchContent数据
        this.setData({
            searchContent: event.detail.value.trim()
        })

        this.getsearchList();
        // 这里应该加防抖 
    },

    // 获取关键字模糊匹配数据 

    /**
     * 
     * 应用生命周期
     * onLaunch onShow onHide onError
     * 
     * 页面生命周期
     * data  onLoad onReady onShow onHide onUnload onPullDownRefresh onReachBottom onShareAppMessage onPageScorll onResize onTaItemTap
     * 
     * for ..in 遍历对象 可遍历原型及手动添加的键名  i为字符串 所以不建议遍历数组 
     * for ..of 遍历数组 不建议对象
     * for 循环不建议遍历对象  
     * forEach 只支持数组 
     * 
     * 
     */
    async getsearchList() {
        if (!this.data.searchContent) {
            this.setData({
                searchList: []
            })
            return;
        }
        let searchListData = await request(config.host + '/search', { keywords: this.data.searchContent, limit: 10 });
        this.setData({
            searchList: searchListData.result.songs
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