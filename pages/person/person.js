
import util from '../../utils/util'
import {getUserBaseinfo,modifyUserInfo } from '../../utils/api'
import {upLoadImg} from '../../utils/http'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sexArr:['女', '男'],
    currentSex:'1',
    getSex:"",
    date:'1990-01-01',
    maxDate:null,
    hiddenmodalput:true,
    name:null,
    showName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    var date=new Date();
    this.setData({
      maxDate:util.formatDate(date)
    })
    // this.getDetail()
    // let that = this
    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //           that.setData({
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getDetail:function(){
    getUserBaseinfo({},{openId:app.globalData.weChatParam.openId}).then((res)=>{
      console.log(this)
   
                this.setData({
                  userInfo:res.result,
                  currentSex:res.result.sex,
                  getSex:this.data.sexArr[res.result.sex],
                  date:res.result.birthday||"1990-01-01"
                })
            
                if(res.result.name){
                  this.setData({
                    showName:res.result.name,
                  })
                }
                if(res.result.mobile){
                  this.setData({
                    showPhone:res.result.mobile,
                  })
                }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(!app.globalData.weChatParam.userId){
      wx.navigateTo({
        url:'/pages/authorization/index?id=2',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
        success:function(){}        //成功后的回调；
      })
      return
    }
    this.getDetail()
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

  changePersonMessage:function(url){
    if(url){
        var data={
          headUrl:url
        }
    }else{
      var data={
        name:this.data.showName,
        birthday:this.data.date||"1990-01-01",
        sex:this.data.currentSex
      }
    }
    
    var param={
      openId:app.globalData.weChatParam.openId
    }
    modifyUserInfo(data,param).then((res)=>{
          this.getDetail()
    })
  },
  sexChange:function(v){
        this.setData({
          currentSex:v.detail.value,
          getSex:this.data.sexArr[v.detail.value]
        })
        this.changePersonMessage()
  },
  bindDateChange:function(v){
    this.setData({
      date:v.detail.value,
    })
    this.changePersonMessage()
  },
  getName:function(e){
    this.data.name = e.detail.value;
  },
  //确定
  confirm:function(){
    
    if(!this.data.name||!this.data.name.trim()){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return 
    }


    if(this.data.name.trim()){
      this.setData({
        showName:this.data.name,
      })
    }
    this.changePersonMessage()
      this.setData({
        hiddenmodalput:true,
       
      })
  },
  //取消
  cancel:function(){
    this.setData({
      hiddenmodalput:true
    })
  },
  //填写名字
  writeName:function(){
    this.setData({
      hiddenmodalput:false
    })
  },
  toBind:function(){

    if(this.data.userInfo.mobileValid=='1'){
      wx.showModal({
        title: '提示',
        content: '您已绑定过手机号是否确定修改',
        success: function(res) {
          if (res.confirm) {
                wx.navigateTo({
                  url:'/pages/person/bind/index',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
                  success:function(){}        //成功后的回调；
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.navigateTo({
          url:'/pages/person/bind/index?phone='+this.data.userInfo.mobile,  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
          success:function(){}        //成功后的回调；
      })
    }
    
    
  
  },
  changeHeadUrl:function(){
    console.log(upLoadImg,111)
    var self=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: upLoadImg, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          formData:{
            // 'image': tempFilePaths[0]
          },
          success: function(res){
            var data = res.data
            var param=JSON.parse(data)
              if(param.resultCode!="1000"){
                  wx.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 2000
                  })
                  return
               }
            
               var url=param.result.url;
               self.changePersonMessage(url)

          }
        })
    
      }
    })
  }
  
})