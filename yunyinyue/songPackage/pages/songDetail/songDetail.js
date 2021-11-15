// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js';
import request from '../../../pages/until/request'
import config from '../../../pages/until/config'
import moment from 'moment'
const appInstance = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false, // 标识音乐是否播放
        song: {},  // 歌曲详情
        musicId: '', // 音乐id
        musicLink: '',
        currentTime: '00:00', // 当前时长
        allTime: '00:00',  //总时长
        currentWidth: 0  // 进度条的实时宽度
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onload');
        // options 接受路由传参的query值
        let musicId = options.musicId;
        this.setData({
            musicId
        });

        this.getMusicInfo(musicId);

        // 判断当前页面音乐是否在播放
        if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
            this.setData({
                isPlay: true
            })
        }

        // 用户点击系统暂停音乐  详情页暂停
        this.backAudioManager = wx.getBackgroundAudioManager();
        this.backAudioManager.onPlay(() => {
            this.changePlayState(true);

            // 修改全局音乐播放的状态
            appInstance.globalData.musicId = musicId;
        });
        this.backAudioManager.onPause(() => {
            this.changePlayState(false);
        });
        this.backAudioManager.onStop(() => {
            this.changePlayState(false);
        });
        // 当音乐自然结束
        this.backAudioManager.onEnded(() => {
            //  自动跳转下一首 自动播放
            // 将实时进度条长度切换为0
            PubSub.publish('switchType', next)
            this.setData({
                currentWidth: 0,
                currentTime: '00:00'
            })
        });

        // 监听音乐实时播放的进度
        this.backAudioManager.onTimeUpdate(() => {
            let currentTime = moment(this.backAudioManager.currentTime * 1000).format('mm:ss');
            let currentWidth = this.backAudioManager.currentTime / this.backAudioManager.duration * 450;
            this.setData({
                currentTime,
                currentWidth
            })
        })
    },


    // 获取音乐详情
    async getMusicInfo(musicId) {
        let songData = await request(config.host + '/song/detail', { ids: musicId });
        let allTime = moment(songData.songs[0].dt).format('mm:ss')

        this.setData({
            song: songData.songs[0],
            allTime
        })
        wx.setNavigationBarTitle({
            title: this.data.song.name,
        });
    },

    // 点击暂停播放
    handleMusicPlay() {
        let isPlay = !this.data.isPlay;
        // 修改是否播放的状态
        // this.setData({
        //     isPlay
        // })
        let { musicId, musicLink } = this.data;
        this.musicControl(isPlay, musicId, musicLink);
    },

    // 控制音乐播放与暂停
    // 这里还有问题  若点完暂停再点播放  src还是会自动重新播放
    async musicControl(isPlay, musicId, musicLink) {
        if (isPlay) {
            if (!musicLink) {
                // 获取音乐播放链接
                let musicLinkData = await request(config.host + '/song/url', { id: musicId });
                musicLink = musicLinkData.data[0].url;
                this.setData({
                    musicLink
                })
            }
            // 音乐播放
            // 创建控制音乐播放的实例对象
            this.backAudioManager.src = musicLink;
            this.backAudioManager.title = this.data.song.name;
        } else { // 音乐暂停
            this.backAudioManager.pause();
        }
    },

    // 修改音乐的播放状态函数
    changePlayState(isPlay) {
        this.setData({
            isPlay
        });

        appInstance.globalData.isMusicPlay = isPlay;
    },

    // 切换歌曲
    handleMusicSwitch(event) {
        let type = event.currentTarget.id;
        //关闭当前播放的音乐
        this.backAudioManager.stop();
        PubSub.subscribe('musicId', (msg, musicId) => {


            this.getMusicInfo(musicId);
            // 切换后自动播放
            this.musicControl(true, musicId);
            // 取消订阅
            PubSub.unsubscribe('musicId');

        })
        // 发布消息
        PubSub.publish('switchType', type)

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
        console.log('onunload');
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