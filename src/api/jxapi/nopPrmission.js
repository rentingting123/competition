import network from '@@/utils/network'
// 该页面接口为无权限接口
export default {
    // 获取作品详情
    getWorkRuleByCompetitionIdNoPrmission: params=> (network.get('api/review/share/pool', params)),  
    // 获取团队详情
    getTeamListNoPrmission: params=> (network.get('api/review/share/pool/team', params)),

}
