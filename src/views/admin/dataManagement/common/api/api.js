let axios=require('axios');
let qs=require('qs');

import networkcode from './network'
import webapi from './webapi'
let unwantedL = localStorage.getItem('unwanted')
let unwantedS = sessionStorage.getItem("unwanted")
if(unwantedS||unwantedL){

}else{
    if(localStorage.getItem('userInfo')){
        axios.defaults.headers.common['Authorization'] = "Bearer "+ (unwantedS?'':unwantedL?'':webapi.getlocal("login"))
    }else{

    }

}

axios.defaults.timeout = 600000;

let root='';
let rootUrl=''
if(process.env.NODE_ENV == 'production'){
    root=''
    rootUrl="http://cc.moocollege.com"
}else if(process.env.NODE_ENV == 'testing'){
    root='/users'
    rootUrl="http://127.0.0.1:8081"
}else{
    root='/users'
    rootUrl="http://192.168.100.254"
}

function Axios(method,url,params){
    var urls=""
    if(process.env.NODE_ENV == 'production'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls=url
    }else{
        urls=url
    }
     return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            // data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
            // baseURL:root,
            // withCredentials: true
        })
        .then(function(res){
            if (res.status==200) {
                if(res.data.code==0 || res.data.code==20000 ){
                    resolve(res.data.data)
                }else if(res.data.code==200){
                    resolve(res.data)

                }else {
                    reject(res.data)
                    networkcode.getApiCode(res.data)
                }

            }else {
                networkcode.getCode(res)
            }
        })
        .catch(function (err) {
    		console.log(err)
    		let res = err.response
    		if (err) {
    			networkcode.getCode(err)
    			return
    		}
        })
    })
}
function exportAxios(method,url,params){
    var urls=""
    if(process.env.NODE_ENV == 'production'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls=url
    }else{
        urls=url
    }
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            // data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
            // baseURL:root,
            // withCredentials: true
            responseType:'arraybuffer'
        })
        .then(function(res){
            if (res.status==200) {
                const blob = new Blob([res.data])
                const downloadElement = document.createElement('a')
                //const href = window.URL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
                const href = window.URL.createObjectURL(blob)
                const dis = res.headers['content-disposition']||""
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
                resolve(res.data)
                // if (res.data.code==200) {
                //     resolve(res.data.data)
                // }else{
                //     netcode.getApiCode(res.data)
                // }
            }else {
                networkcode.getApiCode(res.message)
            }
        })
        .catch(function (err) {
            let res = err.response
            console.log(err)
    		if (err) {
                if(res)networkcode.getCode(err)
    			return
    		}
        })
    })
}
// 获取验证码
function smsAxios(method,url,params,deviceId){
    var urls=""
    if(process.env.NODE_ENV == 'production'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls=url
    }else{
        urls=url
    }
    // var urls=process.env.NODE_ENV == 'production' ? url : '/users' + url
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            // data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
            headers: {
                deviceId: deviceId,
            }
        })
        .then(function(res){
            if (res.status==200) {
                resolve(res.data)
            }else {
                networkcode.getApiCode(res.message)
            }
        })
        .catch(function (err) {
    		let res = err.response
    		if (err) {
    			networkcode.getCode(err)
    			return
    		}
        })
    })
}
// user
function userAxios(method,url,params){
    var urls=""
    if(process.env.NODE_ENV == 'production'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls=url
    }else{
        urls=url
    }
    // var urls=process.env.NODE_ENV == 'production' ? url : '/users' + url
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            // data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
        })
        .then(function(res){
            if (res.status==200) {
                resolve(res.data)
            }else {
                networkcode.getApiCode(res.message)
            }
        })
        .catch(function (err) {
    		let res = err.response
    		if (err) {
    			networkcode.getCode(err)
    			return
    		}
        })
    })
}


export default {
    get: function (url, params) {
		return Axios('GET', url, params)
	},
	post: function (url, params) {
		return Axios('POST', url, params)
	},
	exportPost: function (url, params) {
		return exportAxios('POST', url, params)
	},
	exportGet: function (url, params) {
		return exportAxios('GET', url, params)
	},
	smsGet: function (url, params,deviceId) {
		return smsAxios('GET', url, params,deviceId)
	},
	smsPost: function (url, params,deviceId) {
		return smsAxios('POST', url, params,deviceId)
	},
	userGet: function (url, params) {
		return userAxios('GET', url, params)
	},
	userPost: function (url, params) {
		return userAxios('POST', url, params)
	},
	put: function (url, params) {
		return Axios('PUT', url, params)
	},
	delete: function (url, params) {
		return Axios('DELETE', url, params)
	},
    root:root,
    rootUrl:rootUrl,
}
