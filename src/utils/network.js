import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isEmpty, getTokenHeader } from '@@/utils/commons'
import network from '@@/api/jxapi/personalCenterApi'
import { MessageBox, Message } from 'element-ui'
import { tologin } from '@@/utils/util'
import { setToken, setReflashToken, removeToken, removeReflashToken } from '@@/utils/oauth'
import i18n from './../i18n'
let timer = '', //弹框的定时器
  messTimer = '', //提示框的定时器
  waitingTime = 100 //定时器时间
  ,
  JavaApi = 'api/',
  requestPool = [] //请求失效池
  ,
  isReflash = false //正在刷新token

function addRequestPool(opt) {
  return new Promise((resovle, reject) => {
    requestPool.push(() => {
      fetch(opt).then(resovle)
    })
  })
}

// //axios 请求拦截 以及取消
let pending = new Map()
const addPending = (config) => {
  const url = [
    config.url,
    config.method,
  ].join('&')
  //添加请求到pendingmap
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) {
      pending.set(url, cancel)
    }
  })
}

const removePending = config => {
  const url = [config.url, config.method].join('&')
  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

function handleRequest(c,config) {
  //需要被截断的 传参pipe：true
  // console.log("check:",config)
  if (config.pipe) {
    removePending(c) // 在请求开始前，对之前的请求做检查取消操作
    addPending(c) // 将当前请求添加到 pending 中
  }
  for (let key in config) {
    c[key] = config[key]
  }
  return c
}

function handleResponse(response, options) {
  removePending(options?.config || {})
  function loginOut() {
    console.log('loginOut')
    removeToken()
    removeReflashToken()
    localStorage.removeItem('groupId')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('noviceGuide')
    //如果是统一登录页面就不需要再做跳转
    if (window.location.host.indexOf('login') > -1 || window.location.hash == '#/') return;
    MessageBox.confirm(`Token 失效，请重新登录`, '登录异常', {
      confirmButtonText: '重新登录',
      cancelButtonText: '关闭',
      callback: action => {
        if (action != 'confirm') return
        let str = location.hash
        if (str.includes('#/adminLogin') || str.includes('#/admin/workshow')) {
          location.href = window.location.href
        } else {
          tologin();
        }
      }
    })
  }
  if (!response) {
    Message({ showClose: true, message: i18n.t('error.e501') })
  } else if (response.status === 200) {
    const contentType = response.headers['content-type']
    if (response.data.code == 401) {
      if (!isReflash) {
        network.reflashToken().then(res => {
          if (res == 'error') return Promise.reject('error')
          setToken(res.access_token);
          setReflashToken(res.refresh_token)
          return isReflash = false
        }).catch(err => {
          console.log('err', err)
          loginOut()
          requestPool = []
        }).finally(() => {
          console.log('finally')
          isReflash = false
          while (requestPool.length > 0) {
            requestPool.shift()()
          }
        })
        isReflash = true
      }
      return addRequestPool(options)

    }

    if (contentType && contentType.indexOf('json') !== -1) {
      if (response.config && (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer')) {
        var enc = new TextDecoder('utf-8')
        response.data = JSON.parse(enc.decode(new Uint8Array(response.data)))
      }
    } else if (response.config && (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer')) {
      const blob = new Blob([response.data])
      const downloadElement = document.createElement('a')
      //const href = window.URL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
      const href = window.URL.createObjectURL(blob)
      const dis = response.headers['content-disposition']
      const filenameKey = 'filename='
      const indexOf = dis.indexOf(filenameKey)
      const filename = indexOf ? decodeURI(dis.substring(indexOf + filenameKey.length)) : '未知文件名'
      downloadElement.href = href
      downloadElement.download = decodeURIComponent(escape(filename))
      //downloadElement.download = filename
      document.body.appendChild(downloadElement)
      downloadElement.click()
      //if (window.URL) {
      window.URL.revokeObjectURL(href)
      //} else {
      //  window.webkitURL.revokeObjectURL(href)
      //}
      document.body.removeChild(downloadElement)
      response.data = { code: 0, data: '', message: '下载中' }
    }
  } else if (response.status > 400) {
    if (!options.noError) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        MessageBox.alert(`异常编号：${response.status}，异常信息：${response.statusText}`, i18n.t('error.e500'))
      }, waitingTime)
    }
  }
  return response
}

const fetch = (options) => {
  let {
    method = 'get',
    data={},
    url,
    config = {},
    headers,
    urlData,
  } = options

  if (isReflash) return addRequestPool(options)

  const _headers = getTokenHeader(config.NOauth)
  for (let el in headers) {
    _headers[el] = headers[el]
  }
  if (options.form) {
    data = qs.stringify(data)
    _headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  const instance = axios.create({
    baseURL: '/',
    headers: _headers
  })

  instance.interceptors.request.use(c=>handleRequest(c,config), err => {
    return Promise.reject(err)
  })

  instance.interceptors.response.use(response => {
    return handleResponse(response, options)
  }, err => {
    handleResponse(err.response, options)
    return Promise.reject(err)
  })

  switch (method.toLowerCase()) {
    case 'get':
      return instance.get(`${url}${!isEmpty(data) ? `?${qs.stringify(data)}` : ''}`, config)
    case 'delete':
      return instance.delete(url, { data })
    case 'head':
      return instance.head(url, data)
    case 'post':
      return instance.post(`${url}${!isEmpty(urlData) ? `?${qs.stringify(urlData)}` : ''}`, data)
    case 'put':
      return instance.put(url, data)
    case 'patch':
      return instance.patch(url, data)
    default:
      return instance(options)
  }
}

function createFetch(options) {
  NProgress.start()
  options.url = options.url.indexOf(JavaApi) == -1 ? JavaApi + options.url : options.url
  return fetch(options).then((response) => {
    let data = response.data
    NProgress.done();
    if (data.code == 0) {
      let _data
      if (typeof data.data == 'string') {
        try {
          _data = JSON.parse(data.data)
        }
        catch (err) {
          _data = data.data
        }
      } else {
        _data = data.data
      }

      return _data
    } else {
      if (data.code == 401) data.message = i18n.t('error.e401')
      throw data
    }
  }).catch((error) => {
    NProgress.done();
    //if(error.message.indexOf('成功')>-1){}
    clearTimeout(messTimer);
    messTimer = setTimeout(() => {
      options.noError || error.code == i18n.t('error.e401') ? " " : Message({ showClose: true, message: error.message })
    }, waitingTime)

    return 'error'
  })
}

function createNodeFetch(options) {
  NProgress.start()
  return fetch(options).then((response) => {
    let data = response.data
    NProgress.done();
    if (data.code == 20000) {
      return data.data
    } else {

      if (data.code == 401) data.message = i18n.t('error.e401')
      throw new Error(data.message)
    }
  }).catch((error) => {
    NProgress.done();
    //if(error.message.indexOf('成功')>-1){}

    options.noError || error.message == i18n.t('error.e401') ? " " : Message({ showClose: true, message: error.message || 'qq1923594101' })

    return 'error'
  })
}

export default {
  post: (url, o = {}) => { o.method = 'post'; o.url = url; return createFetch(o) },
  put: (url, o = {}) => { o.method = 'put'; o.url = url; return createFetch(o) },
  get: (url, o = {}) => { o.method = 'get'; o.url = url; return createFetch(o) },
  form: (url, o = {}) => { o.method = 'post'; o.form = true; o.url = url; return createFetch(o) },
  node: (url, o = {}) => { o.method = 'post'; o.url = 'nodeapi/' + url; return createNodeFetch(o) },
  expertExcel: (method, o = {}) => { o.method = method; o.url = o.url; return createFetch(o) },
  exportGet:(url,o={})=>{
    o.method = 'get'; 
    o.url = url;
    if(o.config) o.config.responseType='arraybuffer'
    else o.config={responseType: "arraybuffer"}
    return createFetch(o)
  }
}