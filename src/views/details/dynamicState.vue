<template>
<!--动态-->
    <div id="dynamicState">
        <h1>
            <span>{{tabsName}}</span>
            <div class="types">
                <div :class="{on:news.id==active}" @click="newsChoose(news)" v-for="news in newstype" :key="news.id">
                    {{$t(news.name)}}
                </div>
            </div>
        </h1>
          
        <ul>
            <li v-for="(item,index) in stateData" :key="'dynamicState_' + index" @click="$router.push({path:'/issue/detail',query:{id:item.id}})">
                <div class="txt_top">
                    <p>{{item.newsTitle}}</p>
                    <div class="img">
                        <img :src="item.newsIcon" >
                    </div>
                </div>
                <div class="txt_content" v-html="item.newsInfo">
                    
                </div>
                <div class="txt_bottom">
                    <span class="fl">{{ item.newsTime | time}}</span>
                    <span >
                        <span v-if="authority.delNews"  class="txt_bottomDlt" @click.stop="delState(item.id)">
                            {{$t('dynamicState.del')}}
                        </span>
                        <span v-if="authority.editNews" class="txt_bottomEdit" @click.stop="$router.push({path:'/issue',query:{id: item.id}})">
                            {{$t('dynamicState.edit')}}
                        </span>
                    </span>
                </div>
            </li>
        </ul>
        <!-- 分页 -->
        <div class="cha-pagination" >
            <el-pagination
                hide-on-single-page
                class="cha-page"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script>
import network from '@/api/jxapi/index'
import { mapState } from 'vuex'
import moment from 'moment'
import { removeHtmlTag } from '@@/utils/util';
import { getTabsName } from '@@/utils/commons'

    export default {
        name: 'dynamicState',
        props:['tabs'],
        data(){
            return {
                pageSize: 8, // 每页条数
                page: 0, // 当前页数
                total: 0, //分页总条数
                stateData: [], // 返回的data值
                newstype:[
                    {
                        name:'dynamicState.all',
                        id:1,
                    },
                    {
                        name:'dynamicState.type0',
                        id:2,
                        type:'0'
                    },
                    {
                        name:'dynamicState.type1',
                        id:3,
                        type:'1'
                    },
                    // 20201117要求去掉
                    // {
                    //     name:'dynamicState.type2',
                    //     id:4,
                    //     type:'2'
                    // },
                    {
                        name:'dynamicState.type3',
                        id:5,
                        type:'3'
                    },
                ],
                active:1,
                // itemIdx: {}, 
                type:'',
                tabsName: '',
                competitionId: '',
            }
        },
        methods: {
            async delState(id){
                this.$confirm(this.$t('dynamicState.message'), this.$t('dynamicState.confirm'), {
                    confirmButtonText: this.$t('dynamicState.ok'),
                    cancelButtonText: this.$t('dynamicState.cancel'),
                    type: 'warning'
                }).then(async () => {
                    // delStatus 删除为0，正常为1
                    let delok = await network.saveNews({data:{id:id,delStatus:0}})
                    if(delok=='error') return;
                    this.getList()
                  
                }).catch(() => {
                    this.$message.info(this.$t('dynamicState.cancelDel'));
                });                
            },
            handleCurrentChange(){
                this.getList();
            },
            async getList(type){
                this.type = type
                let params={
                    competitionId:this.competitionId,
                    type:this.type,
                    pageNum:this.page,
                    pageSize:this.pageSize,
                    filterStatus: true
                }
                let newsList = await network.getNewsList({data:params});
                if(newsList=='error') return;

                this.setStateData(newsList)

            },
            setStateData(newsList){
                let data = newsList.pageData;
                for(let i in data){
                    data[i].newsInfo = removeHtmlTag(data[i].newsInfo)//data[i].newsInfo.replace(/<img(.*?)src=\"(.*?)\"(.*?)>/g,'')
                }

                this.stateData = newsList.pageData;
                this.page = newsList.pageNum;
                this.total = newsList.total;
                this.pageSize = newsList.pageSize;
            },
            newsChoose(news){
                this.active = news.id
                this.page = 1;
                this.getList(news.type)
            }
        },
        async created(){
            this.tabsName = getTabsName(this.tabs, 5) || '动态'
            this.competitionId = this.$route.query.id || parseInt(localStorage.getItem('competitionId'));
            if(!this.competitionId) return;
            this.getList();
            await this.$store.dispatch('AuthorityCompetition',this.competitionId)
        },
        computed: mapState({
            authority: state => state.authorityManagement,
        }),
        filters:{
            time(val){
                if(!val) return;
                return moment(parseInt(val)).format('YYYY-MM-DD HH:mm:ss');
            }
        } 
        
        
    }
</script>


<style lang="less" scoped>
#dynamicState{
    width: 1040px;
    margin: auto;
    background-color: #fff;
    padding: 30px 55px;
    text-align: start;
    // overflow: auto;
    box-sizing: border-box;
    >h1{
        font-size: 30px;
        border-left: 4px solid #1D86FF;
        padding-left: 16px;
        font-weight: 500;
        margin-left: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .types{
            height: 100%;
            display: block;
            div{
                font-size: 14px;
                cursor: pointer;
                padding: 0 10px;
                color: #4a4a4a;
                font-weight: 150;
                display: inline-block;
                vertical-align: middle;
            }
            .on{
                color: #1D86FF;
            }
        }
    }
    >ul{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        li{
            width: 300px;
            height: 300px;
            padding: 25px 20px 21px;    
            margin-top: 25px;
            margin-right: 10px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
            border-radius: 5px;
            box-sizing: border-box;
            display: inline-block;
            cursor: pointer;
            .txt_top{
                display: flex;
                justify-content: space-between;
                position: relative;
                p{
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                   
                    /*! autoprefixer: ignore next */
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:2; 
                    height: 44px;
                    width: 168px;
                    font-weight: bold;
                    padding-right: 16px;
                }
                .img{
                    width: 76px;
                    height: 44px;
                    position: relative;
                    overflow: hidden;
                    img{
                        width: 76px;
                        min-height: 44px;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                    }
                }
            }
            .txt_content{
                width: 100%;
                height: 143px;
                margin: 16px 0 16px;
                font-size: 13px;
                letter-spacing: 0.5px;
                line-height: 20px;
                overflow: hidden;
                word-break: break-all;
                display: -webkit-box;
                /*! autoprefixer: ignore next */
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 7;
                overflow: hidden;
                color: #808080;
                font-weight: 200;
                p{
                    img{
                        display: none !important;
                        width: 0;
                        height: 0;
                    }
                }
            }
            .txt_bottom{
                font-size: 12px;
                text-align: right;
                cursor: pointer;
                padding-top: 10px;
                .fl{
                    float: left;
                    color: #999999;
                }
            }
            
            .txt_bottomEdit{
                margin:0 10px;
                color:#4a4a4a;
            }
            .txt_bottomDlt:hover{
                color: #CB3A4C;
            }
            .txt_bottomEdit:hover{
                color: #1D86FF;
            }
        }
        li:hover{
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
        }
    }
}
</style>