
/* 
*  1. 封装功能函数
*   1.功能点明确
*   2. 函数内部应保留固定代码
*   3.将动态的数据封装为形参
*
 */
// 发送ajax请求

// 用async+await +promise解决异步问题
export default (url, data={}, method='GET') => {
    return new Promise((resolve, reject) =>{
        wx.request({
            url,
            data,
            method,
            header: {
                cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
            },
            //成功的回调
            success: (res) => {
               if (data.isLogin) {
                   // 将用户cookie存入本地
                   wx.setStorage({
                    key: 'cookies',
                    data: res.cookies
                   })
               }
                resolve(res.data);
            },
            fail: (err) => {
                console.log('获取失败',err);
                reject(err);
            }
        })
    })
}

