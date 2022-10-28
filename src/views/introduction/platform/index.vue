<template>
    <div class="introductionPlatform">
        <div class="banner"></div>
        <div class="main">
            <div class="">
                <img class="wow slideInLeft" src="https://web.moocollege.com/mooc/hzq/competition/introduction/plat.png" alt="">
                <div class="wow slideInLeft">
                    <h1>关于摩课云竞赛服务平台</h1>
                    <p>摩课云竞赛服务平台是杭州简学科技有限公司（moocollege.com）旗下专注创新人才发展的学科竞赛在线服务平台，为大学生学科竞赛各级主办单位、参与高校和教育行政管理部门提供学科竞赛执行服务、管理服务与赛事运营服务。我们致力于打造学科竞赛生态，提升学科竞赛质量水准，推动“以赛促教、以赛促学、以赛促创”的高水平创新人才培养与大学生创新创业的发展，集中体现全国高校创新人才培养成果和学科竞赛转化成果</p>
                </div>
            </div>
        </div>
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
    .introductionPlatform{
        width: 100%;
        height: auto;
        .banner{
            max-width: 1920px;
            height: 610px;
            margin: 0 auto;
            background: url(https://web.moocollege.com/mooc/hzq/competition/introduction/platbanner.jpg) no-repeat;
            background-size: cover;
            background-position: center;
        }
        .main{
            width: 100%;
            background: #ffffff;
            padding: 200px 0;
            >div{
                width: 1000px;
                margin: 0 auto;
                height: 316px;
                img{
                    width: 316px;
                    float: left;
                }
                div{
                    height: 316px;
                    width: 560px;
                    float: right;
                    h1{
                        font-size: 48px;
                        color: #4A4A4A;
                        text-align: right;
                        margin:10px 0 25px;
                    }
                    p{
                        font-size: 20px;
                        color: #4A4A4A;
                        line-height: 30px;
                        text-indent: 2em;
                        text-align: left;
                        font-weight: 150;
                        
                    }
                }
            }
        }

    }
</style>

