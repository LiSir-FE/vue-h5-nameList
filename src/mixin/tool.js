/**
 * Created by zhong on 2018/5/9.
 */
export const tl = {
  getParam: function(param) {
    let url = ''
    if (!param) return url
    for (const key in param) {
      if (param[key] !== null) {
        url ? url += '&' + key + '=' + encodeURIComponent(param[key]) : url += key + '=' + encodeURIComponent(param[key])
      }
    }
    return url ? '?' + url : ''
  },
  /* obj*/
  isEmpty: function(value) { /* 验证为空*/
    if (value) {
      return !(value.trim().length <= 0)
    } else {
      return false
    }
  },
  isNumber: function(value) { /* 验证数字*/
    var num = /^\d+$/
    return num.test(value)
  },
  isName: function(value) {
    var name = /[\u4E00-\u9FA5]{2,4}/ || /[a-zA-Z]{2,30}/
    return name.test(value)
  },
  isPhoneNumber: function(value) { /* 验证手机号码*/
    // var mobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var mobile = /^(1+\d{10})$/
    return mobile.test(value)
  },
  isTelephone: function(value) { /* 验证座机号码*/
    var reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/
    return reg.test(value)
  },
  isEmail: function(value) { /* 验证电子邮箱*/
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    return reg.test(value)
  },
  isSpecialLetter: function(value) { /* 验证为特殊字符*/
    var parr = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    return parr.test(value)
  },
  isIDCard: function(value) { /* 验证身份证号*/
    var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
    return reg.test(value)
  },
  isBankCard: function(value) {
    /* 验证银行卡号
     *   // 这个只能简单判断银行卡格式
     *银行卡有可能是16位也有可能是19位
     * */
    var reg = /^\d{16}|\d{19}$/
    return reg.test(value)
  },
  isSameOfPwd: function(value1, value2) { /* 验证密码是否一致*/
    return value1 === value2
  },
  isLessLength: function(value, limitLen) { /* 验证位数不少于limitLen位*/
    return value.trim().length >= limitLen
  },
  isBetweenMAndN: function(value, minLen, maxLen) { /* 验证值的位数在m~n位之间[m,n] */
    return value.trim().length >= minLen && value.trim().length <= maxLen
  },
  isLAndN: function(value) { /* 验证只有字母和数字自由排列组合*/
    var reg = /^[A-Za-z0-9]+$/
    return reg.test(value)
  },
  isLetterNum: function(value) { /* 验证只有字母和数字,字母开头*/
    var reg = /^[a-zA-Z]\w{5,17}$/
    return reg.test(value)
  },
  isEnLetter: function(value) { /* 验证只有英文字符*/
    var reg = /^[A-Za-z]+$/
    return reg.test(value)
  },
  isEnBegin: function(value) { /* 验证英文、字母、下划线，英文开头*/
    var reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
    return reg.test(value)
  },
  isDomainName: function(value) { /* 验证服务器域名*/
    var reg = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g
    return reg.test(value)
  },
  isCertification: function(value) { /* 验证营业执照*/
    return /\d{15}/.test(value)
  },
  isMoney: function(value) { /* 验证价格和金额*/
    var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/
    return reg.test(value)
  },
  /* 转换时间戳为时间 */
  getFormatOfDate: function(date, format) {
    var that = new Date(date * 1)
    // eslint-disable-next-line no-redeclare
    var date = {
      'M+': that.getMonth() + 1,
      'd+': that.getDate(),
      'h+': that.getHours(),
      'm+': that.getMinutes(),
      's+': that.getSeconds(),
      'q+': Math.floor((that.getMonth() + 3) / 3),
      'S+': that.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (that.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        // eslint-disable-next-line eqeqeq
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      }
    }
    return format
  }
}
