/**
 * 权限控制竞赛画像
 */
 import network from '@@/utils/network'
/**
 * 用来做竞赛画像页面权限控制的用户信息接口
 * @returns 用户信息
 */
 export const userApi=()=>{ 
    return network.get('/usercenter/user')
 }
/**
 * @param {string} accountName 学校用户名
 * @returns 学校信息
 */
 export const dataServiceApi=(accountName)=>{
    return network.get('/web/contract/dataService/getUserContract')
 }