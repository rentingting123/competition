let QRCode = require('qrcode')

module.exports.getQRcode = function(test, opt = {}) {
    return QRCode.toDataURL(test, opt)
}
module.exports.getParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.href);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    /**
     * 获取随机数
     * @param l
     * @param seed
     * @returns {string}
     */
module.exports.randomChar = function(l, seed) {
    var x = seed || "1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM"
    var tmp = ""
    for (var i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
    }
    return tmp
}
module.exports.checkPhone=(val)=>{
    if(!val) return false
    let phonereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ 
    if(!phonereg.test(val)){
        return false
    }
    return true
},
module.exports.checkEmail=(val)=>{
    if(!val) return false
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/ 
    if(!reg.test(val)){
        return false
    }
    return true
}
module.exports.checkPassword=(val)=>{
    let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d$@$!%*#?&]{8,}$/
    return reg.test(val)
}
module.exports.parseTime = function(timestamp, fmt) {
    timestamp && timestamp.toString().length === 10 && (timestamp += '000')
    var d = new Date(+timestamp),
        f = fmt || 'yyyy-MM-dd hh:mm:ss',
        o = {
            "M+": d.getMonth() + 1, //月份
            "d+": d.getDate(), //日
            "h+": d.getHours(), //小时
            "m+": d.getMinutes(), //分
            "s+": d.getSeconds(), //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            "S": d.getMilliseconds() //毫秒
        }
    if (/(y+)/.test(f)) {
        f = f.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(f)) {
            f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return f
}
 console.log(process.env.NODE_ENV, 'cc')
 console.log(COOKIE_SUFFIX)
module.exports.tologin = (serviceUrl=location.href) => {
    let path = serviceUrl.replace(/\//g, '@').replace('#', '$')
    //登录信息
    localStorage.removeItem('login')
        //用户组织id
    localStorage.removeItem('groupId')
        //用户信息
    localStorage.removeItem('userInfo')
    //新手引导信息
    localStorage.removeItem('noviceGuide')
    
    // if(process.env.NODE_ENV == "development") return  location.href = 'http://localhost:8080?service='+ encodeURIComponent(path)
    let url = process.env.NODE_ENV === 'production' ? 'https://login.moocollege.com' : 'http://login.mycloudedu.net'
  
        // location.href = 'https://0.0.0.0:8081?service='+ encodeURIComponent(path);
    location.href = url + '?service=' + encodeURIComponent(path);
}

module.exports.toregister = (flag) => {
    let url = process.env.NODE_ENV === 'production' ? 'https://login.moocollege.com' : 'http://login.mycloudedu.net'
    if(flag){
        location.href = url + '/register?type=mechanism&service=' + encodeURIComponent(location.host)
    }else{
        location.href = url + '/register?service=' + encodeURIComponent(location.host)
    }
}



//去除html标签
module.exports.removeHtmlTag = (str, n) => {
        if (!str) {
            return str
        }
        var ch_str = str.replace(/<\/?[^>]*>/g, '')
        var _ch_str = ch_str.replace(/&nbsp;/g, '')
        if (_ch_str.length > n) {
            return _ch_str.substr(0, n) + '…'
        }
        return _ch_str
    }
    /**
     * 替换图片为文字
     * @param str
     * @param REPLACE 默认为"[图片]"
     * @returns {*}
     */
module.exports.replaceImage = (str, REPLACE) => {
    REPLACE = REPLACE || '[图片]'
    return str.replace(/<img(.*?)>/igm, REPLACE)
}

module.exports.downloadFile = (content, fileName) => { //下载base64图片
    var base64ToBlob = function(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
            type: contentType
        });
    };
    let aLink = document.createElement('a');
    let blob = base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
}

/**
 * 计算字符串长度 英文特殊符号占1个字符 中文占2个字符
 * @param string
 * @returns {number}
 */
module.exports.strLength = function (string) {
    var len = 0;
    for (var i = 0; i < string.length; i++) {
      var c = string.charCodeAt(i);
      //单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      }
      else {
        len += 2;
      }
    }
    return len / 2;
  }

/**
 * 导出图片
 * @param element 需要转换的dom
 * @param fileName 导出图片名
 * @returns {img}
 */
 module.exports.saveDivImg = function (element, fileName) {
    if (!element) {
        throw new 'element is empty.'
    }
    var picInfo= element.getDataURL({
        type: 'png',
        pixelRatio: 1.5,
        backgroundColor: '#fff'
    });
    const elink = document.createElement('a');
    elink.download = (fileName ? fileName : '导出图片') + Date.parse (new Date());
    elink.style.display = 'none';
    elink.href = picInfo;
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink)
  }


//url
module.exports.loadJs = function(src) {
    return new Promise((resolve,reject)=>{
      let script = document.createElement('script')
      script.type = "text/javascript"
      script.onload = ()=>{
        resolve()
      }
      script.onerror = ()=>{
        reject()
      }
      script.src= src
      document.getElementsByTagName('body')[0].appendChild(script)
    })
  }
  