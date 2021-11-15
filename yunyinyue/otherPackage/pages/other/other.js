// pages/other/other.js
import request from '../../../pages/until/request'
import config from '../../../pages/until/config'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        person: {
            username: 'qiao',
            password: 123456,
            age: 18
        },
        now: '',
        contents: [
            {
                id: 1,
                name: 'qiao'
            },
            {
                id: 2,
                name: 'ji'
            }
        ],
        latitude: 0,
        longitude: 0,
        markers: [{
            id: 1,
            latitude: 0,
            longitude: 0,
            name: '腾讯'
        }],
    },

    // 获取用户唯一标识openId
    getOpenId() {
        // 获取登录凭证 并发送给服务器
        wx.login({
            success: async (res) => {
                console.log(res);
                let code = res.code;
                // 发送给服务器
                let result = await request(config.host + '/getOpenId', { code });
                console.log(result);

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.mapCtx = wx.createMapContext('myMap',this);
         // 获取当前位置
         wx.getLocation({
             type: 'wgs84',
             altitude: false,
             success: (result)=>{
                 // 更新对象里的数据
                let t4 = "markers["+0+"].latitude";
                let t5 = "markers["+0+"].longitude";
                 this.setData({
                     latitude: result.latitude,
                     longitude: result.longitude,
                     [t4]: result.latitude,
                     [t5]: result.longitude
                 })
             },
             fail: ()=>{},
             complete: ()=>{}
         });
        
    },

    getNow() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.fastmock.site/mock/a6c2fd447e1d8919c2b21a3d63be7e0b/test/api/user');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.response);
                }
            }
        }

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        
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