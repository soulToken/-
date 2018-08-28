// pages/home/honor/honor.js
import {getClinicServerDetails} from '../../../utils/api'
var WxParse = require('../../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result:null
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getClinicServerDetails(options).then((res)=>{
               this.setData({
                    result:res.result
               })
               WxParse.wxParse('article', 'html', res.result.serverDetail, this, 5);
        })
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
    
    },
    gotoAppoint:function(){
        wx.navigateTo({
                 url:'/pages/home/oneKeyRegister/oneKeyRegister?name='+this.data.result.clisName,  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
                 success:function(){}        //成功后的回调；
            
             })
    }
  })