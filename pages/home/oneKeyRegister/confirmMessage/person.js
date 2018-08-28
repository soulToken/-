
import {getUserBaseinfo,getVerifyCode,verifyMobile,subscriberAppointmentInfo,modifyUserInfo} from '../../../../utils/api'
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
      this.getDetail()
  },
  getDetail:function(){
    getUserBaseinfo({},{openId:app.globalData.weChatParam.openId}).then((res)=>{
      console.log(this)
   
                this.setData({
                  userInfo:res.result,
                  currentSex:res.result.sex,
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
  sexChange:function(v){
        this.setData({
          currentSex:v.detail.value,
          getSex:this.data.sexArr[v.detail.value]
        })
  },
  bindDateChange:function(v){
    this.setData({
      date:v.detail.value,
      
    })
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
  
  getPhone:function(e){
    this.data.phone = e.detail.value;
  },
//确定
confirm2:function(){
  if(!this.data.phone||!this.data.phone.trim()){
    wx.showToast({
      title: '请输入手机号',
      icon: 'none',
      duration: 2000
    })
    return 
  }
  if(this.data.phone.length<11){
    wx.showToast({
      title: '手机号格式不正确',
      icon: 'none',
      duration: 2000
    })
    return 
  }


  if(this.data.phone.trim()){
    this.setData({
      showPhone:this.data.phone,
    })
  }
    this.setData({
      hiddenmodalput2:true,
     
    })
},
//取消
cancel2:function(){
  this.setData({
    hiddenmodalput2:true
  })
},
writePhone:function(){
  this.setData({
    hiddenmodalput2:false
  })
},
toggleDialog() {
  if(!this.data.showName){
    wx.showToast({
      title: '请输入姓名',
      icon:'none'
    })
    return
  }
  if(!this.data.showPhone){
    wx.showToast({
      title: '请输入手机号',
      icon:'none'
    })
    return
  }
  if(this.data.userInfo&&this.data.userInfo.mobileValid=='0'){
    this.setData({
      showDialog: true
    });
  }else if(this.data.userInfo.mobileValid=='1'){
      this.appointment();
      this.changePersonMessage()
  }

  

  
},
getCode:function(){
  if(!this.data.showPhone||!this.data.showPhone.trim()){
    wx.showToast({
      title: '请输入手机号',
      icon:'none'
    })
    return
  }
  if(this.data.showPhone.length<11){
    wx.showToast({
      title: '手机号格式有误',
      icon:'none'
    })
    return
  }

  if(this.data.btnText=="重新发送"||this.data.btnText=="获取验证码"){
        getVerifyCode({mobile:this.data.showPhone}).then((res)=>{
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
  getPhoneNumber:function(e){
    var val = e.detail.value;
    this.setData({
      showPhone: val
    });
  },
  getVerifyCode:function(e){
    var val = e.detail.value;
    this.setData({
      verifyCode: val
    });
  },
  //绑定手机号
  bindMobile:function(){
    //||this.data.showPhone.length<11
    if(!this.data.showPhone){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
      return
    }
    if(this.data.showPhone.length<11){
      wx.showToast({
        title: '手机号格式有误',
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
    verifyMobile({mobile:this.data.showPhone,verifyCode:this.data.verifyCode}).then((res)=>{

      if(res.resultCode!="1000"){
        return 
      }
            this.appointment();
            this.changePersonMessage()
    })
  },
  appointment:function(){

    var data=Object.assign(app.globalData.appointmentParam,{"appointmentName":this.data.showName})   
    this.setData({
      showDate:data.appointmentDate,
      showTime:data.appointmentTime
    })
    subscriberAppointmentInfo(data,{openId:app.globalData.weChatParam.openId}).then((res)=>{
        
      this.setData({
        showDialog:true,
        showSuccess: true
      });
      // wx.navigateTo({
      //   url:'/pages/person/registerList/registerList',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      //   success:function(){}        //成功后的回调；
      // })
    })
  },
  //确定 
  submit:function(){ 
      wx.redirectTo({
        url:'/pages/person/registerList/registerList',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
        success:function(){}        //成功后的回调；
      })
  },
  //修改个人信息
  changePersonMessage:function(){
    var data={
      name:this.data.showName,
      birthday:this.data.date||"1990-01-01",
      sex:this.data.currentSex,
      mobile:this.data.phone||this.data.showPhone
    }
    var param={
      openId:app.globalData.weChatParam.openId
    }
    modifyUserInfo(data,param).then((res)=>{
          this.getDetail()
    })
  },
  nextSpeak:function(){
      this.appointment();
      this.changePersonMessage();
  }   
})