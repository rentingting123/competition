<template>
    <ul class="clearfix">
        <li>
            <p class="i"><i class="iconfont">&#xe686;</i></p>
            <h3>高效办赛</h3>
            <p class="mess">让竞赛变得简单</p>
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe681;</i></p>
            <h3>共享赛事生态</h3>
            <p class="mess">共建共享赛事生态资源、有效推动学科竞赛发展与创新人才培养</p>
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe688;</i></p>
            <h3>扩大赛事影响</h3>
            <p class="mess">吸引、汇聚各类赛事主办方、<br>参赛方，有效传播赛事资讯、<br>提高赛事影响</p>
        </li>
        <li>
            <p class="i"><i class="iconfont">&#xe67f;</i></p>
            <h3>沉淀竞赛成果</h3>
            <p class="mess">大赛信息、竞赛数据及竞赛成果在赛事平台持续留存、促进赛事成果持续发酵</p>
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
            background: #FAFAFA;
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
