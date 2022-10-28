<template>
    <div class="expendingServices">
        <div class="banner"></div>
        <div class="promotion">
            <h1 class="wow bounceInLeft">
                <i class="iconfont">&#xe67e;</i>
                <span>竞赛网站搭建及运维服务</span>
                <i class="iconfont">&#xe67d;</i>
            </h1>
            <h2 class="wow bounceInRight">
                竞赛主页的搭建（可设置独立域名），可为赛事提供宣传、展示、资讯发布、成果<br>展示及报名登录入口等相关服务，并提供日常运维服务。
            </h2>
            <worth />
        </div>

        <div class="promotion color">
            <h1 class="wow bounceInLeft">
                <i class="iconfont">&#xe67e;</i>
                <span>竞赛执行服务</span>
                <i class="iconfont">&#xe67d;</i>
            </h1>
            <h2 class="wow bounceInRight">
            提供摩课云竞赛服务平台服务，主办方可基于平台的赛事<br>创建、报名、作品上传、专家评审与竞赛管理等功能。
            </h2>
            <service />
        </div>

        <div class="promotion">
            <h1 class="wow bounceInLeft">
                <i class="iconfont">&#xe67e;</i>
                <span>平台培训与客服支持</span>
                <i class="iconfont">&#xe67d;</i>
            </h1>
            <h2 class="wow bounceInRight">
            享有免费的培训资料，包括视频、文件等资料，必要时可进行在线培训；同时<br>在服务期内享受7*12小时客服，包含电话、QQ、微信等常用渠道。
            </h2>
            <show :urls="list1"/>
        </div>
        

    </div>
</template>

<script>
import show from './common/picshow'
import worth from './common/worth'
import service from './common/service'
import {WOW} from 'wowjs'
export default {
    components:{
        show,
        worth,
        service
    },
    data(){
        return{
            list1:[
                'https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/expendingServices/1.png',
                'https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/expendingServices/2.png',
                'https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/expendingServices/3.png'
            ]
        }
    },
    mounted(){
        new WOW().init()
    }
}
</script>

<style lang="less" scoped>
    .expendingServices{
        width: 100%;
        height: auto;
        .banner{
            max-width: 1920px;
            height: 610px;
            margin: 0 auto;
            background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/expendingServices/banner.jpg) no-repeat;
            background-size: cover;
            background-position: center;
        }
        .promotion{
            width: 100%;
            background: #ffffff;
            padding: 72px 0 0 0;
            h1{
                font-size: 30px;
                color: #4A4A4A;
                text-align: center;
                line-height: 41px;
                span{
                    margin: 0 20px;
                }
                i{
                    color: #3EA5FF;
                    font-size: 24px;
                    line-height: 41px;
                }
            }
            h2{
                font-size: 20px;
                color: #4A4A4A;
                text-align: center;
                line-height: 30px;
                margin: 34px 0;
                font-weight: 150;
            }
            >img{
                width: 800px;
                margin: 0 auto;
                padding-bottom: 150px;
            }
        }
        .promotion.color{
            background: #F8FAFC;
            margin-top: 85px;
            padding-bottom: 90px;
        }

    }
</style>

