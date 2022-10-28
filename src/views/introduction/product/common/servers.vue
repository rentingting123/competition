<template>
    <div>
        <h3 class="wow slideInUp">基本服务</h3>
        <ul class="clearfix wow slideInUp">
            <li>
                <i class="iconfont">&#xe698;</i>
                <p>赛事网站搭建</p>
            </li>
            <li>
                <i class="iconfont">&#xe692;</i>
                <p>竞赛执行服务</p>
            </li>
            <li>
                <i class="iconfont">&#xe682;</i>
                <p>竞赛管理服务</p>
            </li>
            <li>
                <i class="iconfont">&#xe68b;</i>
                <p>数据存储</p>
            </li>
            <li>
                <i class="iconfont">&#xe684;</i>
                <p>平台培训与客服支持</p>
            </li>
        </ul>
        <h3 class="on wow slideInUp">拓展服务</h3>
        <ul class="on clearfix wow slideInUp">
            <li>
                <i class="iconfont">&#xe690;</i>
                <p>赛事网站搭建</p>
            </li>
            <li>
                <i class="iconfont">&#xe68c;</i>
                <p>数据迁移</p>
            </li>
            <li>
                <i class="iconfont">&#xe689;</i>
                <p>赛事运营与推广</p>
            </li>
            <li>
                <i class="iconfont">&#xe691;</i>
                <p>赛事培训</p>
            </li>
            <li>
                <i class="iconfont">&#xe685;</i>
                <p>会议支持</p>
            </li>
            <li>
                <i class="iconfont">&#xe68a;</i>
                <p>企业合作</p>
            </li>
            <li>
                <i class="iconfont">&#xe680;</i>
                <p>大赛宣传片</p>
            </li>
            <li>
                <i class="iconfont">&#xe694;</i>
                <p>财务管理</p>
            </li>
        </ul>
    </div>
</template>
<script>
import {WOW} from 'wowjs'
export default {
    mounted(){
        new WOW().init()
    }
}
</script>

<style lang="less" scoped>
h3{
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    width: 225px;
    height: 43px;
    line-height: 43px;
    background: url(https://web.moocollege.com/mooc/hzq/competition/introduction/bg2.png) no-repeat;
    background-size: cover;
    background-position: center;
    margin: 77px auto 38px;
}
h3.on{
    background: url(https://web.moocollege.com/mooc/hzq/competition/introduction/bg1.svg) no-repeat;
    background-size: cover;
    background-position: center;
}
ul{
    margin: 0 auto;
    text-align: center;
    width: 825px;
    li{
        float: left;
        margin-right: 80px;
        color: #FFFFFF;
        i{
            font-size: 67.5px;
            display: block;
           
        }
        p{
            font-size: 16px;
            margin-top: 27.5px;
        }
    }
    :nth-child(5){
        margin-right: 0;
    }

}
ul.on{
    li{
        margin-right: 118px;
        color: #EDC686;
        margin-bottom: 43px;
        width: 112px;
    }
    :nth-child(5){
        margin-right: 118px;
    }
    :nth-child(4n){
        margin-right: 0;
    }
}

</style>
