import network from '@@/utils/network'

export default {
    // 标签设置
    tabControl: async function (params) { return network.put('web/competition/tab/control', params) },  
}
