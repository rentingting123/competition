import network from '@@/utils/network'

export default {
    // 证书部分
    // 获取证书模板
    getCert: async function (params) { return network.get('/web/certificate/listCompetitionTemplate', params) },
    geCertdetail: async function (params) { return network.get('web/competition/certificate/get', params) },
    // 设置证书模板
    setCert: async function (params) { return network.post('/web/competition/certificate/setting', params) },
    // 获取荣誉证书
    getHorbers: async function (params) { return network.get('/web/user/horbers/list', params) },
    // 后台生成下载的证书
    createCore: async function (params) { return network.get('/web/certificate/createByCompetitionId', params) },
    // 下载证书
    downloadCore: async function (params) { return network.get('/web/downLoadZip/certificateByCompetitionId', params) },
    // 下载个人证书
    downloadPic: async function (params) { return network.get('/web/downLoad/fileByUrl', params) },

    // 证书接口
    // 获取设置证书列表
    getCertSetList: params =>(network.get(`web/certificate/setList`,params)),
    // 获取生成证书列表
    getCertGenerationList: params =>(network.get(`web/certificate/completeList`,params)),
    // 获取生成证书的查看列表
    getCertGenerationlook: params =>(network.get(`web/certificate/list`,params)),
    // 获取生成证书的查看列表
    getSignUpStatus: params =>(network.get(`web/competition/signUpStatus`,params)),
    getGroupTeamId: params =>(network.get(`web/competition/getGroupTeamId`,params)),


    // 获取主办方竞赛年份
    getCompetitionYears: params =>(network.get('web/certificate/competitionYears',params)),
    // 获取主办方证书列表
    getCompetitionList: params =>(network.get('web/certificate/competitionList',params)),
    // 提交上级审核接口
    setApplyForAudit: params =>(network.post('web/certificate/applyForAudit',params)),
    // 查看上级审核详情
    selectApplyForInfo: params =>(network.get('web/certificate/selectApplyForInfo',params)),
    // 查看上级组织
    queryUpGroup: params =>(network.get('usercenter/group/queryUpGroup',params)),
    // 查询是否能够提交上级
    selectAuditPermission: params =>(network.get('web/certificate/selectAuditPermission',params)),
    

    // 证书查询 web/getCertificate
    getCertificate: params =>(network.get('web/getCertificate', params)),
    // 邮寄证书保存
    applyCertificate: params =>(network.post('web/applyCertificate', params)),
    // 邮寄证书查询
    selectApplyCertificate: params =>(network.get('web/selectApplyCertificate', params)),
    
    
}