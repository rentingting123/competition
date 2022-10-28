import Vue from 'vue'
import Vuex from 'vuex'
import modules from './module/index'
import {assignIn,cloneDeep} from "lodash"
import actions from './actions'


Vue.use(Vuex)
const getters = {
    get_lang(state){
        return state.lang;
      }
};
const state = {
    authorityManagement: {
    },
    islogin:'',
    codeCreateCompetition:['manageCompetition','editCompetition'], // 竞赛创建
    codeNews:['manageNews','addNews','editNews','delNews','publishNews'],
    codeDetail:['downAuthCompetitor','downCompetitionMaterial'],//竞赛详情对应操作
    codeEditCompetition:['editCompetition','editHotel','editCompetitionInfo','editCompetitionGuide','addSubCompetition',
                            'delCompetitionInfo','relCompetitionInfo','managerCompetitor','downAuthCompetitor','manageNews',
                            'addNews','editNews','delNews','publishNews','manageRankingList','manageWorks','editWorks','delWorks'], // 竞赛编辑
    codeSetCompetition:['manageSetCompetition','setSignup','setWorks','setPay','closeCompetition'], // 竞赛设置
    codeSetCertificate:['createCertificate','setCertificate'], // 证书设置
    codeSetperson:['editUserInfo','updatePhone','bindWechat','editPassword'], // 个人设置
    codeSetPlatform:['managePlatform'], // 平台设置
    codeSetRegistration:['manageSignup','mangerMaterials','manageRegistration','preEnrole','manageFinance'], // 报名设置
    // codeSetFinancial:['manageFinance'], // 财务管理
    codeSetWork:['mangerWorks','editWorks','delWorks','downloadWorks'], // 作品设置
    codeCertificationSystem:['userIdent','organizationIdent'], // 认证体系
    codeSetTeam:['manageTeamInfo','editTeamInfo','delTeamInfo','editInvoice','editPay','auditTeamInfo','dowAuthCompetitor'], // 参赛团队设置
    codeSetPermission:['managerPermission','manageAccount','setPassword','setPermission','manageOrganization','addOrganization',
                        'addSubordinate','addReport','editAuditMessage','manageRole','addRole','editRole','delRole','managePermissionlist',
                        'addPermission','editPermission','delPermission','manageExpertAccount','manageExpertGroup','manageTemporaryExpert','manageMessage','dataService'],//  权限设置
    codeSetFinancial:['exportFinance','confirmPayment','feedbackPayment','resetPayment','confirmInvoice','feedbackInvoice','resetInvoice','editRefund'], // 财务管理
    codeSetSends:['manageShortMessage','preEnrole','teamOpinion'], // 预报名 消息
    codeSetSend:['manageShortMessage','sendMail','sendShortMessage'], // 短信管理
    codePersonalCenter:['manageMyCompetition','manageMyTeam','manageMyStudy','manageHonor','manageGrowUp','managePersonalSettings'], //个人中心显示
    
    certStep: 1, // 证书步骤
    certType: 0, // 证书生成状态
    signUpStatus:null,
    teamReload: true, //团队信息重新加载
    lang:'zh',
    toPortraitStorePathState:''
};
// 定义所需的 mutations
const mutations = {
    //权限方法
    authorityManagements (state, codes)
    {
        //console.log(state,codes)
        let _code = cloneDeep(assignIn(state.authorityManagement,codes))
        state.authorityManagement = _code
    },
    singUpRefresh(state,status){
        state.signUpStatus=status
    },
    swi_lang(state, arg){
        state.lang = arg;
      },
      toPortraitStorePath (state,str){
        state.toPortraitStorePathState=str||''
      }
};

// 创建 store 实例
export default new Vuex.Store({
    namespaced: true,
    modules,
    actions,
    getters,
    state,
    mutations, 
    
})
