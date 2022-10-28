import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import { sync } from 'vuex-router-sync'

Vue.use(Vuex)

const state = {
    // COOKIEEXPIRES:16800, //设置cookies 的有效时间  单位小时h
    manageDetailShow:false, // 结果列表详情页面是否显示
    signupDetailShow:false, // 报名列表详情页面是否显示

    autoCheckShow:false, // 自动校对页面是否显示

    competyAddShow:false, // 结果添加页面是否显示
    signupAddShow:false, // 报名添加页面是否显示

    // 竞赛管理，数据保留，start
    years: [], //年份列表
    competitionNames: [], // 复制创建选择列表
    schoolPrizeList: [], //竞赛列表
    year: '', //年份
    competitionNames2: [], //搜索列表
    // end

}

// 定义所需的 mutations
const mutations = {
    // 背景遮罩层改变状态
    ChangeBgVisible(state){
        state.bgVisible=!state.bgVisible
    },
}

// 创建 store 实例
export default new Vuex.Store({
    namespaced: true,
    actions,
    state,
    mutations
})