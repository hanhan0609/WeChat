'use strict';

//4003892 =>  '4,003,892.00'
//!三星不支持toLocaleString
// export function tableMoney(num) {
// 	  num=Number(num)
//     if(num<0){
//         return "-" + Number(Math.abs(num)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).slice(1);
//     }
//     return Number(num).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).slice(1); 
// }
export function tableMoney(num) {
  num=Number(num).toFixed(2)
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

//处理成
export function tableDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return `${String(year).slice(-2)}/${addZero(month)}/${addZero(day)}`
  }
  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }



//["2021-08-05", "2023-02-02"] => {"beginDate": 20210805,"endDate": 20230202}
export let StrToNum= (array)=>{
  console.log(array,'replace报错',array.length==1,array.length==2,typeof array[0] == 'undefined');
  if(array.length==1){
   
    //防止触发请求
    return {
      beginDate:Number(array[0].replace(/-/g, '')) ,
      endDate:''
  }

  }else if(array.length==2 && typeof array[0] == 'undefined'){

    //防止触发请求
    return {
      beginDate:'' ,
      endDate:Number(array[1].replace(/-/g, '')) 
  }

  }else
    return {
        beginDate:Number(array[0].replace(/-/g, '')) ,
        endDate:Number(array[1].replace(/-/g, '')) 
    }
}


// 20230202 => "21/08/05"
export let NumToStr=(num)=>{
    const dateStr = String(num);
    const [year, month, day] = [
        dateStr.slice(2, 4),
        dateStr.slice(4, 6),
        dateStr.slice(6, 8)
      ];
    const formattedDate = `${year}/${month}/${day}`
    return formattedDate
}


//将日期处理成[2012-08-01,2023-03-38]如此
function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return `${year}-${addZero(month)}-${addZero(day)}`
  }

export function dateDeal(current,now){
    let disabled,endDay,startDay,range
    switch (current){
      case 0:
        disabled = true
        endDay = formatDate(new Date(now.getTime() - 86400000))//n-1日
        startDay = formatDate(new Date(now.getTime() - 86400000 ))//n-1一日
        range = [startDay, endDay]
        break;
    case 1:
        disabled = true
        endDay = formatDate(new Date(now.getTime() - 86400000))//n-1日
        startDay = formatDate(new Date(now.getTime() - 86400000 * 7))//前一周
        range = [startDay, endDay]
        break;
    case 2:
        disabled = true
        endDay = formatDate(new Date(now.getTime() - 86400000))//n-1日
        startDay = formatDate(new Date(now.getTime() - 86400000 * 31))//前一月
        range = [startDay, endDay]
        break;
    case 3:
        disabled = false
        range = []
        break;
    }
    return {disabled,range}
    
  }


  export  function checkForEmptyValues(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
          return true; // 返回true表示存在空值
        }
      }
    }
    return false; // 返回false表示不存在空值
  }