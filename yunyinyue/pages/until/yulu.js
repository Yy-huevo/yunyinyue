export default (url, data={}, method="GET") => {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            header: {'content-type':'application/json'},
            dataType: 'json',
            responseType: 'arraybuffer',
            success: (result)=>{
                resolve(result);
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    })
}