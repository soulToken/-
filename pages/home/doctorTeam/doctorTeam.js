// pages/home/doctorTeam/doctorTeam.js
import { getClinicDoctorList} from '../../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  //请求列表
  getList:function(){
    const param={
      position:this.data.doctorList.length,
      count:'6'
    }
    getClinicDoctorList(param).then((res)=>{
      if (res.resultCode=='1000'){
        var result=this.data.doctorList;
        this.setData({
          doctorList: result.concat(res.result)
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
        this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})