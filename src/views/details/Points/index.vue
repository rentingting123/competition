<template>
    <div id="Points">
        <h1>{{tabsName}}</h1>
        <ul>
            <li v-for="(item, index) in pointsData" :key="'points_' + index" @click="gotoDetail(item.id)">
                <Points :data="item"></Points>
            </li>
        </ul>
    </div>
</template>


<script>
import Points from './points'
import jxApi from '@/api/jxapi/index'
import { getTabsName } from '@@/utils/commons'

    export default {
        name: 'points',
        props:['tabs'],
        components:{
            Points,
        },
        data(){
            return {
                pointsData: [], // 返回的data值
                tabsName: '',
            }
        },
        created(){
          
        },
        mounted () {
            this.tabsName = getTabsName(this.tabs, 2) || '赛项'
            let id = this.$route.query.id || parseInt(localStorage.getItem('competitionId'));
            if(id){
                this.getChilds(id);
            }
        },
        methods: {
            // 获取赛项
            async getChilds(id){
                const res = await jxApi.getChild({competitionId: id}); 
                if(res=='error') return
                this.pointsData = res;    
            },
            handleCurrentChange(){},
            gotoDetail(id){
                let path = this.$route.path;
                if(path.indexOf('details') > 0){
                    this.$router.push(`/details?id=${id}`);
                } else {
                    this.$router.push(`/createNewCompetition?id=${id}`);
                }             
            }
        },
    }
</script>


<style lang="less" scoped>
#Points{
    width: 1040px;
    margin: auto;
    background-color: #fff;
    padding: 30px 30px;
    text-align: start;
    box-sizing: border-box;
    >h1{
        font-size: 30px;
        border-left: 4px solid #1D86FF;
        padding-left: 16px;
        font-weight: 500;
        margin-left: 30px;
    }
    >ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 50px;
        li{
            width: 480px;
            height: 23rem;
            margin-top: 25px;
            cursor: pointer;
        }
    }
}
</style>

