let utils = {
  /**
   * 计算两个时间相差的天数
   * @param dateInitial
   * @param dateFinal
   * @returns {number}
   */
  getDaysDiffBetweenDates(dateInitial, dateFinal) {
    return ((dateFinal - dateInitial) / (1000 * 3600 * 24)).toFixed(0)
  },
  addMonth(baseDate, month) {
    let d = new Date(baseDate)
    d.setMonth(d.getMonth() + month)
    return d
  },
  /**
   * 获得两个时间的月份差
   */
  getMonthDiffBetweenDates(dateInitial, dateFinal) {
    let start = new Date(dateInitial)
    let end = new Date(dateFinal)
    return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
  },
  /**
   * 格式化时间
   * @param date
   * @param fmt
   * @returns {*}
   */
  format(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this._padLeftZero(str))
      }
    }
    return fmt
  },
  _padLeftZero(str) {
    return ('00' + str).substr(str.length)
  },
  getUuid() {
    return (this._S4() + this._S4() + '-' + this._S4() + '-' + this._S4() + '-' + this._S4() + '-' + this._S4() + this._S4() + this._S4())
  },
  _S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  },
  objectSetValue(target, source) {
    if (!source) {
      return target
    }
    if (typeof target === 'object' && typeof source === 'object') {
      for (let key in target) {
        if (typeof target[key] !== 'object' || target[key] === null || target[key] === undefined) {
          target[key] = source[key]
        } else {
          let res = this.objectSetValue(target[key], source[key])
          target[key] = res
        }
      }
    }
    return target
  }
}
export {utils}
