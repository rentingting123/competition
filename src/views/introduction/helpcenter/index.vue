<template>
    <div class="helper">
         <div class="banner"></div>
         <div class="main clearfix">
            <ul class="left">
                <li v-for="nav in navs" @click="change(nav)" :key="nav.type" :class="{'on':type==nav.type}">
                    {{nav.name}}
                    <i class="el-icon-caret-right"></i>
                </li>
            </ul>
            <div v-loading='loading' class="right">
                <contact v-if="type==99" :list="videoList" />
                <FileReview v-else-if="type==199" url="https://web.moocollege.com/mooc/hzq/competition/logs/%E7%A0%94%E5%8F%91%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.pdf" />
                <VL :type="type" :list="videoList" v-else/>

                <el-pagination
                    class="cha-page"
                    background
                    @current-change="currentChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    style="margin:20px 0"
                    :hide-on-single-page='true'
                    :total="total">
                </el-pagination>
            </div>
         </div>
    </div>
</template>
<script>
import contact from './common/downloads'
import VL from './common/videoList'
import FileReview from "@@/components/fileReview";
import network from '@@/api/jxapi'
export default {
    components:{
        contact,
        FileReview,
        VL 
    },
    data(){
        return{
            loading:false,
            navs:[
                {
                    name:'主办方',
                    type:3,
                    url:'#'
                },
                {
                    name:'参赛者',
                    type:2,
                    url:'#'
                },
                {
                    name:'评审专家',
                    type:4,
                    url:'#'
                },
                {
                    name:'高校管理员',
                    type:1,
                    url:'#'
                },
                {
                    name:'报名管理员',
                    type:5,
                    url:'#'
                },
                {
                    name:'下载列表',
                    type:99,
                    url:'#'
                },
                {
                    name:'更新日志',
                    type: 199,
                    url:'#'
                }
            ],
            type:3,
            videoList:[],
            total: 0,
            pageSize: 20,
            page: 1,

        }
    },
    methods:{
        change(nav){
            this.type=nav.type;
            this.page = 1
            this.getVideoList(nav.type) 
            this.$router.push('/helpcenter?type='+nav.type)
        },
        currentChange(){
            this.getVideoList();
        },
        async getVideoList(type){
           this.videoList=[]
           this.loading=true
           let Vtype = type||this.type
           let list = await network.getVideoByUserType({
               data:{
                   app:'operate',
                   type:Vtype,
                   current: this.page,
                   pageSize: this.pageSize
               }
           })
            this.loading=false
           if(list == 'error') return 
           this.total = list.total || 0
           this.videoList = list.list
        },
        IsPC(){
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            return flag;
        }
    },
    created(){
        if(!this.IsPC()){
            location.href = 'http://operatevideo.moocollege.com'
        }
        this.type = this.$route.query.type || 1;
        this.getVideoList()
    },
    watch:{
        $route(){
            this.type = this.$route.query.type || 1;
        }
    }
}
</script>


<style lang="less" scoped>
.helper{
    width: 100%;
    height: auto;
    background: #ffffff;
    .banner{
        max-width: 1920px;
        height: 300px;
        margin: 0 auto;
        background: url(https://web.moocollege.com/mooc/hzq/competition/introduction/helper.jpg) no-repeat;
        background-size: cover;
        background-position: center;
    }
    .main{
        width: 1050px;
        margin: 0 auto;
        padding: 30px 0 160px;
        .left{
            width: 248px;
            height: 518px;
            border: 1px solid #CBD3E5;
            text-align: left;
            background: #FAFCFE;
            float: left;
            li{
                height: 44px;
                line-height: 44px;
                font-size: 15px;
                padding-left: 20px;
                color: #000000;
                border-bottom: 1px solid #CBD3E5;
                cursor: pointer;
                i{
                    color: #0078E2;
                    float: right;
                    line-height: 44px;
                    font-size: 14px;
                    margin-right: 20px;
                    display: none;
                }
            }
            li.on{
                color: #0078E2;
                border-left: 4px solid #0078E2;
                i{
                    display: block;
                }
            }
        }
        .right{
            width: 798px;
            min-height: 518px;
            border: 1px solid #CBD3E5;
            float: left;
        }

    }
}
</style>

