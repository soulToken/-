//获取应用实例
const app = getApp()

//导入js
var network = require("../../utils/network.js")
var api = require("../../utils/api.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
      img:"/image/png/前台@3x.png"
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if(!app.globalData.userInfo){
    //   wx.navigateTo({
    //     url:"/pages/authorization/index",  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
    //    success:function(){}        //成功后的回调；
    //      //结束后的回调(成功，失败都会执行)
    //   })
    //   return
    // }
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
    
  },

  clickNetDemo : function(e){
    var zhensuoInfoApi = "/100care-wechat/clinicController/wechat/getClinicBaseinfo/";    
    //var api_info = app.globalData.api + zhensuoInfoApi;
    var api_info = api.getRequestUrl + zhensuoInfoApi;
    var settingCode = 'wxc_100000';
    //发起请求
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'settingCode': settingCode
    }
    wx.showLoading({
      title: '加载中...',
    })

    //调用 app.js里的 post()方法
    network.postRequest(api_info, {}, "POST", header).then((res) => {
      console.log("-sueeccd---");//正确返回结果
      wx.hideLoading();
    }).catch((errMsg) => {
      //错误提示信息
      wx.hideLoading();
    });
  }

})