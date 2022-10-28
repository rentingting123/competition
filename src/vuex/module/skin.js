import jxapi from "@@/api/jxapi/index";

export default{
    namespaced : true,
    state:{
        active:1,
        competitionDetail:{},
        id:'',
        data:{},
        adminRole:false
    },
    mutations:{
        gotoStep(state,n){
            state.active = n
        },
        setCompetitionDetail(state,data){
            state.competitionDetail = data
        },
        setId(state,id){
            state.id = id
        },
        setSkin(state,d){
            state.data = d
        },
        openAdmin(state,b){
            state.adminRole = b
        }
    },
    actions:{
        async setDetail({commit},id){
            let data = await jxapi.getCompetitionDetail({id:id})
            if(data=='error') return 
            commit('setId',id)
            commit('setCompetitionDetail',data)
            localStorage.setItem('baseInfo',JSON.stringify(data))
        }
    }
}