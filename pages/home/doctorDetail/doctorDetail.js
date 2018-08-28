// pages/home/doctorDetail/doctorDetail.js
import { getClinicDoctorDetails} from '../../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      doctorobj:null,
      arr:[],
      phone:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param={
      doctorId:options.id
    }
    getClinicDoctorDetails(param).then((res)=>{
        this.setData({
          doctorobj:res.result,
          phone:res.result.mobile
          
        })
        if(res.result.introducePicture){
          this.setData({
            arr:res.result.introducePicture.split(",")
          })
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  showImg(e){
      var item=e.currentTarget.dataset.item;
    wx.previewImage({
      current: item, // 当前显示图片的http链接
      urls:this.data.arr // 需要预览的图片http链接列表
    })

  },
  phoneCall:function(){
      if(!this.data.phone){
        wx.showToast({
          title:'暂无该医生联系方式',
          icon:'none'
        })
          return
      }
      wx.makePhoneCall({
        phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
      })

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
  communicate:function(){
    wx.switchTab({
      url: '/pages/customer/customer',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    })
  }
})