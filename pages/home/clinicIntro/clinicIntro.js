// pages/home/clinicIntro/clinicIntro.js
import { getClinicBaseinfo } from '../../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/icon/intro/banner@3x的副本.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    clinicBaseInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getClinicBaseinfo().then((res)=>{
      if (res.resultCode=='1000'){
        this.setData({
          clinicBaseInfo:res.result
        })
      }
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
  //预览图片
  showPic:function(event){
    var index=event.currentTarget.dataset['index'];
    var urls=[];
    if(this.data.clinicBaseInfo.clinicEnvironmentList&&this.data.clinicBaseInfo.clinicEnvironmentList.length&&this.data.clinicBaseInfo.clinicEnvironmentList.length>0){
    this.data.clinicBaseInfo.clinicEnvironmentList.forEach(function(item){
      urls.push(item.fileUrl)
    })
    wx.previewImage({
      current: this.data.clinicBaseInfo.clinicEnvironmentList[index].fileUrl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
    }
  },
  //地图
  map:function(){
    wx.openLocation({
      latitude: this.data.clinicBaseInfo.lat, //返回可以用于wx.openLocation的经纬度
      longitude: this.data.clinicBaseInfo.lon,
      scale: 28,
      name:this.data.clinicBaseInfo.clinicName
    }) 
  },
  call:function(){
    if(!this.data.clinicBaseInfo||!this.data.clinicBaseInfo.edtPhone){
      wx.showToast({
        title:'该诊所暂无联系方式'
      })
      return 
    }
    wx.makePhoneCall({
      phoneNumber: this.data.clinicBaseInfo.edtPhone //仅为示例，并非真实的电话号码
    })
  }
})