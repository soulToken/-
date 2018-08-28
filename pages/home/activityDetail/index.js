// pages/home/honor/honor.js
import {getClinicActivityDetail} from '../../../utils/api'
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
        getClinicActivityDetail(options).then((res)=>{
               this.setData({
                    result:res.result
               })
            //    var p=""
               var p=res.result.activityDetail;
               WxParse.wxParse('article', 'html', p, this, 5);
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
    
    }
  })