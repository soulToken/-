function postRequest(url, data, method, header) {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function (res) {//服务器返回数据
        console.log(res)
        if (res.data.statusCode = '200') {
          resolve(res.data.data);
        } else {//返回错误提示信息
          reject(res.data.info);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}


module.exports = {
  postRequest: postRequest
}