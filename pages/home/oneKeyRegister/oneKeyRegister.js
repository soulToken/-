// pages/home/oneKeyRegister/oneKeyRegister.js
import { getClinicAppointmentTimes,getClinicServerList,getClinicDoctorList} from '../../../utils/api'
import {getDateArr} from '../../../utils/util'
var app=getApp()
Page({
  chooseDate:function(event){
    var date = event.currentTarget.dataset.id
    this.setData({
      date:date
    })
  },
  toggleDialog() {
  
    if(!this.data.date){
     
      wx.showToast({
        title: '请选择预约日期',
        icon:'none'
      })
      return
    }
    if(!this.data.time){
      wx.showToast({
        title: '请选择预约时间',
        icon:'none'
      })
      return
    }
    var date=new Date();
    if( new Date(this.data.date).getTime()<=date.getTime()&&parseInt(this.data.time)<=date.getHours()){
        wx.showToast({
          title: '选择的时间段小于当前时间',
          icon:'none'
        })
        return
    }
    var id=null;
    if(this.data.choosedDoctorName){
      var obj=this.data.doctorList.filter((item)=>{
        return  item.doctorName==this.data.choosedDoctorName
      })
      id=obj[0].doctorId
          
    } 
   var param={
    appointmentDate:this.data.date,
    appointmentTime:this.data.time
   }
   if(this.data.choosedServiceName){
     param.appointmentServeritem=this.data.choosedServiceName
   }
   if(id){
      param.doctorId=id
   }
  //相关预约参数保存
   app.globalData.appointmentParam=param;

    wx.navigateTo({
        url:'/pages/home/oneKeyRegister/confirmMessage/person',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
        success:function(){}        //成功后的回调；
    })
    // this.setData({
    //   showDialog: !this.data.showDialog
    // });
  },
  chooseTime:function(event){
    var time = event.currentTarget.dataset.time
    this.setData({
      time: time
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    time:null,
    showDialog: false,
    registerSuccess:false,
    times:[],
    dates:[],
    serviceList:[],
    serviceNameList:[],
    choosedServiceName:null,
    doctorList:[],
    doctorNameList:[],
    choosedDoctorName:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options&&options.name){
        this.setData({
          choosedServiceName:options.name
        })
    }

    console.log(getDateArr(7))
    this.setData({
      dates:getDateArr(7)
    })
    getClinicAppointmentTimes().then((res)=>{
     
      this.setData({
        times:res.result
      })
    })
    this.getSevciceList();
    this.getDoctorList();
  },
  //获取医生列表
  getSevciceList:function(){
    getClinicServerList().then((res)=>{
      
      var nameList=[];
      if(res.result&&res.result.length&&res.result.length>0){
        res.result.forEach(element => {
          nameList.push(element.clisName) 
        });
      }
        this.setData({
          serviceList:res.result,
          serviceNameList:nameList
        })
    })
  },
  serviceNameChange:function(e){
      console.log(e.detail.value)
      this.setData({
        choosedServiceName:this.data.serviceList[e.detail.value].clisName
      })
  },
  doctorNameChange:function(e){
    console.log(e.detail.value)
    this.setData({
      choosedDoctorName:this.data.doctorList[e.detail.value].doctorName
    })
  },
  getDoctorList:function(){
    getClinicDoctorList().then((res)=>{
      var nameList=[];
      if(res.result&&res.result.length&&res.result.length>0){
        res.result.forEach(element => {
          nameList.push(element.doctorName) 
        });
      }
        this.setData({
          doctorList:res.result,
          doctorNameList:nameList
        })
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