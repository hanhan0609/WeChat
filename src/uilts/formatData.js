'use strict';

/**
 * 获取任意时间
 */
function getDate(date, AddDayCount = 0, str = 'day') {
    if (!date) {
        date = new Date()
    }
    if (typeof date !== 'object') {
        date = date.replace(/-/g, '/')
    }
    const dd = new Date(date)
    switch (str) {
        case 'day':
            dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
            break
        case 'month':
            if (dd.getDate() === 31 && AddDayCount>0) {
                dd.setDate(dd.getDate() + AddDayCount)
            } else {
                const preMonth = dd.getMonth()
                dd.setMonth(preMonth + AddDayCount) // 获取AddDayCount天后的日期
                const nextMonth = dd.getMonth()
                // 处理 pre 切换月份目标月份为2月没有当前日(30 31) 切换错误问题
                if(AddDayCount<0 && preMonth!==0 && nextMonth-preMonth>AddDayCount){
                    dd.setMonth(nextMonth+(nextMonth-preMonth+AddDayCount))
                }
                // 处理 next 切换月份目标月份为2月没有当前日(30 31) 切换错误问题
                if(AddDayCount>0 && nextMonth-preMonth>AddDayCount){
                    dd.setMonth(nextMonth-(nextMonth-preMonth-AddDayCount))
                }
            }
            break
        case 'year':
            dd.setFullYear(dd.getFullYear() + AddDayCount) // 获取AddDayCount天后的日期
            break
    }
    const y = dd.getFullYear()
    const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
    const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return {
        fullDate: y + m + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay()
    }
}

function getDefaultDate() {
    // 获取系统日期的前一天
    var date = new Date();
    date = date.setDate(date.getDate() - 1);
    date = new Date(date);
    date = getDate(date).fullDate;
    return date;
}

// 字符串中插入字符
function insertStr(source, start, newStr) { // source原始日期，start需要插入字符的位置，newStr需要插入的字符
    return source.slice(0, start) + newStr + source.slice(start)
}

// 日期格式化
function dateFormat(format, date) {
    let formatedDate;
    switch(format) {
        case 'mm/dd': // yyyymmdd 转 mm/dd
            formatedDate = insertStr(date.toString().slice(4), 2, '/');
            break;
        case 'yyyymmdd': // yyyy-mm-dd 转 yyyymmdd
            formatedDate = date.replace(/-/g, '');
            break;
        case 'yyyy-mm-dd': // yyyymmdd 转 yyyy-mm-dd
            formatedDate = insertStr(insertStr(date, 4, '-'), 7, '-')
    }
    return formatedDate
}

function getMaxMinInArr(arr) {
    //调用flat方法，数组扁平化
    let newArr = arr.flat(Infinity)
    //求最大值和下标。
    let max = Math.max(...newArr)
    let maxindex = newArr.indexOf(max)
    console.log(max,maxindex);
    //求最小值和下标。
    let min = Math.min(...newArr)
    let minindex = newArr.indexOf(min)
    console.log(min, minindex);

    return {
        max,
        maxindex,
        min,
        minindex
    }
}

export {getDate, getDefaultDate, dateFormat, getMaxMinInArr};