<template>
    <div class="empowerment">
        <div class="search">
            <el-select v-model="id" placeholder="请选择竞赛">
                <el-option v-for="competition in competitions" :key="competition.id" :label="competition.name"  :value="competition.id" >
                </el-option>
            </el-select>
            <span class="tips">*只支持筛选当前年份竞赛</span>
        </div>
        <el-tabs v-model="activeName" v-if="id">
            <el-tab-pane label="赋能竞赛" name='competition'>
                <competition v-if="activeName=='competition'" :id='id'/>
            </el-tab-pane>
            <el-tab-pane label="主办方活动" name='active'>
                <activeList v-if="activeName=='active'" :id='id'/>
            </el-tab-pane>
        </el-tabs>
        <div v-else class="more">
            请选择竞赛
        </div>
    </div>
</template>

<script>
import activeList from './common/activeList'
import competition from './common/competition'
import network from '@/api/jxapi'
import { getGroupId } from '@/utils/commons'
import { mapState } from 'vuex'
export default {
    components:{
        activeList,
        competition,
    },
    data(){
        return{
            activeName: 'competition',
            id: '',
            competitions: [],
        }
    },
    computed:{
        ...mapState({
            authority:state => state.authorityManagement,
        })
    },
    created(){
        // if(!this.authority.managePlatform){
        //     this.$message.error('无权限访问该页面')
        //     location.href = location.origin
        // }
        this.init();
    },
    methods:{
        async init(){
            let groupId = getGroupId()
            if(!groupId) return ;
            let res = await network.queryCompetitionList({ data:{
                groupId: groupId
            }});
            if(res=='error') return;
            // status 0 未发布 1 审核中  2 审核未通过  5 发布   审核中和发布 不能进行发布
            // isfinish  0 已结束
            let arr = res || [], currentYear = new Date().getFullYear();
            this.competitions = arr.filter((res)=>{
                return (res.isfinish==0 || res.status==5) && res.competitionYear == currentYear
            })
            if(this.competitions.length>0){
                this.id = this.competitions[0].id
            }
        },

    }
}
</script>

<style lang='less' scoped>
.empowerment{
    .tips {
        font-size: 14px;
        color: rgb(144, 144, 144);
    }
    .search{
        width:500px;
        text-align:left;
        background: none;
        margin-bottom: 30px;
    }
    .more{
        margin: 50px;
    }
}
</style>
