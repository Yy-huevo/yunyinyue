// pages/erweima/erweima.js
// import QRCode from '../until/qr-core'
import QRCode from '../until/weapp.qrcode.js'
import request from '../until/request'
import Token from '../until/token'
const appData = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        painting: {},
        shareImage: '',
        erweima: '',
        qrcodeWidth: 200,
        userImage: '', // 用户头像
        bgImage: '/pages/static/images/nvsheng.jpg', // 背景图
        token: '', // 获取二维码用的token
        code: '' // 小程序二维码
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getErweima();
        this.getUserImg();
        const scene = decodeURIComponent(options.scene);
        console.log(scene);
        this.getToken();
        console.log(appData.globalData);
    },
    //index.js


    eventDraw() {
        wx.showLoading({
            title: '绘制分享图片中',
            mask: true
        })
        this.setData({
            painting: {
                width: 375,
                height: 555,
                clear: true,
                views: [
                    {
                        type: 'image',
                        url: this.data.bgImage,
                        top: 0,
                        left: 0,
                        width: 375,
                        height: 555
                    },
                    {
                        type: 'image',
                        url: '/pages/static/heima.jpg',
                        top: 27.5,
                        left: 29,
                        width: 55,
                        height: 55
                    },
                    {
                        type: 'image',
                        url: this.data.userImage,
                        top: 27.5,
                        left: 29,
                        width: 55,
                        height: 55
                    },
                    {
                        type: 'text',
                        content: '您的好友【kuckboy】',
                        fontSize: 16,
                        color: '#402D16',
                        textAlign: 'left',
                        top: 33,
                        left: 96,
                        bolder: true
                    },
                    {
                        type: 'text',
                        content: '发现一件好货，邀请你一起0元免费拿！',
                        fontSize: 15,
                        color: '#563D20',
                        textAlign: 'left',
                        top: 59.5,
                        left: 96
                    },
                    {
                        type: 'image',
                        url: this.data.erweima,
                        top: 136,
                        left: 42.5,
                        width: 290,
                        height: 186
                    },
                    {
                        type: 'image',
                        url: '/pages/static/images/favicon.ico',
                        top: 443,
                        left: 85,
                        width: 68,
                        height: 68
                    },
                    {
                        type: 'text',
                        content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
                        fontSize: 16,
                        lineHeight: 21,
                        color: '#383549',
                        textAlign: 'left',
                        top: 336,
                        left: 44,
                        width: 287,
                        MaxLineNumber: 2,
                        breakWord: true,
                        bolder: true,
                    },
                    {
                        type: 'text',
                        content: '￥0.00',
                        fontSize: 19,
                        color: '#E62004',
                        textAlign: 'left',
                        top: 387,
                        left: 44.5,
                        bolder: true
                    },
                    {
                        type: 'text',
                        content: '原价:￥138.00',
                        fontSize: 13,
                        color: '#7E7E8B',
                        textAlign: 'left',
                        top: 391,
                        left: 110,
                        textDecoration: 'line-through'
                    },
                    {
                        type: 'text',
                        content: '长按识别图中二维码帮我砍个价呗~',
                        fontSize: 14,
                        color: '#383549',
                        textAlign: 'left',
                        top: 460,
                        left: 165.5,
                        lineHeight: 20,
                        MaxLineNumber: 2,
                        breakWord: true,
                        width: 125
                    }
                ]
            }
        })
    },
    // 保存到本地
    eventSave() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.shareImage,
            success(res) {
                wx.showToast({
                    title: '保存图片成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },

    // 生成成功后的回调 把生成的图片存到临时路径
    eventGetImage(event) {
        console.log(event)
        wx.hideLoading()
        const { tempFilePath, errMsg } = event.detail
        if (errMsg === 'canvasdrawer:ok') {
            this.setData({
                shareImage: tempFilePath
            })
        }
    },

    // 获取头像
    getUserImg() {
        let userInfo = wx.getStorageSync('userInfo');
        let info = JSON.parse(userInfo);
        let userImage = info.avatarUrl;
        this.setData({
            userImage
        })
    },


    // 获取本地二维码
    getErweima() {
        new QRCode('canvas', {
            text: 'https://www.bilibili.com',
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.H,
            callback: (res) => {
                this.setData({
                    erweima: res.path
                })
            }
        })
    },
    // 获取token
    async getToken() {
        let token = await request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxcc3dc1b6e4d40acc&secret=b60e7a8988e27913b83fb66cc1e512f6');
        console.log(token);
        this.setData({
            token: token.access_token
        })
        console.log(this.data.token);
        // 获取小程序二维码
        let buffer = await Token('https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + this.data.token, { sence: '000', page: '' });
        console.log(buffer);
        let code = wx.arrayBufferToBase64(buffer);
        this.setData({
            code
        })
    },
    // 授权成功后 保存二维码
    savereal() {
        this.qrcode.exportImage((path) => {
            console.log('path' + path);
            wx.saveImageToPhotosAlbum({
                filePath: path,
                success: (result) => {
                    wx.showToast({
                        title: '保存成功',
                        icon: 'none'
                    })
                },
                fail: (err) => {
                    wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                    })
                },
                complete: () => { }
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
                } else {
                    this.savereal();
                }
            },
        });
    },
    goscan() {
        wx.scanCode({
            success: (result) => {

                wx.showToast({
                    title: result.result,
                    icon: 'none',
                    duration: 3000
                })
            },
            fail: () => { },
            complete: () => { }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let { bgImage } = this.data;
        let shareInfo = { bgImage };
        // wx.navigateTo({
        //     url: "/pages/poster/poster?shareInfo=" + JSON.stringify(shareInfo)
        // });
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(this.data.token);

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
        console.log(111);
        setTimeout((res) => {
            wx.stopPullDownRefresh();
        }, 1000)
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
        return {
            title: '你知道吗，世界上没有垃圾，只有放错了地方的宝藏',
            path: '/pages/index/index',
            imageUrl: this.data.shareImage
        }
    }
})