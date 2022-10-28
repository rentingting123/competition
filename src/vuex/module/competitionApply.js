import jxapi from "@@/api/jxapi/index";
export default{
    namespaced : true,
    state:{
        openTeam:false,
        openSingle:false,
        signupBtn:{
            isOpen: 2, //是否可以继续报名 0未开始或已结束，1已经开始可以报名 2是已开始不能再报名
            isWorkOpen: false, //是否可以上传作品
            isReviewOpen: false, // 是否开放评审
            isEdit: 0, //是否可以不交报名材料//0未开始或已结束，1已经开始可以补交 2是已开始不能补交
          }
    },
    mutations:{
        closeTeam(state){state.openTeam = false},
        openTeam(state){state.openTeam = true},
        closeSingle(state){state.openSingle = false},
        openSingle(state){state.openSingle = true},
        refresh(state,btn){state.signupBtn = btn}
    },
    actions:{
        async refresh({commit},id){
            let btn = await jxapi.getBtn({ id: id });
            if (btn == "error") return;
            commit('refresh',{
                isOpen:btn.signup.isOpen,
                isEdit: btn.signup.isEdit,
                isWorkOpen:Boolean(btn.works.isOpen),
                isReviewOpen:Boolean(btn.review.isOpen),
            })
        }
    }
}