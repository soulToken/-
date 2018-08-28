// pages/person/registerList/RegisterList.js
import {queryAppointmentList,modifyAppointmentStatus} from '../../../utils/api'
var app = getApp()
var dateArr=['周日',"周一",'周二','周三','周四','周五','周六']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list:[],
    show1:false,
    show2:false,
    list2:[]
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if(e.detail.current==1){
      this.getList(0,1)
    }
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  getList:function(type,refesh){
    //appointmentStatus
    var data={
      appointmentStatus:type,
      count:5
    }
    if(type==1){
      data.position=this.data.list.length
    }else{
      data.position=this.data.list2.length
    }
    if(refesh){
      data.position=0

    }
    var param={
      openId:app.globalData.weChatParam.openId
    }
    queryAppointmentList(data,param).then((res)=>{
        if(type==1){
          if(refesh){
              var list=res.result;
          }else{
            var list=this.data.list.concat(res.result)
          }
          
          this.setData({
            list:list,
            show1:true
          })
        }else{
          if(refesh){
            var list2=res.result;
          }else{
            var list2=this.data.list2.concat(res.result)
          }
          this.setData({
            list2:list2,
            show2:true
          })
        }
         
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getList(1)
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
   
    //监听页面销毁时总是跳转到个人信息界面
    wx.switchTab({
      url: '/pages/person/person',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    })
   
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
      if(this.data.currentTab==1){
        this.getList(0)
      }else{
        this.getList(1)
      }
  },
  cancel:function(e){
    var id=e.currentTarget.dataset.item;
    var self=this;
    wx.showModal({
      title: '提示',
      content: '确定要取消预约嘛？',
      success: function(res) {
        if (res.confirm) {
              self.changeStatus(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changeStatus:function(id){
    var data={
      appointmentStatus:4,
      id:id
    }
    var param={
      openId:app.globalData.weChatParam.openId
    }
    modifyAppointmentStatus(data,param).then((res)=>{
          this.getList(1,1)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  lower:function(){
    
  }
})