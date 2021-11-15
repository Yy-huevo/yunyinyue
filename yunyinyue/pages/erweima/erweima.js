// pages/erweima/erweima.js
import QRCode from '../until/qr-core'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrcodeWidth: 200
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.qrcode = new QRCode('canvas', {
            text: 'https://www.baidu.com',
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.Q,
        })
    },

    // 授权成功后 保存二维码
    savereal() {
        this.qrcode.exportImage((path) =>{
            console.log('path' + path);
            wx.saveImageToPhotosAlbum({
                filePath: path,
                success: (result)=>{
                    wx.showToast({
                        title: '保存成功',
                        icon: 'none'
                    })
                },
                fail: (err)=>{
                    wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                    })
                },
                complete: ()=>{}
            });
        })
    },

    // 长按保存
    save() {
        console.log('save');
        wx.showActionSheet({
            itemList: ['保存图片'],
            itemColor: '#000000',
            success: (result) => {
                console.log(result.tapIndex);
                if (result.tapIndex === 0) {
                    this.getAlbumScope();
                }
            },
            fail: () => { },
            complete: () => { }
        });
    },

    // 获取访问相册授权
    getAlbumScope() {
        wx.getSetting({
            success: (result) => {
                if (!result.authSetting['scope.writePhotoAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotoAlbum',
                        success: (result) => {
                            this.savereal();
                            console.log('用户已同意授权');
                        },
                        fail: (err) => {
                            wx.showModal({
                                title: '提示',
                                content: '需要访问您的相册',
                                showCancel: false,
                                success: (result) => {
                                    if (result.confirm) {
                                        wx.openSetting({
                                            success: (result) => {
                                                if (result.authSetting['scope.writePhotoAlbum'] === true) {
                                                    this.savereal();
                                                } 
                                            },

                                        });
                                    }
                                },
                            });
                        },
                    });
                }else {
                    this.savereal();
                }
            },
        });
    },

    goscan() {
        wx.scanCode({
           
            success: (result)=>{
                console.log(res);
                wx.showToast({
                    title: result.result,
                    icon: 'none',
                    duration: 3000
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        });
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