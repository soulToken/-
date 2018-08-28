
// var BASE_URL = 'https://clinic.100care.cn';
var BASE_URL = 'https://sit.100care.cn';



var header = {
  'content-type': 'application/x-www-form-urlencoded',
  // 'settingCode':'wxc_100000'
  'settingCode':'wxc_82302'
}


function getReq(url,params,headParam) {
  wx.showLoading({
    title: '加载中',
  })
 
   
  var promise = new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method: 'get',
      params:params,
      header: header,
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == '200') {
          if (res.data.resultCode != '1000' && res.data.resultMsg) {
            wx.showToast({
              title: res.data.resultMsg,
              icon: 'none'
            })
          }
          resolve(res.data);
        } else {//返回错误提示信息
          wx.showModal({
            title: '网络错误',
            content: '网络出错，请刷新重试',
            showCancel: false
          })
          reject(false);
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject(false)
      }
    })
  })
  return promise;
}

function postReq(url, data,headParam) {
  wx.showLoading({
    title: '加载中',
  })
  if(headParam){
    header=Object.assign(header,headParam)
  }
  var promise = new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      header: header,
      data:data,
      method: 'post',
      success: function (res) {
        
        wx.hideLoading();
        if (res.statusCode == '200') {
          if (res.data.resultCode != '1000' && res.data.resultMsg){
            wx.showToast({
              title: res.data.resultMsg,
              icon:'none'
            })
          }
          resolve(res.data);
        } else {//返回错误提示信息
          wx.showModal({
            title: '网络错误',
            content: '网络出错，请刷新重试',
            showCancel: false
          })
          reject(false);
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject(false)
      }
    })
  })
  return promise;
}

const upLoadImg=BASE_URL+"/100care-wechat/commonController/wechat/uploadimage"
module.exports = {
  get: getReq,
  post: postReq,
  header: header,
  upLoadImg
} 