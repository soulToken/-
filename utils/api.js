var http = require('http.js')
//100care 开发配置
var otherParam={
  // srAppId:"wx32352f5ac2d3a510",
  // srAppSecret:"42168c8a476262c415f2bb671e7320a9"
  srAppId:"wx5214d252b09570ec",
  srAppSecret:"4816bc20a3d4f31c0698271d3f381b47"

}
export function getClinicBaseinfo(){
  return http.post('/100care-wechat/clinicController/wechat/getClinicBaseinfo');
}
export function getClinicWIFI(){
  return http.post('/100care-wechat/wechatOfficialController/getClinicWIFI');
}
//获取医生列表
export function getClinicDoctorList(param) {
  return http.post('/100care-wechat/clinicController/wechat/getClinicDoctorList',param);
}
//获取医生详情  
export function getClinicDoctorDetails(param) {
  return http.post('/100care-wechat/clinicController/wechat/getClinicDoctorDetail',param);
}
//获取可预约时间段
export function getClinicAppointmentTimes(){
  return http.post('/100care-wechat/clinicController/wechat/getClinicAppointmentTimes')
}
//查询诊所的banner图
export function getClinicBanner(param,headParam) {
  return http.post('/100care-wechat/clinicController/wechat/getClinicBanner',param,headParam)
}

//查询用户个人信息
export function getUserBaseinfo(param,headParam) {
  return http.post('/100care-wechat/userController/getUserBaseinfo',param,headParam)
}

//获得手机验证码
export function getVerifyCode(data) {
  return http.post('/100care-wechat/userController/getVerifyCode',data)
}


//绑定手机号
export function verifyMobile(data) {
  return http.post('/100care-wechat/userController/verifyMobile',data)
}


//文章浏览
export function getWxArticleInfo(data) {
  return http.post('/100care-wechat/wechatOfficialController/getMaterial', data)
}

//查询诊所案例
export function getHosAnLi(data){
  return http.post('/100care-wechat/clinicCaseController/getCaseList',data)
}
// module.exports = {
//   getRequestUrl: 'https://clinic.100care.cn'
// }

//查询诊所服务列表
export function getClinicServerList(data){
  return http.post('/100care-wechat/clinicController/wechat/getClinicServerIteamList',data)
}

//查询服务详情  /100care-wechat/clinicController/wechat/getClinicServerDetails
export function getClinicServerDetails(data){
  return http.post('/100care-wechat/clinicController/wechat/getClinicServerIteamDetail',data)
}

//查询活动列表   /100care-wechat/clinicController/wechat/getClinicActivityList

export function getClinicActivityList(data){
  return http.post('/100care-wechat/clinicController/wechat/getClinicActivityList',data)
}

//查询活动详情    /100care-wechat/clinicController/wechat/getClinicActivityDetail
 
export function getClinicActivityDetail(data){
  return http.post('/100care-wechat/clinicController/wechat/getClinicActivityDetail',data)
}

//查询诊所荣誉  /100care-wechat/clinicHonorController/getHonorList

export function getHonorList(data){
  return http.post('/100care-wechat/clinicHonorController/getHonorList',data)
}

//兑换appid  /100care-wechat/wechatOfficialController/getUserOpenId

export function getUserOpenId(data){
      var newparam=Object.assign(otherParam,data)
  return http.post('/100care-wechat/wechatOfficialController/getUserOpenId',newparam)
}

//新增公众号id /100care-wechat/userController/addUser

export function addUser(data,headParam){
  var newparam=Object.assign(otherParam,data)
return http.post('/100care-wechat/userController/addUser',newparam,headParam)
}

//  用户提交预约信息    /100care-wechat/userController/subscriberAppointmentInfo

export function subscriberAppointmentInfo(data,headParam){

return http.post('/100care-wechat/userController/subscriberAppointmentInfo',data,headParam)
}

//修改个人用户信息    /100care-wechat/userController/modifyUserInfo

export function modifyUserInfo(data,headParam){

  return http.post('/100care-wechat/userController/modifyUserInfo',data,headParam)
  }

//查询用户预约列表  /100care-wechat/userController/queryAppointmentList

export function queryAppointmentList(data,headParam){

  return http.post('/100care-wechat/userController/queryAppointmentList',data,headParam)
  }

//改变预约状态   /100care-wechat/userController/modifyAppointmentStatus

export function modifyAppointmentStatus(data,headParam){

  return http.post('/100care-wechat/userController/modifyAppointmentStatus',data,headParam)
}

 //上传头像   /100care-wechat/commonController/wechat/uploadimage 



