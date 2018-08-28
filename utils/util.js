const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//日期格式化
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const dateArr=["星期日","星期一","星期二",'星期三','星期四','星期五','星期六']
 const getDateArr=function(dayNum){
  var oDate = new Date();   //获取当前时间  
 var dayArr=[]
  // var dayArr = [
  //     {
  //         valye:dateArr[oDate.getDay()],
  //         label:(oDate.getMonth()+1)+'-'+oDate.getDate(),
  //         time:new Date()
  //     }
  // ];     //定义一个数组存储所以时间
   for(var i=0;i<dayNum;i++){
      var date=new Date(oDate.getTime() + i*24*60*60*1000)


      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      dayArr.push( {
          value:dateArr[date.getDay()],
          label:(date.getMonth()+1)+'/'+date.getDate(),
          time:currentdate
      });   //把未来几天的时间放到数组里
  }
  return dayArr;
}




module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  getDateArr:getDateArr
}
