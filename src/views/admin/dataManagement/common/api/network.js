// import {
//     Message,
//     MessageBox
// } from 'element-ui'
import { Message } from 'element-ui';
let webapi = require('./webapi')
// 网络状态错误
function netstatus(err) {
  var str = ''
  switch (err.request.status) {
    case 400:
        str = '请求错误'
        break

    case 401:
        str = '未授权，请登录'
        break

    case 403:
        str = '拒绝访问'
        break

    case 404:
        str = `请求地址出错: ${err.response.config.url}`
        break

    case 408:
        str = '请求超时'
        break

    case 500:
        str = '服务器内部错误'
        break

    case 501:
        str = '服务未实现'
        break

    case 502:
        str = '网关错误'
        break

    case 503:
        str = '服务不可用'
        break

    case 504:
        str = '网关超时'
        break

    case 505:
        str = 'HTTP版本不受支持'
        break
  }
    if (str) {
        Message.warning(str)
        // iView.message.warning(str)
        if(err.request.status==401){
            setTimeout(()=>{
                window.localStorage.clear()
                window.location.href = '/login'
            },1500)
        }
        return
    }
}
// 接口返回来的状态
function ApiCode(res) {
    if (res.code == 401) {
        Message.warning("token失效,请重新登录!")
            window.localStorage.clear()
            window.location.href = '/login'
    }else{
        Message.warning(res.message)
    }
    return
}
//验证
function reg(e) {
    var str = ""
    var v = /^[0-9]\.[0-9]\.[0-9]{3}$/
    if(e=="v"){
        str = v
    }
    return str
}
// 接口返回code状态
export default {
    getCode: function(err) {
        return netstatus(err)
    },
    getApiCode: function(res) {
    return ApiCode(res)
    }
}
