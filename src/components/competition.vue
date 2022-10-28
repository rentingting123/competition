<template>
    <div class="competi box_shadow" title="跳转到竞赛详情" @click="openCompetyDetail(data)">
        <div class="Ppro_img">
            <div class="banImg">
                <img  v-lazy="data.img" alt="" class="pro_img" />
            </div>
        </div>
        <div class="rightTop">
            <!-- <img  :src="imgData[data.competitionLevel].url" alt=""> -->
            <img class="iconImg" :src="imgurl" alt="">
        </div>
        
            <!-- <img :src="data.img" alt="" class="pro_img" width="480" height="270"> -->
        <div class="boxShadow">
            <!-- <img src="https://web.moocollege.com/mooc/hzq/competition/competition/国际.svg" alt=""> -->
            <p class="pro_info flexRowBetween">
                <span>{{data.info&&data.info.length>20?(data.info.substring(0,20)+'…'):data.info}}</span>
                <!-- <em :class='{"orangeState":data.state=="火热报名"?true:false,"blueState":data.state=="已开始"?true:false}'>{{data.state}}</em> -->
                <!-- <em :class='{"orangeState":data.state=="1"?true:false,"blueState":data.state=="0"?true:false}'> -->
                <em :class=" data.state===2 ? 'hot' : data.state===1 ? 'ing' :data.state==3?'coming':'ended'" >
                    {{data.state===2 ? $t('competition.Hot') : data.state===1 ? $t('competition.processing') :data.state===3 ?$t('competition.Preparation'):$t('competition.over')}}
                </em>
            </p>
            
             <div class="pro_area flexRowBetween" >
                <p>
                    <span v-if="data.area">{{data.area | city}}</span>
                </p>
            </div>
            <div>
                <p v-if="data.orgs" class="dataOrg">{{data.orgs}}</p>
                <p class="gheight"  v-else></p>
            </div>
            <div class="pro_tag flexRowBetween" >
                <p>
                    <span v-if="data.competitionLevel">{{$t('competition.abc1')}} {{data.competitionLevel}} {{$t('competition.abc')}}</span><span v-if="data.tags">{{data.tags.tagname}}</span>
                </p>
            </div>
            <div class="imgMask">
                <p>
                    <i class="ino">{{data.year}}</i><i class="ino ino1" v-if="data.competitionRound"> · {{$t('competition.the')}}{{data.competitionRound}}{{$t('competition.session')}}</i> 
                    <em v-text="data.time"></em>
                </p>
                
            </div>

            <div class="petionFoot" >
                <!-- <p>
                    <span v-if="data.tags">{{data.tags.tagname}}</span>
                    <em v-text="data.time"></em>
                </p> -->
                <p><span><i class="iconfont icon-remen">&#xe678;</i>{{$t('competition.school')}} {{data.schoolNum}} {{$t('competition.abd')}}</span><span><i class="iconfont icon-remen">&#xe677;</i>{{$t('competition.num')}} {{data.personNum}} {{$t('competition.people')}}</span></p>
            </div>
        </div>

        
        <!-- </a> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props: ['data'],
    created(){
    },
    computed:{
        imgurl(){
            
            let city = this.data.competitionRange?this.data.competitionRange.split(",")[0]:'';
            if(city=="国际"){
                return 'https://web.moocollege.com/mooc/hzq/competition/competition/国际.svg'
            }else if(city=="国赛"){
                return 'https://web.moocollege.com/mooc/hzq/competition/competition/国赛.svg'
            }else if(city=="省赛"){
                return 'https://web.moocollege.com/mooc/hzq/competition/competition/省赛.svg'
            }else if(city=="区赛"){
                return 'https://web.moocollege.com/mooc/hzq/competition/competition/区赛.svg'
            }else if(city=="校赛"){
                return 'https://web.moocollege.com/mooc/hzq/competition/competition/校赛.svg'
            }else{
                return 'https://web.moocollege.com/mooc/hzq/competition/competition/其他.svg'
            }
        }
    },
    methods:{
        openCompetyDetail(data){
            if(data.allInOneUrl){
                window.open(data.allInOneUrl);
            }else{
                this.$router.push({path:'/details',query:{id:data.id}})
                localStorage.setItem('compety', JSON.stringify(data));
            }
        }
    },
    filters:{
        city(val){
            if(!val) return;
            var lastval = ''
            let city = val.split(',');
            for(let i in city){
                if(i!=0){
                    lastval += '-'+city[i]
                }
                lastval += city[i]
            }

            return lastval
        }
    }
}
</script>
<style lang="less" scoped>
    .competi{
        width: 29rem;
        // margin-left: 1rem;
        background:#fff;
        border-radius:0.3rem;
        margin-bottom:30px;
        position: relative;
        // overflow: hidden;
        cursor:pointer;
        &:hover{
            .boxShadow{
                box-shadow: 0px 0px 30px #ccc;
                // transform: scale(1.005, 1.005);
            }
            .pro_img{
                transform: scale(1.07);
                border-radius:0.3rem 0.3rem 0 0;
                
            }
        }
        .pro_img{
            width:464px;
            height: 270px;
            border-radius:0.3rem 0.3rem 0 0;
            transition: all 0.6s;
        }
        .pro_info{
            padding:0.3rem 1rem 0;
            margin-top:0.2rem;
            text-align: left;
           
           
            .orangeState{
                    background: #F5A623;
                }
                .blueState{
                    background:#fff;
                }
            span{
                font-size:16px;
                text-align:left;
                width: 300px; 
                // height: 18px;
                color: #4a4a4a;
                display: inline-block;
                overflow: hidden;
                font-weight: bold;
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;
            }
            em{
                float: right;
                font-size:12px;
                width:80px;
                font-style: normal;
                text-align: center;
                border-radius: 2px;
                padding:2px 12px;
                color:#fff;
            }
        }
        .pro_tag{
            padding:0 1rem 0;
            margin:0.2rem 0 0.6rem;
            text-align: left;
            >p{
                span{
                    border:1px solid #4A90E2;
                    border-radius:0.5rem;
                    font-size:0.5rem;
                    padding:0 0.3rem;
                    margin-right:0.3rem;
                    color: #4A90E2;
                }  
            }
            >p{
                line-height: 22px;
                height: 22px;
                em{
                    font-size:0.6rem;
                    font-style: normal;
                    // margin-left: 14rem;
                    float: right;
                    position: absolute;
                    top: 243px;
                    right: 11px;
                    color: #fff;
                }
                
            }
            >p{
                i{
                    font-style: normal;
                    position: absolute;
                    top: 243px;
                    left: 15px;
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
        .pro_area{
            padding:0 1rem 0;
            text-align: left;
            font-size: 0.7rem;
            color:#4a4a4a;
        }
    }
    .petionFoot{
        border-top: 1px solid #eee;
        padding:0 1rem 0;
        height: 42px;
        // width: 100%;
        line-height: 42px;
        font-size: 12px;
        color: #7B7F88 ;
        text-align: left;
        p{
            span{
                padding-right: 16px;
                i{
                    padding-right: 6px;
                    font-size: 12px;
                }
            }
        }
    }
    .ing{
        background:#F5A623 ;
    }
    .ended{
        background: #9B9B9B;
    }
    .coming{
        background: #0078E2;
    }
    .hot{
        background: #DA3145;
    }
    .rightTop{
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
        right: 0;
        .iconImg{
            width: 100%;
            height: 100%;
            border-radius: 0 0.3rem 0 0;
        }
    }
    .imgMask{
        width: 100%;
        height: 42px;
        position: absolute;
        top: 228px;
        background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(22,22,22,0.60) 100%);
        // bottom: 0;
        p{
            font-style: normal;
            height: 20px;
            width: 100%;
            padding: 15px 0 7px;
            color: #fff;
            font-size: 14px;
            i{
                float: left;
                padding-left: 16px;
            }
            em{
                font-style: normal;
                float: right;
                padding-right: 11px;
            }
        }

    }
    .boxShadow{
        padding:0.3rem 0 0; 
        box-shadow: 0px 0px 7px #ccc;
        margin-top: -4px;
    }
    .banImg{
        width: 464px;
        height: 270px;
        overflow: hidden;
    }
    .ino{
        font-Style:normal;
    }
    .ino1{
        padding-left: 8px !important;
    }
    .gheight{
        height:16px
    }
    .dataOrg{
        padding:0 1rem 0;
        font-size: 12px;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Ppro_img{
        border-radius: 0.3rem;overflow:auto;
    }

</style>
