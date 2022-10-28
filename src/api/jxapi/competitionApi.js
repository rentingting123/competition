import network from '@@/utils/network'


export default{
    getChild:function(params){return network.get(`web/competition/child/${params.competitionId}`)},
    saveChild:function(params){return network.post('web/competition/saveChilds',params)},
    signup:function(params){return network.post('web/competition/signup/join',params)},
    getNorm:function(params){return network.get('web/competition/searchNormName',params)},
    getContorlTab:function(params){return network.get(`web/competition/${params.id}/tab/control`,params)},
    getJudgeStatus:params=>(network.get(`web/competition/judge/${params.id}`)),
    getBtn:params=>(network.get(`web/competition/btn/${params.id}`)),
    getCompetitionDetail:params=>(network.get(`web/competition/detail/${params.id}`)),
    addSignup:params=>(network.post('web/competition/signUp',params)),
    signUpGroupApi:params=>(network.post('web/competition/signup/group',params)),
    signUpPersonal : params =>( network.post('web/competition/signup/personal',params)),
    getSingleMember: params => (network.get('web/competition/member',params)),
    groupInfo:params=>(network.get('web/competition/group',params)),
    groupChildInfo:params=>(network.get('web/competition/childsCompetition',params)),
    findLineCompetition:params=>(network.get(`web/competition/list/line/${params.id}`)),
    groupInfoApi:params => (network.get(`web/competition/groupInfo/${params.id}`)),
    updateGroupRole:params => (network.post('web/competition/updateGroupRole',params)),
    outGroup:params =>(network.post('web/competition/outGroup',params)),
    addMember:params =>(network.post('web/competition/addMember',params)),
    passMember:params =>(network.post('web/competition/passGroup',params)),
    delGroup:params =>(network.post('web/competition/delGroup',params)),
    // 获取作品展示列表
    getPoolQuery:params =>(network.get('web/resource/pool/query',params)),
    // 删除作品
    delPool:params => (network.get(`web/resource/pool/delete`,params)),
    // 作品点赞
    getPoolThumb:params => (network.post(`web/resource/pool/thumb/${params.id}`)),
    // 获取动态 
    getNewsList:params =>(network.get(`web/competition/news`,params)), 
    //首页新闻
    getNewsListFirst:params =>(network.get(`web/competition/first/news`,params)), 
    // 新版首页新闻
    getFirstNews:params =>(network.get(`web/competition/firstNews`,params)), 
    saveNews:params=>(network.post(`web/competition/news/save`,params)),
    // 获取动态详情
    getNewsDetail:params =>(network.get(`web/competition/news/detail`,params)),
    // 获取新闻的上级组织
    selectUpGroup:params =>(network.get(`usercenter/group/selectUpGroup`,params)),
    // 审核下级新闻
    auditSkinNews:params =>(network.post(`web/competition/auditSkinNews`,params)),
    //获取已交材料
    getSubmitedMateralData:params=>(network.get('web/resource/pool/selectMaterial',params)),
    //提交材料
    setMateralData:params =>(network.post('web/resource/pool/saveMaterial',params)),
    //删除提交的材料
    delMateralData:params =>(network.get('web/resource/pool/delete',params)),
    // 获取竞赛首页标签
    getProfessionTagsApi:params =>(network.get(`api/competition/getProfessionTagsApi`,params)),
    // 获取竞赛首页的竞赛
    getHomeApi:params =>(network.get(`api/competition/getHomeApi`,params)),
    // 首页竞赛列表
    getIndexCompetition:params =>(network.post(`web/competition/listCompetitionBySort`,params)),
    //getIndexCompetition:params =>(network.get(`web/doc/competition/group`)),
    getIndexTags:params =>(network.post(`web/competition/listTagRank`,params)),

    getWorkRuleByCompetitionIdApi:params =>(network.get(`web/resource/pool/rule`,params)),
    // 获取是否传过作品
    getWorkRuleByCompetitionIdApi2:params =>(network.post(`web/resource/pool/queryDetail`,params)),

    // setWorkRuleByCompetitionIdApi:params =>(network.post(`web/resource/pool/rule/save`,params)),

    getWorkRuleByCompetitionId:params =>(network.get(`web/resource/pool/${params.id}`,params)),
    getWorkRuleApiCopy:params =>(network.get(`/web/resource/pool/ruleV2`,params)),
    getWorkRuleApi:params =>(network.get(`/web/resource/pool/ruleV2/${params.id}`)),
    saveWorkApi:params => (network.post(`web/resource/pool/save`,params)),
    getCommentList:params => (network.get(`web/resource/pool/${params.id}/comment`)),
    getTeamList:params => (network.get(`web/resource/pool/${params.id}/team`)),
    listSignup:params => (network.post('web/resource/pool/competition/signup',params)),
    // 根据身份不同获取学校，队伍，人数等数据信息
    getCompetitionGroupNum:params => (network.get('web/competition/getGroupNum',params)),
   
    //获取日程设置
    getSchedule:params =>(network.get(`web/competition/getTimes`,params)),
    // 保存日程设置
    saveSchedule:params =>(network.post(`web/competition/saveTimes`,params)),
    // 删除日程设置赛项
    delSchedule:params =>(network.post(`web/competition/delTimes`,params)),
    //获取评审设置
    getReviewRule:params =>(network.get(`web/review/rule/get/${params.competitionId}`,params)),
    getReviewRuleCopy:params =>(network.get(`web/review/rule/get`,params)),
    // 获取评审信息（匿名）
    getReviewExpertList:params =>(network.post(`web/review/expert/list`,params)), 
    // 保存评审设置
    saveReviewRule:params =>(network.post(`web/review/rule/save`,params)),
    saveReviewRuleCopy:params =>(network.post(`web/review/rule/save`,params)),
    getpoolGetSetting:params =>(network.get(`web/competition/pool/getSetting`,params)),
    setpoolGetSetting:params =>(network.post(`web/competition/pool/setting`,params)),
    getPoolGetPool:params =>(network.get(`web/review/rule/getPool`,params)),
    getCompetitionChildList:params =>(network.post(`web/competition/listSignupCompetition`,params)),
    getSignupCompetition:params =>(network.post(`web/competition/getSignupCompetition`,params)),
    getTimesLists:params =>(network.get(`web/competition/timeline`,params)),
    // 查询支付详情
    getPayDetail:params =>(network.get(`web/pay/queryRule`,params)),
    // 支付
    teamPay:params =>(network.post(`web/pay/pay`,params)),
    // 点击线下付款  查询团队支付信息
    queryGroupPay:params =>(network.get(`web/pay/queryGroupPay`,params)),
    // 财物管理中线下付款
    queryOfflineStatus:params =>(network.get(`web/pay/queryOfflineStatus`,params)),
    // 团队线下支付提交 
    saveGroupPay:params =>(network.post(`web/pay/saveGroupPay`,params)),
    // 审核开票
    auditGroupInvoice:params =>(network.post(`web/pay/auditGroupInvoice`,params)),
    // 审核支付
    auditGroupPay:params =>(network.post(`web/pay/auditGroupPay`,params)),
    // 重置支付和发票
    resetpayStatus:params =>(network.get(`web/pay/resetStatus`,params)),
    // 线上支付退款
    payrRefund:params =>(network.get(`web/pay/payrRefund`,params)),
    // 设置发票信息
    setIovice:params =>(network.post(`web/pay/applyInvoice`,params)),
    // 获取发票信息
    getIovice:params =>(network.get(`web/pay/queryInvoice`,params)),
    // 获取参赛指南
    getCompetitionInfos:params =>(network.get(`web/competition/competitionInfos`,params)),
    // 保存参赛指南
    saveCompetitionInfos:params =>(network.post(`web/competition/saveIntro`,params)),
    saveInfoApi:params =>(network.post(`web/competition/saveOrg`,params)),
    // 获取竞赛详情的已预约酒店
    getOrderHotel:params =>(network.get(`api/competition/getOrderHotel`,params)),
    // 创建竞赛  保存竞赛/子竞赛
    produceTableApi:params =>(network.post(`api/competition/getProfessionTagsApi`,params)),

    reviewApi:params =>(network.get(`web/doc/competition/review`,params)),
    getMemberInfo:params =>(network.get(`web/competition/member/info`,params)),
    getScheduleApi:params =>(network.get(`api/competition/getSchedule`,params)),
    saveRankApi:params =>(network.get(`api/competition/getRank`,params)),
    getRankApi:params =>(network.post(`api/competition/saveRank`,params)),

    downloadGroupApplyFile:params =>(network.get(`web/doc/competition/group`,params)),
    downloadUserApplyFile:params =>(network.get(`web/doc/competition/member`,params)),
    applyInTeamApi:params =>(network.post(`web/competition/apply/group/${params.id}`,params)),
    // 获取竞赛设置
    getCompetitionSetApi:params =>(network.get(`api/competition/getCompetitionSetApi`,params)),
    // 保存竞赛设置
    saveCompetitionSetApi:params =>(network.post(`web/competition/saveInfo`,params)),
    // 删除报名表
    delExtraSetting:params =>(network.get(`api/web/api/competition/delExtraSetting`,params)),
    // 保存酒店设置
    saveHotelApi:params =>(network.post(`web/competition/saveHotel`,params)),
    // 获取酒店信息
    getHotelApi:params =>(network.get(`web/competition/getBookHotelInfo/${params.competitionId}`,params)),
    // 发布竞赛
    competitionPublish:params =>(network.post(`web/competition/publish/${params.data.competitionId}`,params)),
    deleteCompetition:params =>(network.post(`web/deleteCompetition/${params.competitionId}`,params)),
    // 获取导入的数据列表
    getImportResultList:params =>(network.post(`web/report/selectExcelImport`,params)),
    docCompetitionSettingDone:params =>(network.post(`web/doc/competition/setting/done`,params)),
    competitionSaveAwards:params =>(network.post(`web/competition/saveAwards`,params)),
    // 保存竞赛，获取id
    addCompetitionId:params =>(network.post(`api/web/competition/save`,params)),
    // 获取专家列表
    specialistCompetitionJob:params =>(network.get(`web/specialist/competition/job`,params)),
    specialistCompetitionUsers:params =>(network.get(`web/specialist/competition/users`,params)),
    //新增标签
    competitionTabInfo:params =>(network.post(`web/competition/tab/info`,params)),


    // 获取竞赛设置中的投票设置
    getWorksVote:params =>(network.get(`web/vote/getInfo`,params)),
    // 修改竞赛设置中的投票设置
    setWorksVote:params =>(network.post(`web/vote/saveInfo`,params)),
    // 发起投票
    sendWorksVote:params =>(network.get(`web/vote/pool`,params)),
    // 投票权限
    authWorksVote:params =>(network.get(`web/vote/auth`,params)),


    // 审核作品 1通过 2驳回
    poolCheck:params =>(network.post(`web/competition/pool/check`,params)),
    // 获取报名是否需要验证报名须知
    getAgreementAuth:params =>(network.get(`web/agreement/auth`,params)),
    // 设置为已同意报名须知
    setAgreement:params =>(network.get(`web/user/agreement`,params)),

    //添加团队批注
    setTeamOpinion:params=>network.get('web/competition/opinion/team',params),


    // 作品分组提交
    updatePoolSortStatus:params=>network.get('api/review/resource/updatePoolSortStatus',params),
    
    // 保存新增页面内容
    saveTabInfo:params=>network.post('web/competition/saveTabInfo',params),
    getTabInfo:params=>network.get('web/competition/tab/info',params),
    
    
    // 报名管理获取团队信息
    usercenterGroupInfo:params=>network.get('usercenter/groupInfo',params),
    
    // 申请试用
    sendApply:params=>network.post('usercenter/apply/applyTrial',params),
    ApplyCheck:params=>network.get('usercenter/apply/selectSchoolCompetition',params),
    // 获取新首页数量
    getNumbers:params=>network.get('web/competition/selectInfo',params),
    
    
    // 选择导出
    expertExcelGet:params=>network.expertExcel('get', params),
    expertExcelPost:params=>network.expertExcel('post', params),
    // 查询要导出的字段
    getExportFields:params=>network.get('web/report/exportFields',params),



    // 20210223 首页接口
    // 查询省份以及省份皮肤
    getProvinceInfo:params=>network.get('data/dataCenter/provinceInfo',params),
    // 模糊搜索竞赛
    selectCompetitions:params=>network.get('web/selectCompetitions',params),
    // 黄昭竞赛搜索
    selecthuangCompetitions:params=>network.get('web/user/selectCompetitionsInValid',params),
    // 黄昭 我的团队，我被邀请的获取
    getMyBeInvited:params=>network.get('web/user/getMyBeInvited',params),
    // 黄昭 我申请的
    getMyApply: params => (network.put('web/user/getMyApply', params)),
    // 获取竞赛详情
    selectCompetitionInfo:params=>network.get('web/selectCompetitionInfo',params),
    // 查询省赛下竞赛列表
    selectProvinceCompetitions:params=>network.get('web/selectProvinceCompetitions',params),
    // 推荐学科竞赛
    selectCompetitionInfoList:params=>network.get('web/selectCompetitionInfoList',params),
    // 查询高校直通车
    selectSchoolDomain:params=>network.get('api/skin/api/domain/selectSchoolDomain',params),
    // 个人申请团队
    applyGroupByUser:params=>network.get('web/user/applyGroupByUser',params),
    // 竞赛赋能
    // 设置竞赛活动
    saveCompetitionActivity:params=>network.post('web/saveCompetitionActivity',params),
    // 查询竞赛活动
    selectCompetitionActivity:params=>network.get('web/selectCompetitionActivity',params),
    // 查询赋能竞赛
    selectCompetitionEnergize:params=>network.get('web/selectCompetitionEnergize',params),
    // 保存赋能竞赛
    saveCompetitionEnergize:params=>network.post('web/saveCompetitionEnergize',params),




    // 查询竞赛下所有赛段赛项
    selectCompetitionRowIds:params=>network.get('web/selectCompetitionRowIds',params),

    
}

