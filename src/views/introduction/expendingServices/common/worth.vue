<template>
    <ul class="clearfix">
        <li>
            <p class="i"><i class="iconfont">&#xe698;</i></p>
            <h3>主页搭建</h3>
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe66f;</i></p>
            <h3>报名登录</h3>
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe66e;</i></p>
            <h3>宣传运营</h3>
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe67f;</i></p>
            <h3>成果展示</h3>
        </li>
    </ul>
</template>

<style lang="less" scoped>
ul{
    width: 1100px;
    margin: 0 auto;
    margin-top: 88px;
    li{
        width: 200px;
        margin-right: 100px;
        text-align: center;
        float: left;
        .i{
            margin: 0 auto;
            width: 150px;
            height: 150px;
            line-height: 150px;
            border-radius: 100%;
            background: #F9F9FA;
            i{
                font-size: 65px;
                color: #78BEFF;
            }
        }
        .i:hover{
            background: #78BEFF;
            i{
                 color: #FAFAFA;
            }
        }
        h3{
            font-size: 16px;
            color: #4A4A4A;
            margin: 24px 0 10px 0;
        }
        .mess{
            font-size: 13px;
            color: #4A4A4A;
        }

    }
    :nth-child(4n){
        margin-right: 0;
    }
}
</style>
