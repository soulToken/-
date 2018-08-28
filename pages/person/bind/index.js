
import {getVerifyCode,verifyMobile} from '../../../utils/api'
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
    showSuccess:false,
    getSex:"男",
    date:null,
    maxDate:null,
    hiddenmodalput:true,
    hiddenmodalput2:true,
    name:null,
    phone:null,
    showDialog:false,
    showName:"",
    showPhone:"",
    timer:60,
    btnText:'获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
 
      if(options.phone&&options.phone!=="null"){
            this.setData({
              showPhone:options.phone
            })
      }
      
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
 
  getPhone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },



getCode:function(){
  if(!this.data.phone||!this.data.phone.trim()){
    wx.showToast({
      title: '请输入手机号',
      icon:'none'
    })
    return
  }
  if(this.data.phone.length<11){
    wx.showToast({
      title: '手机号格式有误',
      icon:'none'
    })
    return
  }
  if(this.data.btnText=="重新发送"||this.data.btnText=="获取验证码"){
        getVerifyCode({mobile:this.data.phone}).then((res)=>{
          if(res.resultCode!="1000"){
            return 
          }
          this.count()
        })
  }
  
},
count:function(){          
  var timer=this.data.timer
  
        let siv = setInterval(() => {
          this.setData({ timer: (timer--), btnText: timer+'s', discodeBtn: true }, () => {
              if (timer === 0) {
                  clearInterval(siv);
                  this.setData({ btnText: '重新发送',timer:60, discodeBtn: false })
              }
          });
      }, 1000);
      
  },
  getVerifyCode:function(e){
    var val = e.detail.value;
    this.setData({
      verifyCode: val
    });
  },
  //绑定手机号
  bindMobile:function(){
      // this.data.phone.length<11
    if(!this.data.phone){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
      return
    }
    if(this.data.phone.length<11){
      wx.showToast({
        title: '手机号格式错误',
        icon:'none'
      })
      return
    }
    if(!this.data.verifyCode||this.data.verifyCode.length<6){
      wx.showToast({
        title: '未输入验证码或验证码格式错误',
        icon:'none'
      })
      return
    }


    // this.submit()
    verifyMobile({mobile:this.data.phone,verifyCode:this.data.verifyCode}).then((res)=>{
      if(res.resultCode!="1000"){
        return 
      }
              this.submit()
    })
  },
 
  //确定 
  submit:function(){ 
      wx.switchTab({
        url: '/pages/person/person',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
      })
  },
})