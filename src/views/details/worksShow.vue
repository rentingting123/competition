<template>
<!--作品展示-->
    <div v-loading="loading" id="worksShow">
        <div class="worksShow_nav">
            <h1>{{tabsName}}</h1>
            <div style="width:530px;">
                <el-input style="width:200px;" prefix-icon="el-icon-search" :placeholder="$t('worksShow.keywork')" v-model="keyword" @keyup.enter.native="search"></el-input>
                <el-cascader v-model="rowId" :options="rowIds" @change="rowIdChange"></el-cascader>
                <el-select style="width: 100px" v-model="isPromoted" :placeholder="$t('worksShow.choose')" @change='choosePromoted' :popper-append-to-body='false'>
                    <el-option v-for="item in options" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
            </div>
            <ul >
                <li v-for="(item, index) in rankingList" :key="index" @click="rankin(index)" :class="{active_color:item.isActive}">
                    {{$t(item.name)}}
                </li>
            </ul>
        </div>
        <ol>
            <li v-for="(item, index) in worksList" @click="gotoDetail(item)" :key="index">
                <works :data="item" :getList="getList"></works>
            </li>
        </ol>
        <!-- 分页 -->
        <div class="cha-pagination" >
            <el-pagination
                hide-on-single-page
                class="cha-page"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script>
import works from '@@/components/works'
import { getGroupId, getCompetitionId, getTabsName } from "@@/utils/commons";
import network from '@@/api/jxapi/competitionApi'
    export default {
        props: ['tabs'],
        data(){
            return {
                isPromoted: '0',
                options:[
                    {
                        label: 'worksShow.all',
                        value: '0',
                    },
                    {
                        label: 'worksShow.winning',
                        value: 2,
                    },
                    {
                        label: 'worksShow.prize',
                        value: 1,
                    },
                    {
                        label: 'worksShow.noprize',
                        value: 3,
                    }
                ],

                rankingList: [
                    {
                        name: 'worksShow.all',
                        isActive: true,
                    },
                    {
                        name: 'worksShow.score',
                        isActive: false,
                    },
                    {
                        name: 'worksShow.heat',
                        isActive: false,
                    },
                    {
                        name: 'worksShow.latest',
                        isActive: false,
                    }
                ],  // tab
                rank: '',
                worksList: [], // 作品表单
                page: 1, //当前页数
                total: 0, //分页总条数
                pageSize: 9,
                keyword: '',
                competitionId: '',
                loading:true,
                tabsName: '',
                rowId: [''],
                rowIds: [],
            } 
        },
        methods: {
            rankin(index){
                this.rankingList.forEach(obj => {
                    obj.isActive = false;
                })
                this.rankingList[index].isActive = true;
                let temp = [null, "score", "hot", "date"];
                this.rank = temp[index]
                this.page = 1
                setTimeout(()=>{
                    this.getList(this.keyword,temp[index]);
                },0)
            },
            // 分页
            handleCurrentChange(){
                this.getList(this.keyword, this.rank)
            },
            choosePromoted(){
                this.page = 1;
                this.getList()
            },
            async getList(keyword, sort){
                this.loading=true
                var obj = {
                    pageNum: this.page,
                    pageSize: this.pageSize,
                    selfGroupId: getGroupId(),
                    competitionId: this.competitionId 
                };
                if(keyword && keyword != ''){
                    obj['q'] = keyword;
                }
                if(sort && sort != ""){
                    obj['sort'] = sort;
                }
                if(this.rowId.length>0){
                    obj.rowId = this.rowId[this.rowId.length - 1]
                }

                // 作品筛选，暂时隐藏
                if(this.isPromoted===0 || this.isPromoted){
                    obj['isPromoted'] = this.isPromoted
                }

                let poolQuery = await network.getPoolQuery({data:obj});
                this.loading=false
                this.worksList = []
                if(poolQuery=='error' || !poolQuery) return ;
                this.worksList = poolQuery.list || [];
                this.page = poolQuery.pageNum;
                this.total = poolQuery.total;
                this.pageSize = poolQuery.pageSize;
                        
            },
            gotoDetail(item){
                let path = this.$route.path;
                this.$router.push(`/details/worksShow/${item.id}/${item.competitionId}`)
            },
            search(){
                this.getList(this.keyword, null);
            },
            rowIdChange(){
                this.page = 1
                this.getList();
            },
            async getRowIds(){
                let res = await network.selectCompetitionRowIds({data:{
                    competitionId: this.competitionId
                }})
                if(res=='error') return;
                let arr = [{
                    value: '',
                    label: '全部'
                }]
                res && res.map(item=>{
                    let children = []
                    item.rowIds && item.rowIds.map(child=>{
                        children.push({
                            value: child.rowId,
                            label: child.rowName
                        })
                    })
                    arr.push({
                        value: item.id,
                        label: item.name,
                        children: children.length>0 ? children : null
                    })
                })
                this.rowIds = arr
            },
        },
        components: {
            works
        },
        async created(){
            this.tabsName = getTabsName(this.tabs, 7) || '作品展示'
            this.competitionId = getCompetitionId()
            this.getList(this.keyword,null);
            this.getRowIds();
        }
    }
</script>


<style lang="less" scoped>
#worksShow{
    width: 1040px;
    margin: auto;
    text-align: start;
    padding: 30px 20px; 
    background-color: #fff;
    // overflow: hidden;
    box-sizing: border-box;    
    .worksShow_nav{
        width: 100%;
        height: 39px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >h1{
            font-size: 30px;
            border-left: 4px solid #1D86FF;
            padding-left: 16px;
            font-weight: 500;
            margin-left: 40px;
        }
        ul{
            display: flex;
            justify-content: space-between;
            li{
                font-size: 14px;
                cursor: pointer;
                padding: 0 5px;
            }
            .active_color{
                color: #1D86FF;
            }
        }
    }
    >ol{
        width: 980px;
        overflow: hidden;
        padding: 0 20px 20px;
        margin: 0 auto;
        li{
            width: auto;
            margin: 20px 30px 0 0;
            margin-top: 20px;
            float: left;
            &:nth-child(3n){
                margin-right: 0;
            }
        }
    }
    
}
</style>