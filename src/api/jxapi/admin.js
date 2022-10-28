import network from '@@/utils/network'


export default {
    // 黄昭 消息列表未读messageLabelOld/getTaskList
    getUserMessage: params => (network.get(`web/messageLabelOld/getUserMessage`, params)),
     // 黄昭 获取消息列表
     getUserMessage: params => (network.get(`web/messageLabelOld/getUserMessage`, params)),
    // 黄昭 批量开票
    auditGroupInvoiceList: params => (network.post(`web/pay/auditGroupInvoiceList`, params)),
    // 保存竞赛 /competition/directCreateNewCompetition
    directCreateNewCompetition: params => (network.post(`web/competition/directCreateNewCompetition`, params)),
    // 黄昭 根据竞赛id获取竞赛的所有参赛类型
    getCompetitionType: params => (network.get(`web/huaCan/resourcePool/getCompetitionType`, params)),
    // 黄昭 获取所有用户 messageLabel/getAllUserList
    getAllUserList: params => (network.get(`web/messageLabelOld/getAllUserList`, params)),
    // 黄昭 获取留言列表
    messageList: params => (network.get(`web/huaCan/resourcePool/messageList`, params)),
    // 黄昭 消息管理新增标签  messageLabel/addMessageLabel
    addMessageLabel: params => (network.post(`web/messageLabelOld/addMessageLabel`, params)),
    // 黄昭 获取标签列表 messageLabel/getMessageLabelList
    getMessageLabelList: params => (network.get(`web/messageLabelOld/getMessageLabelList`, params)),
    // 黄昭 获取标签详情 /messageLabel/getMessageLabelDetail
    getMessageLabelDetail: params => (network.get(`web/messageLabelOld/getMessageLabelDetail`, params)),
    // 黄昭 修改标签 messageLabel/updateMessageLabel
    updateMessageLabel: params => (network.post(`web/messageLabelOld/updateMessageLabel`, params)),
    // 站内信息列表 messageLabel/getTaskList
    getTaskList: params => (network.get(`web/messageLabelOld/getTaskList`, params)),
    // 黄昭 删除标签 messageLabel/deleteMessageLabel
    deleteMessageLabel: params => (network.post(`web/messageLabelOld/deleteMessageLabel`, params)),
    // 黄昭 新增站内信息 /messageLabel/addTask
    addTask: params => (network.post(`web/messageLabelOld/addTask`, params)),
    // 黄 获取用户列表 messageLabel/getUserList
    getUserList: params => (network.get(`web/messageLabelOld/getUserList`, params)),
    // 黄昭 获取历届作品时间
    getYearListForHuaCan: params => (network.get(`web/huaCan/resourcePool/getYearListForHuaCan`, params)),
    // 马文杰下载作品  
    downloadWork1: params => (network.get(`web/work/downloadWork/${params.data.workIds}`, params)),
    // 马文杰修改作品是否允许对外下载
    changeWorkOpenDownloadStatus: params => (network.put('web/work/changeWorkOpenDownloadStatus', params)),
    // 马文杰 修改作品置顶状态
    changeWorkTopStatus: params => (network.put('web/work/changeWorkTopStatus', params)),
    getpersonalCompetition: params => (network.get(`web/competition/personCompetition`, params)),
    // 马文杰 参赛状态
    getAllAward: params => (network.get(`web/award/getAllAward`, params)),
    // 马文杰  作品管理查询接口
    listResourcePool: params => (network.get(`web/work/listWork`, params)),
    //   马文杰修改竞赛新闻每一条是否显示
    changeNewsStatus: params => (network.put('web/competition/news/changeNewsStatus', params)),
    // 获取当前用的竞赛web/competition/personCompetition
    getpersonalCompetition: params => (network.get(`web/competition/personCompetition`, params)),
    // 马文杰  修改竞赛新闻总显示设置
    changeCompetitionNewsShowStatus: params => (network.put('web/competition/changeCompetitionNewsShowStatus', params)),
    //查询下级组织
    queryDowmGroup: params => (network.get(`usercenter/group/queryDowmCompetitionGroup`, params)),
    //根据选取的下级组织id  
    queryCompetitionYears: params => (network.get(`web/competition/queryCompetitionYears`, params)),
    // 根据选取的组织id和年份查询主竞赛/?groupId=13198&competitionYear=2020
    queryCompetitionByGroupId: params => (network.get(`web/competition/queryCompetitionByGroupId`, params)),

    // 获取管理员审核列表
    selectSchoolCompetitionAudit: params => (network.get(`web/selectSchoolCompetitionAudit`, params)),
    // 获取管理员审核列表审核
    updateApplyFor: params => (network.get(`web/schoolCompetition/updateApplyFor`, params)),

    // lists
    // 是否创建过竞赛
    havaCompetition: params => (network.get(`web/competition/havaCompetition`, params)),
    // 查询竞赛列表
    queryCompetitionList: params => (network.get(`web/competition/queryCompetitionList`, params)),
    // 隐私设置
    updateCompetitionPrivate: params => (network.post(`web/competition/updateCompetitionPrivate`, params)),
    // 创建竞赛
    saveNewCompetition: params => (network.post(`web/competition/saveNewCompetition`, params)),
    // 再次竞赛
    copyNewCompetition: params => (network.get(`web/competition/copyCompetition`, params)),
    // 复制其他竞赛
    copyCompetitionByCid: params => (network.get(`web/competition/copyCompetitionByCid`, params)),

    // 获取操作日志
    queryLogList: params => (network.get(`web/competition/queryLogList`, params)),
    // 获取团队操作日志
    queryGroupLogList: params => (network.get(`web/competition/queryGroupLogList`, params)),


    // 查看专家
    selectUser: params => (network.get(`usercenter/specialist/selectUser`, params)),
    // 导出专家信息
    exportSpecialist: params => (network.get(`usercenter/specialist/exportSpecialist`, params)),
    //导出作品汇总
    expertWorkPool: params => (network.get(`web/exportPoollist`, params)),


    // 查询报名表
    queryUploadLog: params => (network.get(`web/signup/queryUploadLog`, params)),
    // 上传报名表
    uploadlogfile: params => (network.post(`web/signup/uploadlogfile`, params)),
    // 下载报名表
    downloadSignUpFile: params => (network.get(`web/signup/downloadSignUpFile`, params)),
    // 是否能够上传报名表
    checkUploadFile: params => (network.get(`web/signup/checkUploadFile`, params)),





}