import jxApi from "@@/api/jxapi/index";
import { getToken } from '../utils/oauth';


export default {
    setAuthority: async function({ commit, state }, cId) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeCreateCompetition, state.codeEditCompetition, state.codeSetCompetition,
                state.codeSetCertificate, state.codeSetperson, state.codeSetPlatform, state.codeSetRegistration,
                state.codeSetWork, state.codeCertificationSystem, state.codeSetTeam, state.codeSetPermission);
            var res = await jxApi.getUserCenter({
                data: {
                    //groupId: getGroupId()||-1,
                    competitionId: cId || '',
                    codes: codes
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    setAuthorityByCode: async function({ commit, state }, opt) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeSetSends);
            var res = await jxApi.getUserCenter({
                data: {
                    ...opt,
                    competitionId: opt.cId || '',
                    codes: opt.codes || codes,
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    setAuthorityByCodeNoID: async function({ commit, state }, opt) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeSetSends);
            var res = await jxApi.getUserCenter({
                data: {
                    //   groupId: opt.gId||getGroupId()||-1,
                    competitionId: opt.cId || '',
                    codes: opt.codes || codes,
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    AuthorityPersonal: async function({ commit, state }, cId) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeCreateCompetition, state.codeSetCompetition, state.codeSetCertificate, state.codeSetperson, state.codeSetPlatform, state.codeCertificationSystem, state.codePersonalCenter);
            var res = await jxApi.getUserCenter({
                data: {
                    // groupId: getGroupId()||-1,
                    competitionId: cId || '',
                    codes: codes
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    // 竞赛详情所有权限（报名设置，作品设置）
    AuthorityDetails: async function({ commit, state }, cId) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeSetRegistration, state.codeSetFinancial, state.codeSetWork, state.codeNews, state.codeDetail);
            var res = await jxApi.getUserCenter({
                data: {
                    // groupId: getGroupId()||-1,
                    competitionId: cId || '',
                    codes: codes
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    // 竞赛编辑所有权限（竞赛编辑）
    AuthorityCompetition: async function({ commit, state }, cId) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeEditCompetition);
            var res = await jxApi.getUserCenter({
                data: {
                    // groupId: getGroupId()||-1,
                    competitionId: cId || '',
                    codes: codes
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    // 团队编辑全部权限（参赛团队设置）
    AuthorityTeams: async function({ commit, state }, opt) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeSetCertificate, state.codeSetTeam);
            var res = await jxApi.getUserCenter({
                data: {
                    groupId: opt.gId || getGroupId() || -1,
                    competitionId: opt.cId || '',
                    codes: codes
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    // headerManagerPermission

    // 财务管理所有权限
    AuthorityFinancial: async function({ commit, state }, cId) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeSetFinancial);
            var res = await jxApi.getUserCenter({
                data: {
                    // groupId: getGroupId()||-1,
                    competitionId: cId || '',
                    codes: codes
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },

    // 短信管理所有权限
    AuthoritySetSend: async function({ commit, state }, cId) {
        //login判断是否登陆，登陆获取操作权限
        if (!!getToken()) {
            let codes = [].concat(state.codeSetSend);
            var res = await jxApi.getUserCenter({
                data: {
                    //groupId: getGroupId()||-1,
                    competitionId: cId || '',
                    codes: codes
                }
            })
            if (res == 'error') return
            let authorityList = {};
            res.forEach((obj, i) => {
                authorityList[obj.code] = obj.allow;
            });
            commit('authorityManagements', authorityList)
        }
    },
    singUpRefresh: async function({ commit, state }, id) {
        let status = await jxApi.getSignUpStatus({ data: { competitionId: id } })
        if (status == "error") return
        commit('singUpRefresh', status)
    }
}