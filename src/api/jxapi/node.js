import network from '@@/utils/network'

export default {
    // 创建采集
    getForrankSubmit:params=>(network.node('nodeforrank/form/submit',params)),
    // 获取创建采集列表
    getForrankList:params=>(network.node('nodeforrank/form/list',params)),
    // 获取创建采集表单
    getForrankGet:params=>(network.node('nodeforrank/form/get',params)),
    // 保存采集信息
    getForrankApply:params=>(network.node('nodeforrank/form/apply',params)),

    // 竞赛基础设置
    npsetSkin:params =>(network.node(`nodeforrank/website/setSkin`,params)),
    // 获取基础设置
    npgetSkin:params =>(network.node(`nodeforrank/website/getSkin`,params)),

    // 保存
    setSchoolApply:params =>(network.node(`school/apply/set`,params)),
    getSchoolApply:params =>(network.node(`school/apply/get`,params)),

    //添加域名指向
    addDomain:params=>(network.node(`domain/add`,params)),
    //查询域名指向
    getDomain:params=>(network.node(`domain/get`,params)),
    //修改域名指向
    setDomain:params=>(network.node(`domain/set`,params)),
    getSkinList:params=>(network.node(`skin/list/get`,params)),

    // 发送短信
    sendSmsCodenode:params =>(network.node(`get/register/sms`,params)),
    // 通过ticket获取token
    getTokenbyticket: params =>(network.node(`sso/login/info`,params)),
    //获取操作手册视频
    getVideoByUserType: params =>(network.node('videoOperate/list',params))

}
