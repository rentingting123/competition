import network from '@@/utils/network'


export default {
    getOssKey: params => (network.node('3.0.1/common/upload/getOssUploadPolicy')),
    // 页面配置信息
    getPagesSetting: params => (network.get(`web/index/setting`, params)),
    fileImport: {
        "1": {
            enrol : params =>(network.get('web/report/uploadEnrol',params)),
            search: params => (network.get('web/report/searchSys', params)),
            submit: params => (network.post('web/report/exportCompetitionSignUp', params)),
            titleRow: params => (network.get('web/report/uploadEnrol', params)),
            downTemp:'https://web.moocollege.com/webFile/竞赛结果模版.xlsx',
        },
        "2": {
            enrol : params =>(network.get('web/report/uploadEnrol',params)),
            search: params => (network.get('web/report/searchSys', params)),
            submit: params => (network.post('web/report/exportCompetitionSignUp', params)),
            titleRow: params => (network.get('web/report/uploadEnrol', params)),
            downTemp:'https://web.moocollege.com/webFile/%E6%8A%A5%E5%90%8D%E8%A1%A8%E6%A8%A1%E6%9D%BF.xls',
        },
        upload:params=>(network.post('',params))
    },

    skinSet:params=>(network.node('/website/setSkin',params)),
    sendMail:params=>(network.get('/review/group/shareByEmail',params))
}
