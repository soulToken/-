var routes = require('routes')
import { getClinicBanner} from '../../utils/api'
import { getClinicBaseinfo } from '../../utils/api'
import { getClinicWIFI } from '../../utils/api'
import { getClinicServerList,getClinicDoctorList } from '../../utils/api'
var app=getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers:[],
    imgUrls: [
     
    ],
    serviceList:[],//服务列表
    doctorsList:[],//医生列表
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    clinicBaseInfo: {},
    showModal:true,
    wifiImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      routers:routes.routes
    })
    const param={
      pageType:'1'
    }
    getClinicBanner(param).then((res)=>{
        this.setData({
          imgUrls:res.result
        }) 
    })
    getClinicServerList().then((res)=>{
     
      this.setData({
        serviceList:res.result
      }) 
    })
    const data={
      position:'0',
      count:'3'
    }
    //医生列表
    getClinicDoctorList(data).then((res)=>{
      this.setData({
        doctorsList:res.result
      }) 
    })
    getClinicBaseinfo().then((res)=>{
      this.setData({
        phone:res.result.edtPhone
      }) 
    })
    



  },
  previewImage:function(){

    wx.previewImage({
      current: this.data.wifiImg, // 当前显示图片的http链接   
      urls: [this.data.wifiImg] // 需要预览的图片http链接列表   
    })  
    wx.getImageInfo({// 获取图片信息（此处可不要）
      src: 'https://www.cslpyx.com/weiH5/jrkj.jpg',
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
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
  onClick: function (event){
    var code = event.currentTarget.dataset.code
    console.log(code);
    switch(code){
       //一键预约
       case "10":
        this.appointment();
         break;
       //一键导航
       case "11":
        this.navigation();
         break;
       //一键咨询
       case "12":
       if(!this.data.phone){
        wx.showToast({
          title:"该诊所暂无联系方式"
        })
         return 
       }
        this.makePhone(this.data.phone);
         break;
       //免费wifi
       case "13":
        this.getWifi();
         break;
       default:
         console.log("没有匹配到信息");
    }
  },
  //预约界面
  appointment:function(){
    //注释 通过判断是否有userId 跳转登陆界面
    if(!app.globalData.weChatParam.userId){
      wx.navigateTo({
        url:"/pages/authorization/index?id=1",  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
       success:function(){}        //成功后的回调；
         //结束后的回调(成功，失败都会执行)
      })
      return
    }
    wx.navigateTo({
           url:"/pages/home/oneKeyRegister/oneKeyRegister",  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
          success:function(){}        //成功后的回调；
            //结束后的回调(成功，失败都会执行)
     })
  },
  makePhone:function(phone){
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  getWifi:function(){
    getClinicWIFI().then((res) => {
      console.log(res)
      this.setData({
        wifiImg: res.result.wifiImg,
        showModal:false
      })
      // this.previewImage()
    })
  },
  navigation:function(){
    //先获取诊所的经纬度，再调用小程序的api进行定位
    var lat;
    var lon;
    var name;
    getClinicBaseinfo().then((res) => {
      console.log("---11-")
      console.log(res)
      if (res.resultCode == '1000') {
        this.setData({
          clinicBaseInfo: res.result
        })
        lat = res.result.lat;
        lon = res.result.lon;
        name=res.result.clinicName
        console.log(lat + "-44--" + lon);
        wx.openLocation({
          latitude: lat, //返回可以用于wx.openLocation的经纬度
          longitude: lon,
          scale: 28,
          name:name
        }) 
        // wx.getSetting({
        //   success: (res) => {
        //     if (!res.authSetting['scope.userLocation']) {
        //       wx.authorize({
        //         scope: 'scope.userLocation',
        //         success() {
        //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        //           //打开诊所地图
        //           //授权成功 
        //           wx.openLocation({
        //             latitude: lat, //返回可以用于wx.openLocation的经纬度
        //             longitude: lon,
        //             scale: 28,
        //             name:name
        //           }) 
        //         }
        //       })
        //     }
         
        //   }
        // })
      }
    })
  },
  close_mask: function () {
    this.setData({
      showModal: true
    })
  }
})