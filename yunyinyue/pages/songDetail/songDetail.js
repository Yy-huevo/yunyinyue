// pages/songDetail/songDetail.js
import request from '../until/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false, // 标识音乐是否播放
        song: {},  // 歌曲详情
        musicId: '' // 音乐id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // options 接受路由传参的query值
        let musicId = options.musicId;
        this.setData({
            musicId
        })

        this.getMusicInfo(musicId)
    },


    // 获取音乐详情
    async getMusicInfo(musicId) {
        let songData = await request('http://192.168.11.51:3000/song/detail', { ids: musicId });
        this.setData({
            song: songData.songs[0]
        })
        wx.setNavigationBarTitle({
            title: this.data.song.name,
        });
    },

    // 点击暂停播放
    handleMusicPlay() {
        let isPlay = !this.data.isPlay;
        // 修改是否播放的状态
        this.setData({
            isPlay
        })
        let { musicId } = this.data;
        this.musicControl(isPlay, musicId);
    },
    // 控制音乐播放与暂停
    // 这里还有问题  若点完暂停再点播放  src还是会自动重新播放
    async musicControl(isPlay, musicId) {
        let backAudioManager = wx.getBackgroundAudioManager();
        // 音乐播放
        // 获取音乐播放链接
        let musicLinkData = await request('http://192.168.11.51:3000/song/url', { id: musicId });
        let musicLink = musicLinkData.data[0].url;
        // 创建控制音乐播放的实例对象
        backAudioManager.src = musicLink;
        backAudioManager.title = this.data.song.name;
        if (isPlay) {
            backAudioManager.play();
        } else { // 音乐暂停
            backAudioManager.pause();
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