import network from '@@/utils/network'
import { getReflashToken } from '@@/utils/oauth'
export default {
    // 黄昭 当前登录人可邀请他人参加的团队
    getGroupInviteList: params => (network.get('web/user/getGroupInviteList', params)),
    // 获取组织类型grouptype
    getGroupType: params => (network.get('usercenter/group/getGroupType', params)),
    // 邀请人员加入团队 黄昭
    inviteGroupByLeader: params => (network.get('web/user/inviteGroupByLeader', params)),
    // 信息教研
    isCompleteInfo: params => (network.get('web/user/isCompleteInfo', params)),
    // 队长确认或拒绝个人申请加入团
    updateApplyState: params => (network.put('web/user/updateApplyState', params)),
    // 同意加入被邀请的团队
    agreeJoinGroup: params => (network.put('web/user/agreeJoinGroup', params)),
    // 团队中申请加入的记录
    applyGroupRecorderList: params => (network.get('web/user/applyGroupRecorderList', params)),
    // 找团队接口
    findteam: function(params) { return network.post(`web/user/getGroupApplyList`, params) },
    // 团队邀请加入人员列表
    inviteGroupRecorderList: function(params) { return network.get(`web/user/inviteGroupRecorderList`, params) },
    // 找人接口
    findpeople: function(params) { return network.post(`web/user/getUserApplyList`, params) },
    getmyCompetition: function(params) { return network.get(`web/competition/myCompetition`, params) },
    getpersonCompetition: function(params) { return network.get(`web/user/personCompetition`, params) },
    //查询用户信息是否完善
    checkUserInfo: params => (network.get('usercenter/isCompleteInfo', params)),
    //查询用户机构列表
    getUserGroupIds: params => (network.get(`usercenter/group/infos`, params)),
    //提交用户选择
    setUserGroup: params => (network.post('usercenter/user/saveLoginObject', params)),
    getPersonTeam: function(params) { return network.post(`web/user/group`, params) },
    // 获取我的团队
    getMyTeam: function(params) { return network.get(`web/user/myGroup`, params) },
    // 获取团队标签
    getMyTeamtag: function(params) { return network.get(`web/user/getLabelFromSchedule`, params) },
    // 获取个人标签
    getowntag: function(params) { return network.get(`web/user/getUserLabel`, params) },
    // 修改团队标签
    updataMyTeamtag: function(params) { return network.post(`web/user/saveGroupLabel`, params) },
    // 保存个人标签
    updataowntag: function(params) { return network.post(`web/user/saveUserLabel`, params) },
    // 输入团队码加入团队
    applyAddGroup: function(params) { return network.post(`web/competition/applyAddGroup/${params.inviteCode}`) },
    // 竞赛特殊设置
    saveSpecial: function(params) { return network.post(`web/competition/special/setting`, params) },
    // 展示特殊设置
    showSpecialDialog: function(params) { return network.get(`web/competition/btn/${params.id}`) },
    // 再次举办竞赛
    copyCompetition: function(params) { return network.post(`web/competition/copy`, params) },
    // 导出报名列表
    exportTable: params => (network.post(`web/report/export`, params)),
    // 报名管理列表
    applyList: params => (network.post(`web/report/signUpManager`, params)),
    // 报名管理统计
    countData: params => (network.post(`web/report/countSignUp`, params)),
    // 获取短信发送对象
    querySendTarget: params => (network.post('web/report/signUpMember', params)),
    // 发送邮件或短信
    sendEmailMessage: params => (network.post(`web/report/sendEmailMessage`, params)),
    // 获取短信模板和统计
    getCountSmsByUser: params => (network.get(`web/report/getEmailAndMessageNum`, params)),
    // 获取用户信息
    getUserInfo: function(params) { return network.get(`usercenter/user`, params) },
    // 获取用户信息，未登录不返回 401 
    getUserInfoWithout401: function(params) { return network.get('usercenter/user/without401', params) },
    // 获取主页信息
    getPageSetting: function(params) { return network.get(`web/page/setting/group/${params.groupId}`) },
    // 保存主页设置
    savePageSetting: function(params) { return network.post(`web/page/setting`, params) },
    // 页面权限
    getUserCenter: function(params) { return network.post(`usercenter/user/authority`, params) },
    // 学校列表 少将 20201027 暂时不用
    school: function(params) { return network.get(`Admin/search/school`, params) },
    // 学校列表 usercenter
    schools: function(params) { return network.get(`usercenter/search/school`, params) },
    getAcademy: function(params) { return network.get(`web/academy/get`, params) },
    // 获取单位列表
    getCompanys: function(params) { return network.get(`usercenter/group/companys/search`, params) },
    // 
    bindingWechat: function(params) { return network.post(`usercenter/user/bindingWechat/${params.code}`) },
    // 绑定手机号码修改
    modifyMobile: function(params) { return network.form(`usercenter/user/modifyMobile`, params) },
    // 微信绑定手机号
    weixinModifyMobile: function(params) { return network.post(`usercenter/user/insertOrUpdateMobile`, params) },
    //获取学历列表
    getDegreeInfo: function(params) { return network.get(`usercenter/user/getDegreeInfo`, params) },
    // 保存个人信息
    setUserInfo: function(params) { return network.post(`/usercenter/user`, params) },
    // 修改个人银行卡信息
    updateUserBankInfo: function(params) { return network.post(`/usercenter/updateUserBankInfo`, params) },
    // 待审核列表
    getAuditList: function(params) { return network.get(`/web/user/audit/list`, params) },
    // 待审核列表
    doAudit: function(params) { return network.post(`/web/user/audit`, params) },
    // 学生提交认证
    studentAuth: function(params) { return network.post(`/usercenter/user/studentAuth`, params) },
    // 教师提交认证
    teacherAuth: function(params) { return network.post(`/usercenter/user/teacherAuth`, params) },
    //在线协议获取
    getContractList: params => (network.post('web/resource/pool/getContract', params)),
    //套餐信息的获取
    getserversList: params => (network.post('web/school/package', params)),
    //套餐付费
    payServers: params => (network.post(`web/pay/packagePay`, params)),


    getMatchSysNumList: params => (network.post(`web/report/getMatchSysNumList`, params)),
    setMatchSysNumList: params => (network.post(`web/report/matchFiledSaveOrUpdate`, params)),
    delMatchSysNumList: params => (network.post(`web/report/delMatchFiled`, params)),

    // 发送短信
    sendSmsCode: params => (network.get(`usercenter/code/sms`, params)),

    // 短信重置密码
    setNewsPwd: params => (network.post(`usercenter/user/resetPassword`, params)),
    // 验证号码是否已存在
    registerCheck: params => (network.get(`usercenter/user/register/check`, params)),
    // 注册
    register: params => (network.post(`usercenter/user/register`, params)),
    //机构注册
    groupRegister: params => (network.post(`usercenter/group/register`, params)),

    wechatLogin: params => (network.post(`usercenter/authentication/code`, params)),
    // 手机号登录
    authenticationMobile: params => (network.form(`usercenter/authentication/mobile`, params)),
    // 帐号密码
    authenticationForm: params => (network.form(`usercenter/authentication/form`, params)),
    // 消息未读
    unRedaNum: params => (network.get(`usercenter/user/unRedaNum`, params)),
    //报名管理审核  通过  反馈
    changeGroupPoolStatus: params => (network.post(`web/competition/changeGroupPoolStatus`, params)),
    //禁止竞赛
    bannedGroup: params => network.get(`web/competition/ban/team`, params),
    //手动通过
    passedGroup: params => network.get(`web/competition/pass/team`, params),
    // 导出预报名
    downloadLogin: params => (network.get(`web/skin/export`, params)),
    // 修改密码
    changePwd: params => (network.get(`usercenter/user/updataPassword`, params)),
    //找回密码
    resetPassword: params => (network.post(`usercenter/user/resetPassword`, params)),

    // 查询专业
    getMajor: params => (network.get(`web/user/major`, params)),
    // 根据学院查专业
    getMajorBySchool: params => (network.get(`Admin/selectMajor`, params)),


    // 投稿部分
    // 查询投稿列表
    queryContribute: params => (network.post(`skin/structureCompetitionSkin/queryContribute`, params)),
    //修改状态
    updateContribute: params => (network.post(`skin/structureCompetitionSkin/updateContribute`, params)),
    // 获取主办方竞赛
    getCompetitionss: params => (network.get(`web/competition/queryCompetition`, params)),

    //获取新闻通知
    getSearchNews: params => (network.post('admin/rankingNews/search', params)),

    //获取培训列表
    getSelectTraining: params => (network.get('training/selectTraining', params)),

    //修改培训
    updateTraining: params => (network.post('training/updateTraining', params)),
    //添加培训
    publishTraining: params => (network.post('training/publishTraining', params)),

    //获取培训详情
    selectTrainingDetail: params => (network.get('training/selectTrainingDetail', params)),
    //刪除培訓
    delTraining: params => (network.get('training/delTraining', params)),
    //获取培训列表
    selectSignupList: params => (network.post('training/selectSignupList', params)),
    //导出培训报名表
    trainingSignUpInfo: params => (network.post('training/report/trainingSignUpInfo', params)),
    //培训报名退款
    payrRefund: params => (network.get('web/pay/payrRefund', params)),
    //线下付款审核
    auditUserPay: params => (network.post('training/pay/auditUserPay', params)),
    //发票信息审核 开票 拒绝
    auditGroupInvoice: params => (network.post('web/pay/auditGroupInvoice', params)),
    //线下付款 、发票信息  重置
    resetStatus: params => (network.get('training/pay/resetStatus', params)),
    //线下付款查看
    trainingOfflineStatus: params => (network.get('training/pay/queryOfflineStatus', params)),
    //获取培训证书信息
    getTrainCert: params => (network.get('web/training/get', params)),
    //设置培训证书
    setTrainCert: params => (network.post('web/training/set', params)),
    //刷新token
    reflashToken: () => (network.form('usercenter/oauth/token', {
        config: {
            NOauth: true
        },
        noError: true,
        data: {
            grant_type: 'refresh_token',
            refresh_token: getReflashToken()
        }
    })),

    // 退出登录
    setLoginOut: params => (network.post(`usercenter/logout`, params)),

    // 检查是否可以修改手机号
    phoneStatus: params => (network.get(`usercenter/user/phoneStatus`, params)),


}