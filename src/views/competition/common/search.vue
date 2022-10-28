<template>
    <div class="searchDetail ">
        <titles :title="$t('nav.searchResult')" />
        <div class="searchMain">
            <competition :obj='obj' v-loading='loading'/>
            <div class="details" v-loading='loading'>
                <h4><p></p>{{$t('nav.introduction')}}</h4>
                <div >{{ obj && obj.descrption }}</div>
            </div>
            <div class="news" v-loading='newsloading'>
                <h4><p></p>{{$t('nav.news')}}</h4>
                <ul v-if="newsLists.length>0">
                    <li v-for="(item, index) in newsLists" :key="index" @click="toNews(item)">
                        <div >
                            <h3 class="textOverflow">{{item.newsTitle}}</h3>
                            <p class="newsType">
                                <span>{{item.type | tags}}</span>
                                <span>
                                    <time style="margin-right: 10px;"><i class="iconfont" >&#xe649;</i>{{item.clickCount || 0}}</time>
                                    <time><i class="iconfont">&#xe6cb;</i>{{item.newsTime | time}}</time>
                                </span>
                            </p>
                        </div>
                    </li>
                </ul>
                <div v-else>
                    暂无动态
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import moment from 'moment'

import titles from './title.vue'
import competition from './competition'
export default {
    props: ['id',],
    components:{
        titles,
        competition,
    },
    data(){
        return{
            newsLists: [],
            obj: '',
            loading: false,
            newsloading: false,
        }
    },
    methods:{
        async getCompetitionDetail(){
            this.loading = true
            let res = await network.selectCompetitionInfo({data:{
                competitionId: this.id,
            }});
            this.loading = false
            if(res=='error') return;
            this.obj = res || ''
        },
        async getNews(){
            this.newsloading = true
            let res = await network.getNewsList({data:{
                competitionId: this.id,
                pageNum: 1,
                pageSize: 4
            }})
            this.newsloading = false
            if(res=='error') return;
            this.newsLists = res && res.pageData || []
        },
        toNews(item){
            this.$router.push('/issue/detail?id='+item.id)
        }
    },
    watch:{
        id:{
            immediate: true,
            handler(){
                this.getCompetitionDetail()
                this.getNews()
            }
        }
    },
    filters:{
        time(val){
            if(!val) return ''
            return moment(parseInt(val)).format('YYYY-MM-DD HH:mm:ss')
        },
        tags(vals){
            if(!vals) return '';
            let tags =  vals.split(',')
            tags = tags.filter(val=>{
                return val==0||val==1||val==2||val==3
            })
            if(tags.length>0){
                let str = tags[0]
                switch(str){
                    case '0' : return '通知动态';
                    case '1' : return '新闻动态';
                    case '2' : return '活动动态';
                    case '3' : return '大赛回顾';
                }
            }else{
                return ''
            }
        }
    }
}
</script>

<style lang='less' scoped>
.searchDetail{
    animation: animationshow 0.5s;
    width: 1230px;
    height: 404px;
    margin: 18px auto 0;
    text-align: left;
    overflow: hidden;
    .searchMain{
        background: #fff;
        padding: 28px 22px 21px 32px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        h4{
            font-size: 16px;
            font-weight: 500;
            color: #4A4A4A;
            line-height: 20px;
            letter-spacing: 1px;
            border-bottom: 1px solid #DADADA;
            padding-bottom: 10px;
            p{
                width: 10px;
                height: 20px;
                background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/header/titlebg.png') no-repeat;
                margin-right: 13px;
                display: inline-block;
                vertical-align: top;
                background-size: 10px 20px;
            }

        }
        .details{
            width: 438px;
            height: auto;
            >div{
                width: 100%;
                max-height: 270px;
                overflow: hidden;
                font-size: 14px;
                font-weight: 400;
                color: #4A4A4A;
                line-height: 27px;
                letter-spacing: 1px;
                margin-top: 11px;
                text-align-last:auto;
                text-align:justify;
                text-justify:distribute-all-lines; 
            }
        }
        .news{
            width: 438px;
            height: auto;
            ul{
                li{
                    cursor: pointer;
                    padding: 12px 0 12px;
                    border-bottom: #DADADA 1px dotted;
                    &:nth-child(4n){
                        margin-bottom: 0;
                        border-bottom: none;
                    }
                    >div{
                        width: 100%;
                        height: auto;
                        h3{
                            width: 100%;
                            height: 22px;
                            font-size: 14px;
                            font-weight: 500;
                            color: #000000;
                            line-height: 30px;
                            overflow: hidden;
                            font-weight: bold;
                        }
                        .newsBannerText{
                            width: 100%;
                            height: 48px;
                            font-size: 14px;
                            font-weight: 400;
                            color: #767676;
                            line-height: 24px;
                            overflow: hidden;
                            margin-top: 5px;
                        }
                        .newsType{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 10px;
                            span{
                                font-size: 12px;
                                font-weight: 400;
                                color: #6283FF;
                                line-height: 18px;
                            }
                            time{
                                font-size: 12px;
                                font-weight: 400;
                                color: #AEAEAE;
                                line-height: 18px;
                                i{
                                    font-size: 12px;
                                    margin-right: 4px;
                                }
                            }
                        }
                    }
                }
            }
            >div{
                line-height: 150px;
                font-size: 14px;
                color: #767676;
                text-align: center;
            }
        }
    }
}

@keyframes animationshow {
    from { height: 0; }
    to { height: 404px; }
}

</style>