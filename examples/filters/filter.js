function format (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 格式化时间
 * @param time
 * @returns {string}
 */
function formatDate (time,fmt) {
    if(!time){
        return ''
    }
    let date = new Date(time)
    return format(date,fmt ||  'yyyy-MM-dd hh:mm')
}

/**
 * 格式化性别
 * @param val
 * @returns {*}
 */
function formatSex (val) {
    const obj = {
        0: '女',
        1: '男'
    }
    if(val == 0){
        return '女'
    } else {
        return '男'
    }
}
function filterDy(val) {
    const obj = {
        1: '烟感',
        2: '水浸',
    }
    if(val){
        return obj[val]
    } else {
        return '未知'
    }
}
function filterIcon(val) {
  const obj = {
    '0': 'iconzhihuijifangtubiao_huaban1',
    '1': 'iconzhihuijifangtubiao-02',
    '2': 'iconzhihuijifangtubiao-03',
  }
  if(val){
    return obj[val]
  } else {
    return ''
  }
}
export {formatDate, filterDy, formatSex, filterIcon}
