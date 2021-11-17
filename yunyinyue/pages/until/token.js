
export default (url, data={}, method='POST') => {
return new Promise((resolve, reject) => {
    wx.request({
        url,
        data,
        responseType: 'arraybuffer',
        success: (result)=>{
            resolve(result.data)
        },
        fail: ()=>{},
        complete: ()=>{}
    });
})
}