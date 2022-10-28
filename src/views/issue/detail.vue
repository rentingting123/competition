<template>
    <div id="issue">
        <!--固定头部-->
        <div class="header_fixed" >
            <div class="header_content">
                <p class="point" @click="$router.back()">{{$t('dynamicState.back')}}</p>
            </div>
        </div>
        <div class="detail">
            <h1 v-html="news.newsTitle"></h1>
            <h2 style="text-align: left">
                <span v-for="(tag,index) in news.tags" :key="index" class="tags">
                    <!-- {{ tag | filter }} -->
                    {{
                        tag==0 ? $t('dynamicState.type0') :
                        tag==1 ? $t('dynamicState.type1') :
                        tag==2 ? $t('dynamicState.type2') :
                        tag==3 ? $t('dynamicState.type3') : ''
                    }}
                </span>
                <p>
                    <time>
                       {{news.publishTime | time}}
                    </time>
                    <span class="eyes" v-if="news.clickCount">
                        阅读量：{{news.clickCount}}
                    </span>
                    <!-- competitionPrivateLevel 1 时隐藏 来源 -->
                    <span class="competitionName" v-if="news.competitionName && news.competitionPrivateLevel!=1">
                        来源：<i @click="$router.push('/details?id='+news.competitionId)">{{news.competitionName}}</i>
                    </span>

                </p>

            </h2>
            <h3></h3>
            <!-- pdf显示 -->
            <FileReview :url="news.pdfInfo" v-if="news.pdfInfo" index='pdfInfo' />
            <!-- 新闻详情 -->
            <show :data='news.newsInfo' />

        </div>
    </div>
</template>

<script>
import moment from 'moment'
import network from '@@/api/jxapi'
import show from '@@/components/editor/show'
import FileReview from "@@/components/fileReview";

export default {
    props: ['newsid'],
    components:{
        show,
        FileReview,
    },
    data(){
        return{
            news:{},
            id: ''
        }
    },
    methods:{
        async getList(){
            let res = await network.getNewsDetail({data:{id:this.id}});
            if(res=='error') return;
            let tags =  res && res.newsType && res.newsType.split(',') || []
            tags = tags.filter(val=>{
                return val==0||val==1||val==2||val==3
            })
            this.news = {
                ...res,
                tags: tags,
            }
        },
    },
    created(){
        this.id = this.newsid || this.$route.query.id;
        if(this.id){
            this.getList();
        }
    },
    filters:{
        filter(val){
            switch(val){
                case '0' : return '通知动态';
                case '1' : return '新闻动态';
                case '2' : return '活动动态';
                case '3' : return '大赛回顾';
            }
        },
        time(val){
            if(!val) return;
            return moment(parseInt(val)).format('YYYY-MM-DD HH:mm:ss')
        }
    }
}
</script>

<style lang="less" scoped>
#issue{
    text-align: start;
    background: #fff;
}
.header_fixed{
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    background: #FDF6D0;
    // position: fixed;
    position: sticky;
    top: 0px;
    z-index: 2;
    text-align: start;
    .header_content{
        width: 800px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        a{
            color: #4A4A4A;
            font-size: 14px;
            margin-top: 4px;
        }
    }
    .point{
        cursor: pointer;
    }
}
.header_fixed.on{
    background: none;
    // position: fixed;
    position: relative;
    top: 6px;
    height: 9px;
    left: -67px;
}
.detail{
    background: #FFFFFF;
    box-shadow: 0 4px 8px 0 #D5DDE5;
    border-radius: 10px;
    text-align: center;
    width: 900px;
    margin: 30px auto 0;
    padding:30px 70px 70px;
    h1{
        word-break: break-word!important;
        word-break: break-all;
        margin: 20px 0 0;
        font-size: 34px;
        font-weight: 700;
        line-height: 1.3;
    }
    h2{
        margin: 8px 0 10px;
        .tags{
            font-size: 14px;
            color: #1D86FF;
            letter-spacing: 0.7px;
            margin-right: 16px;
            padding: 0 10px;
            display: inline-block;
            text-align: center;
            border: 1px solid #1D86FF;
            border-radius: 10px;
            cursor: pointer;
        }
        time{
            font-size: 14px;
            color: #9B9B9B;
        }
        .eyes{
            font-size: 14px;
            color: #9B9B9B;
            margin-left: 20px;
        }
        .competitionName{
            font-size: 14px;
            color: #282828;
            margin-left: 20px;
            i{
                font-style: normal;
                color: #6283FF;
                cursor: pointer;
            }
        }
    }
    h3{
        width: 50px;
        border: 1px solid #DEDEDE;
        margin: 10px 0 20px;
    }
}
</style>
