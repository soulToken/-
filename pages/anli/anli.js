
//导入js
import { getHosAnLi } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    anliData:[],
    pages:0,
    rows:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestListInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 
   * 当页面生命周期为准备时加载数据
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
    wx.showNavigationBarLoading()
    this.requestListInfo(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading()
   
    this.requestListInfo();
  },

  goDetail:function(e){
    var app=getApp();     // 取得全局App
    app.globalData.anliObj = e.currentTarget.dataset.content,
    wx.navigateTo({
           url:'/pages/anli/detail/index',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
           success:function(){}        //成功后的回调；
          //结束后的回调(成功，失败都会执行)
       })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  catch:function(){

  },
  requestListInfo:function(pages){
    var position=this.data.anliData.length
    if(pages){
      position='0'
    }
    var data = {
      'position': position,
      'count': "10"
    }
    getHosAnLi(data).then((res) => {
      let a;
      if (pages = '0'){//从第0页开始的
        a = res.result;
      }else{
        a = this.anliData.concat(res.result)
      }
      this.setData({
        anliData: a
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  }
})