import network from '@@/utils/network'

export default {
    //对比分析   本校竞赛排名情况
    getRankStatistics: params => (network.post(`dataService/competitionCompare/getCompetitionCompareSchoolAwardRankStatistics`, params)),
    //获取竞赛名称                     竞赛画像 竞赛列表模糊一样   selectCompList
    getCompetitionNameList: params => (network.get(`dataService/competitionLikeness/getCompetitionNameList`, params)),

    //获取年份列表                         获取年份列表一样  getYearList
    getYearList: params => (network.get(`dataService/competitionLikeness/getYearList`, params)),
    // 一键生成报告
    getExportList: params => (network.get(`dataService/report/export`, params)),
    //竞赛画像-竞赛数据-获奖信息
    getCompetitionEnterAwardInfo: params => (network.get(`dataService/competitionData/getCompetitionEnterAwardInfo`, params)),
    //竞赛画像-竞赛数据-获奖占比
    getCompetitionEnterAwardProportionInfo: params => (network.get(`dataService/competitionData/getCompetitionEnterAwardProportionInfo`, params)),
    //竞赛画像-竞赛数据-竞赛获奖率，高校获奖率，竞赛奖项数量   /competitionData/getCompetitionEnterAwardRateInfo
    getCompetitionEnterAwardRateInfo: params => (network.get(`dataService/competitionData/getCompetitionEnterAwardRateInfo`, params)),
    //竞赛画像-竞赛数据-参赛信息
    getCompetitionEnterInfo: params => (network.get(`dataService/competitionData/getCompetitionEnterInfo`, params)),
    //竞赛画像-竞赛数据-参赛占比
    getCompetitionEnterProportionInfo: params => (network.get(`dataService/competitionData/getCompetitionEnterProportionInfo`, params)),
    //竞赛画像-竞赛数据-获奖高校分布
    getCompetitionEnterSchoolAwardInfo: params => (network.get(`dataService/competitionData/getCompetitionEnterSchoolAwardInfo`, params)),
    //竞赛画像-竞赛数据-参数高校分布
    getCompetitionEnterSchoolInfo: params => (network.get(`dataService/competitionData/getCompetitionEnterSchoolInfo`, params)),

    //竞赛画像-竞赛信息
    getCompetitionInfo: params => (network.get(`dataService/competitionInfo/getCompetitionInfo`, params)),


    //竞赛画像-竞赛标杆-获奖率TOP20高校
    getAwardRateTop: params => (network.get(`dataService/competitionBenchmark/getAwardRateTop20`, params)),
    //竞赛画像-竞赛标杆-获奖TOP20专业
    getMajorAwardTop: params => (network.get(`dataService/competitionBenchmark/getMajorAwardTop20`, params)),
    //竞赛画像-竞赛标杆-参赛TOP20专业
    getMajorTeamTop: params => (network.get(`dataService/competitionBenchmark/getMajorTeamTop20`, params)),
    //竞赛画像-竞赛标杆-获奖TOP20高校
    getSchoolAwardTop: params => (network.get(`dataService/competitionBenchmark/getSchoolAwardTop20`, params)),
    //竞赛画像-竞赛标杆-参赛TOP20高校
    getSchoolTeamTop: params => (network.get(`dataService/competitionBenchmark/getSchoolTeamTop20`, params)),
    //竞赛画像-竞赛标杆-获奖TOP20指导老师
    getTeacherAwardTop: params => (network.get(`dataService/competitionBenchmark/getTeacherAwardTop20`, params)),


    //竞赛画像-历年概况-参赛数据-竞赛概况
    competitionlistData: params => (network.get(`dataService/competitionSignupStatistics/listData`, params)),
    //竞赛画像-历年概况-参赛数据-参赛TOP20高校
    getHistorySchoolTeamTop: params => (network.get(`dataService/competitionSignupStatistics/getHistorySchoolTeamTop20`, params)),
    //竞赛画像-历年概况-参赛数据-参赛专业TOP20
    getHistoryMajorTeamTop: params => (network.get(`dataService/competitionSignupStatistics/getHistoryMajorTeamTop20`, params)),

    competitionAwardData: params => (network.get(`dataService/competitionSignupStatistics/listAwardData`, params)),
    //竞赛画像-历年概况-获奖数据-竞赛获奖率高校TOP20
    getHistoryAwardRateTop: params => (network.get(`dataService/competitionSignupStatistics/getHistoryAwardRateTop20`, params)),
    //竞赛画像-历年概况-获奖数据-获奖专业TOP20
    getHistoryMajorAwardTop: params => (network.get(`dataService/competitionSignupStatistics/getHistoryMajorAwardTop20`, params)),
    //竞赛画像-历年概况-获奖数据-获奖团队高校TOP20
    getHistoryAwardTop: params => (network.get(`dataService/competitionSignupStatistics/getHistoryAwardTop20`, params)),



    //竞赛画像-竞赛地域-参赛区、省分布
    getCompetitionAreaInfo: params => (network.get(`dataService/competitionArea/getCompetitionAreaProvinceInfo`, params)),


    // 高校概貌 - 榜单内国赛清单及对应获奖数量
    getCompetitionSchoolViewRankList: params => (network.get(`dataService/competitionSchoolView/getCompetitionSchoolViewRankList`, params)),
    //高校概貌 - 高校信息
    getSchoolInfo: params => (network.get(`dataService/competitionSchoolView/getSchoolInfo`, params)),
    // 高校概貌 - 榜单排名
    getCompetitionSchoolViewRank: params => (network.get(`dataService/competitionSchoolView/getCompetitionSchoolViewRank`, params)),
    // 高校概貌-竞赛贡献度
    getCompetitionContributionRank: params => (network.get(`dataService/competitionSchoolView/getCompetitionContributionRank`, params)),
    // 高校概貌-获奖贡献度
    getCompetitionAwardInfo: params => (network.get(`dataService/competitionSchoolView/getCompetitionAwardInfo`, params)),
    // 高校概貌-竞赛参与性别比
    getCompetitionSexRatio: params => (network.get(`dataService/competitionSchoolView/getCompetitionSexRatio`, params)),
    // 高校概貌 - 同类型高校排名
    getSameTypeSchoolRankInfo: params => (network.get(`dataService/competitionSchoolView/getSameTypeSchoolRankInfo`, params)),
    // 高校概貌 = 榜单国赛参与率/competitionSchoolView/getCompetitionParticipationRate
    getCompetitionParticipationRate: params => (network.get(`dataService/competitionSchoolView/getCompetitionParticipationRate`, params)),
    // 高校概貌 = 专业贡献度
    getCompetitionSchoolViewMajorInfo: params => (network.get(`dataService/competitionSchoolView/getCompetitionSchoolViewMajorInfo`, params)),
    // 高校概貌- 竞赛年均得分
    getCompetitionAvgYearInfo: params => (network.get(`dataService/competitionSchoolView/getCompetitionAvgYearInfo`, params)),
    // 高校概貌 - 本省高校排名
    getProvinceRankInfo: params => (network.get(`dataService/competitionSchoolView/getProvinceRankInfo`, params)),

    // 对标重点-本校及对标竞赛获奖数量
    getCompetitionCompareSchoolAwardCount: params => (network.post(`dataService/competitionCompare/getCompetitionCompareSchoolAwardCount`, params)),
    // 对标重点-学校搜素//
    selectSchoolName: params => (network.get(`dataService/competitionCompare/selectSchoolName`, params)),
    // 对标重点-本校及对标榜单排名
    CompetitionCompareSchoolRankInfo: params => (network.post(`dataService/competitionCompare/getCompetitionCompareSchoolRankInfo`, params)),
    // 对标重点-本校及对标榜单国赛参与率/competitionCompare/
    CompetitionCompareSchoolEnterRate: params => (network.post(`dataService/competitionCompare/getCompetitionCompareSchoolEnterRate`, params)),
    // 对标重点-竞赛贡献度
    CompetitionCompareContributionRate: params => (network.post(`dataService/competitionCompare/getCompetitionCompareContributionRate`, params)),
    // 对标重点-本校及对标校竞赛年均获奖
    CompetitionCompareAvgScore: params => (network.post(`dataService/competitionCompare/getCompetitionCompareAvgScore`, params)),

    //竞赛画像 竞赛列表模糊
    selectCompList: params => network.get('dataService/competitionLikeness/getCompetitionNameList', params),
    //竞赛画像 竞赛列表精准
    getCompList: params => network.get('dataService/competitionLikeness/selectCompetition', params),
    //竞赛年份
    getCompYearList: params => network.get('dataService/competitionLikeness/getYearList', params),
    //殇季图
    getCompStructure: params => network.get('dataService/competitionLikeness/getCompetitionLikenessStructure', params),
    //获奖情况
    getCompAwardInfo: params => network.get('dataService/competitionLikeness/getCompetitionLikenessSchoolAwardInfo', params),
    //区域获奖信息
    getCompAreaAwardList: params => network.get('dataService/competitionArea/getCompetitionAreaProvinceAwardInfo', params),
}
