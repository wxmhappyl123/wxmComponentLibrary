export const  validata = {
    /**
     * 手机号验证
     * @param rule
     * @param value
     * @param callback
     */
    phoneValidata(rule, value, callback) {
      if (value) {
        // var reg = /^[1][0-9]{10}|(0[0-9]{2,3}\/-)?([2-9][0-9]{6,7})+(\/-[0-9]{1,4})?$/
        var reg = /^[1][0-9]{10}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的电话号码'))
        }
      }
      callback()
    },
    urlValidate(rule, value, callback) {
      if(!value){
        callback()
      }
      var reg = /^((https|http)?:\/\/)[^\s]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的URL地址'))
      }
    },
    /**
     * 登录账号验证
     * @param rule
     * @param value
     * @param callback
     */
    accountValidata(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入登录账号'))
      } else {
        var reg = /^[a-zA-Z0-9]{4,16}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的用户名，4到16位（字母，数字）'))
        }
      }
    },
    emailValidate (rule, value, callback){
        if (value) {
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的邮箱'))
            }
        }
        callback()
    },
    /**
     * 密码验证
     * @param rule
     * @param value
     * @param callback
     */
    pwdValidate(rule, value, callback) {
        // if (value.length >= 6 && value.length <= 20){
        //     callback()
        // } else {
        //     callback(new Error('请输入6-20位的密码！'))
        // }
        let sc = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
        var v1 = /[a-z]/
        var v2 = /[A-Z]/
        var v3 = /[0-9]/
        var v4 = /\W/
        var v5 = /[._]/
        var sum = 0
        if (v1.test(value)) {
            sum = sum + 1
        }
        if (v2.test(value)) {
            sum = sum + 1
        }
        if (v3.test(value)) {
            sum = sum + 1
        }
        if (v4.test(value)) {
            sum = sum + 1
        }
        if (v5.test(value)) {
            sum = sum + 1
        }
        if (sum >= 4) {
            callback()
        } else {
            callback(new Error('请输入正确的密码，密码包含大写字母，小写字母，数字，特殊字符'))
        }
    },
    /**
     * 经度验证
     * @param rule
     * @param value
     * @param callback
     */
    longitudeValidate(rule, value, callback){
        if (value) {
            var reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的学校经度,经度整数部分为0-180,小数部分为0到6位!'))
            }
        }
        callback()
    },
    /**
     * 纬度验证
     * @param rule
     * @param value
     * @param callback
     */
    latitudeValidate(rule, value, callback){
        if (value) {
            var reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的学校纬度,纬度整数部分为0-90,小数部分为0到6位!'))
            }
        }
        callback()
    },
    /**
     * 角色key验证
     * @param rule
     * @param value
     * @param callback
     */
    roleKeyValidate(rule, value, callback){
         if(value){
             // let reg = /^[A-Z_\-]+$/ig
             let reg = /^(?!_)(?!.*?_$)[A-Z_\u4e00-\u9fa5]+$/;
             if (reg.test(value)) {
                 callback()
             } else {
                 callback(new Error('请输入正确的角色key,包含大写字母、下划线'))
             }
         }
        callback()
    },
    /**
     * 字典类型验证
     * @param rule
     * @param value
     * @param callback
     */
    enumTypeValidate(rule, value, callback){
        if(value){
            // let reg = /^[A-Z_\-]+$/ig
            let reg = /^(?!_)(?!.*?_$)[A-Z_\u4e00-\u9fa5]+$/;
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的字典类型,包含大写字母、下划线'))
            }
        }
        callback()
    },
    /**
     * 菜单路由验证
     * @param rule
     * @param value
     * @param callback
     */
    menuRouteValidate(rule, value, callback){
        if(value){
            let reg = /^(?:\/)[a-zA-Z\u4e00-\u9fa5]+$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的菜单路由，以’/‘开头，只能包含大小写字母'))
            }
        }
        callback()
    },
    menuCodeValidate(rule, value, callback){
        if(value){
            let reg = /^[0-9]+$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的菜单编号，只能是数字'))
            }
        }
        callback()
    },
    /**
     * 菜单图标验证
     * @param rule
     * @param value
     * @param callback
     */
    menuIconValidate(rule, value, callback) {
        if(value){
            // let reg =/^([a-zA-Z]|[0-9])(\w|\-)+-[a-zA-Z0-9]$/
            let reg = /([a-zA-Z]|[0-9])+$/;
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的菜单图标，由字符、数字、’-‘组成的class名'))
            }
        }
        callback()
    },
    /**
     * 字典value值验证
     * @param rule
     * @param value
     * @param callback
     */
    dicValueValidate(rule, value, callback) {
        if(value){
            let reg = /([a-zA-Z]|[0-9])+$/;
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入由数字和英文字母组成的字典value'))
            }
        }
        callback()
    },
    /**
     * 字典key值验证
     * @param rule
     * @param value
     * @param callback
     */
    dicKeyValidate(rule, value, callback) {
        if(value){
            let reg = /^[0-9]+$/;
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入数字的字典key'))
            }
        }
        callback()
    }
}
