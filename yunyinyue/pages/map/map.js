// pages/map/map.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scale: 17,
        latitude: 0,
        longitude: 0,
        markers: [],
        src: '',
        video: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.cameraCtx = wx.createCameraContext();
        this.mapCtx = wx.createMapContext('myMap', this);
        console.log('onload');
        wx.getLocation({
            success: (res) => {
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,    
                })
            }
        })

        this.openLocationUpdate();
    },


    // 打开当前位置
    getCenterLocation() {
        wx.openLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale: 18,
            name: '',
            address: '',
            success: (result)=>{
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    // 打开地图选择位置
    chooseLocation() {
        wx.chooseLocation({
            success: (res) => {
                this.setData({
                    longituded: res.longitude,
                    latitude: res.latitude
                })
            }
        })
    },

   // 开启实时定位
   openLocationUpdate() {
    wx.startLocationUpdate({
        success: (res) => {
            console.log("开启实时定位", res);
        },
        fail: (err) => {
            console.log('开启定位失败', err);
            
        }
    })
    var a = setInterval(this.getLocationUpdate, 3000);
    },

    // 实时定位
    getLocationUpdate() {
        wx.onLocationChange( (res) => {
            console.log(res);
            this.setData({
                latitude: res.latitude,
                longitude: res.longitude
            })
        })
    },

   















    // 拍摄照片
    takePhoto() {
        this.cameraCtx.takePhoto({
            quality: 'hign',
            success: (res) => {
                console.log(res);
                this.setData({
                    src: res.tempImagePath
                })
            }
        })
    },

    // 拍摄视频
    takeVideo() {
        this.cameraCtx.startRecord({
            success: (res) => {
                console.log('startRecord');
            }
        })
    },

    // 结束拍摄
    stopRecord() {
        this.cameraCtx.stopRecord({
            success: (res) => {
                this.setData({
                    src: res.tempThumbPath,
                    video: res.tempVideoPath
                })
            }
        })
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
        clearInterval(a);
        wx.stopLocationUpdate({
            success: (res) => {
                console.log('关闭定位');
            }
        })
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