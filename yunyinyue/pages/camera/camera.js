// pages/camera/camera.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        photo: '',
        video: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onload');
        this.cameraCtx = wx.createCameraContext();
    },

    // 拍照
    takePic() {
        this.cameraCtx.takePhoto({
            quality: "normal",
            success: (result)=>{
                console.log(result);
                this.setData({
                    photo: result.tempImagePath,
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    // 录制视频
    startRecord() {
        this.cameraCtx.startRecord({
            success: (res) => {
                wx.showToast({
                    title: '已开始录制'
                })
                
            }
        })
    },

    // 结束录制
    stopRecord() {
        this.cameraCtx.stopRecord({
            success: (res) => {
                this.setData({
                    photo: res.tempThumbPath,
                    video: res.tempVideoPath
                }),
                wx.showToast({
                    title: '录制已结束'
                })
            }
        })
    },

    // 保存到本地
    save() {
            wx.saveImageToPhotosAlbum({
                filePath: this.data.photo,
                success: (result)=>{
                    wx.showToast({
                        title: '保存成功',
                        icon: 'none',
                        
                    });
                },
                fail: ()=>{},
                complete: ()=>{}
            });
        
    },

    // 保存视频
    saveVideo() {
        wx.saveVideoToPhotosAlbum({
            filePath: this.data.video,
            success: (result)=>{
                wx.showToast({
                    title: '保存成功',
                    icon: 'none',
                    
                });
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    // 从相册上传
    submitPhoto() {
        wx.chooseImage({
            count: 9,
            success: (res) => {
                
                wx.uploadFile({
                    url: 'http://192.168.11.51:3000',
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    formData: {},
                    success: (result)=>{
                        wx.showToast({
                            title: '上传成功',
                        })
                    },
                    fail: (res)=>{
                        wx.showToast({
                            title: '上传失败',
                        })
                    },
                    complete: ()=>{}
                });
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