<template>
    <div class="introductionProduct">
        <div class="banner"></div>
        <div class="characteristic">
            <h1 class="wow bounceInLeft">
                <i class="iconfont">&#xe67e;</i>
                <span>摩课云竞赛服务平台具有哪些特色？</span>
                <i class="iconfont">&#xe67d;</i>
            </h1>
            <h2 class="wow bounceInRight">
                我们在产品与服务中不断渗透“让竞赛变得简单”的理念，引入云存储、<br>线上支付、大数据等技术持续完善平台功能，改善赛事服务体验。
            </h2>
            <characteristic />
        </div>
        <div class="characteristic func">
            <h1 class="wow bounceInLeft">
                <i class="iconfont">&#xe67e;</i>
                <span>摩课云竞赛服务平台具有哪些功能？</span>
                <i class="iconfont">&#xe67d;</i>
            </h1>
            <h2 class="wow bounceInRight">
                平台具备支持赛事运行的报名系统、作品管理系统、<br>评审系统等6大功能系统，与此同时，其他拓展功能在持续研发中。
            </h2>
            <img src="https://web.moocollege.com/mooc/hzq/competition/introduction/productfunc.png" alt="">
        </div>
        <div class="characteristic servers">
            <h1 class="wow bounceInLeft">
                <i class="iconfont">&#xe67e;</i>
                <span>摩课云竞赛服务平台的服务有哪些？</span>
                <i class="iconfont">&#xe67d;</i>
            </h1>
            <servers />
        </div>
        <div class="characteristic worth">
            <h1 class="wow bounceInLeft">
                <i class="iconfont">&#xe67e;</i>
                <span>摩课云竞赛服务平台将为用户产生哪些价值？</span>
                <i class="iconfont">&#xe67d;</i>
            </h1>
            <h2 class="wow bounceInRight">
                摩课云竞赛服务平台的产品和服务将努力为赛事主办方创造更多的价值，<br>不仅限于学科竞赛的运行，而是在共享赛事生态、扩大赛事影响、沉淀竞赛成果等<br>诸多方面受益。
            </h2>
            <worth />
        </div>
    </div>
</template>

<script>
import characteristic from './common/characteristic'
import servers from './common/servers'
import worth from './common/worth'
import {WOW} from 'wowjs'
export default {
    components:{
        characteristic,
        servers,
        worth
    },
    mounted(){
        new WOW().init()
    }
}
</script>

<style lang="less" scoped>
    .introductionProduct{
        width: 100%;
        height: auto;
        .banner{
            max-width: 1920px;
            height: 610px;
            margin: 0 auto;
            background: url(https://web.moocollege.com/mooc/hzq/competition/introduction/introductionProduct.jpg) no-repeat;
            background-size: cover;
            background-position: center;
        }
        .characteristic{
            width: 100%;
            background: #F8FAFC;
            padding: 96px 0 75px 0;
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
        }
        .func{
            background: #ffffff;
            padding: 74px 0 123px 0;
            img{
                width: 1114px;
                margin: 0 auto;
            }
        }
        .servers{
            background: #1B2935;
            padding: 67px 0 100px 0;
            h1{
                span{
                    color: #ffffff;
                }
            }
        }
        .worth{
            background: #ffffff;
            padding: 127px 0 145px 0;
        }

    }
</style>

