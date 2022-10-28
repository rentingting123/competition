<template>
    <div class="recommend">
        <titles :title="$t('nav.subject')" />
        <div class="recommendMain" >

            <div class="status">
                <p :class="{'on': status===''}" @click="changeStatus()">全部竞赛</p>
                <p :class="{'on': status===1}" @click="changeStatus(1)">进行中</p>
                <p :class="{'on': status===0}" @click="changeStatus(0)">已结束</p>
            </div>

            <ul v-loading='loading'>
                <li v-for="list in lists" :key="list.id" >
                    <competition :obj='list'/>
                </li>
            </ul>
            <div class="el-page">
                <el-pagination
                    background
                    :page-size="pagesize"
                    layout="prev, pager, next"
                    :current-page.sync="page"
                    :total="total"
                    @current-change="init"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import titles from './title'
import competition from './competition'
export default {
    components:{
        titles,
        competition,
    },
    data(){
        return{
            page: 1,
            total: 0,
            pagesize: 4,
            lists: [],
            loading: true,
            status: '',
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(page){
            this.loading = true
            let res = await network.selectCompetitionInfoList({data:{
                type: 0,
                status: this.status, // 0：已结束 1：进行中
                pageNum: page || this.page,
                pageSize: this.pagesize
            }})
            this.loading = false
            if(res=='error') return;
            this.total = res && res.total || 0
            this.lists = res && res.list || []
        },
        changeStatus(val){
            console.log(val);
            if(val===0){
                this.status = 0
            }else if(val===1){
                this.status = 1
            }else{
                this.status = ''
            }
            this.page = 1
            this.init()
        }
    }
}
</script>

<style lang='less' scoped>
.recommend{
    width: 1230px;
    margin: 21px auto 0;
    text-align: left;
    .recommendMain{
        width: 100%;
        height: auto;
        background: #ffffff;

        .status{
            font-size: 14px;
            font-weight: 500;
            color: #8F8F8F;
            line-height: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px 0 0 20px;
            p{
                margin-right: 33px;
                cursor: pointer;
                &.on{
                    color: #6283FF;
                }
            }
        }
        
        ul{
            text-align: left;
            padding: 29px 0 20px;
            li{
                display: inline-block;
                vertical-align: top;
                margin: 0 24px 0 20px;
                &:nth-child(4n){
                    margin-right: 20px;
                }
            }
        }

        .el-page{
            text-align: center;
            padding-bottom: 20px;
        }
    }
    
}
</style>