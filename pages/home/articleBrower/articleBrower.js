// pages/home/articleBrower/articleBrower.js

import { getWxArticleInfo } from '../../../utils/api'
import util from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleData: [],
    position: 0,
    rows: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
formate:function(data){
    return util.formatTime(data)
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //请求微信发布过的文章
    var pages = this.data.position;
    var rows = this.data.rows;
    this.requestWxArticleInfo(pages, rows);
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
    wx.showNavigationBarLoading()
    this.requestWxArticleInfo(0, 5);
    console.log("上拉了");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底了");
    wx.showNavigationBarLoading()
    var pages = this.data.position
    var rows = this.data.rows
    pages++
    this.requestWxArticleInfo(pages, rows);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapName:function(event){
    var app=getApp();     // 取得全局App
    app.globalData.content = event.currentTarget.dataset.item,
    app.globalData.url=event.currentTarget.dataset.url
  
    wx.navigateTo({
           url:'/pages/home/articalDetail/index',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
          success:function(){}        //成功后的回调；
     })
  },
  requestWxArticleInfo: function (position, rows) {
    var data = {
      'position': position,
      'count': rows
    }
    getWxArticleInfo(data).then((res) => {
      let a;
      if (position = '0') {//从第0页开始的
        a = res.result.item;
      } else {
        a = this.data.articleData.concat(res.result.item)
      }
      this.setData({
        articleData: a
      })
      console.log(this.data.articleData)
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  }
})