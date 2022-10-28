<template>
    <ul class="clearfix">
        <li>
            <p class="i"><i class="iconfont">&#xe690;</i></p>
            <h3>赛事创建</h3>
        </li>
        <li class="next">
           >
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe66f;</i></p>
            <h3>竞赛报名</h3>
        </li>
        <li class="next">
           >
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe66e;</i></p>
            <h3>宣传运营</h3>
        </li>
        <li class="next">
           >
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe629;</i></p>
            <h3>专家评审</h3>
        </li>
        <li class="next">
           >
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe682;</i></p>
            <h3>竞赛管理</h3>
        </li>
    </ul>
</template>

<style lang="less" scoped>
ul{
    width: 1280px;
    margin: 0 auto;
    margin-top: 88px;
    li{
        width: 183px;
        margin-right: 40px;
        text-align: center;
        float: left;
        .i{
            margin: 0 auto;
            width: 102px;
            height: 102px;
            line-height: 102px;
            border-radius: 100%;
            background: #78BEFF;
            i{
                font-size: 54px;
                color: #FAFAFA;
            }
        }
        // .i:hover{
        //     background: #ffffff;
        //     i{
        //          color: #78BEFF;
        //     }
        // }
        h3{
            font-size: 16px;
            color: #5871A9;
            margin: 24px 0 10px 0;
            font-weight: bold;
        }

    }
    li:nth-child(5){
        margin-right: 0;
    }
    li.next{
        width: 10px;
        height: 102px;
        line-height: 102px;
        color: #0078E2;
        font-size: 30px;
        font-weight: bold;
    }
}
</style>
