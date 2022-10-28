<template>
    <ul class="clearfix">
        <li>
            <div>
                <i class="iconfont">&#xe68b;</i>
                <h3><span>基于阿里云的<br>分布式数据存储</span></h3>
                <p>通过多台存储服务器和位置服务器共同完成竞赛数据定位存储，它不但提高了系统的可靠性、可用性和存取效率，还易于扩展</p>
            </div>
        </li>
        <li class="l2">
            <div>
                <i class="iconfont" >&#xe696;</i>
                <h3><span>一体化竞赛执行服务</span></h3>
                <p>覆盖参赛报名、作品提交、专家评审、专家库管理、成绩管理、证书管理等赛事执行整套流程。</p>
             </div>
        </li>
        <li class="l3">
            <div>
                <i class="iconfont">&#xe693;</i>
                <h3><span>线上线下快捷评审</span></h3>
                <p>使用web端和微信小程序<br>满足线上、线下多种评审场景</p>
             </div>
        </li>
        <li class="l4">
            <div>
                <i class="iconfont">&#xe694;</i>
                <h3><span>电子证书管理和线上支付</span></h3>
                <p>支持在线支付报名费用、提供电子发票；在线发放电子获奖证书至<br>个人中心</p>
             </div>
        </li>
        <li class="l5">
            <div>
                <i class="iconfont">&#xe683;</i>
                <h3><span>基于数据的竞赛分析</span></h3>
                <p>主办方可随时调用下属各级竞赛数据，支持竞赛数据的可视化呈现</p>
             </div>
        </li>
        <li class="l6">
            <div>
                <i class="iconfont">&#xe68e;</i>
                <h3><span>大规模多层级<br>可视化赛事组织管理</span></h3>
                <p>采用自定义、自由关联的策略灵活生成赛事组织结构，满足大规模多层级赛事的需要，并通过组织结构图<br>可视化呈现管理</p>
             </div>
        </li>
        <li class="l7">
            <div>
                <i class="iconfont">&#xe691;</i>
                <h3><span>基于赛事线上培训与<br>证书认证</span></h3>
                <p>提供围绕竞赛的线上课程，支持参赛者自学与线上培训</p>
             </div>
        </li>
        <li class="l8">
            <div>
                <i class="iconfont">&#xe697;</i>
                <h3><span>专家库的授权与共享</span></h3>
                <p>专家库可由主办方授权给下级或相近学科竞赛组织共享使用</p>
             </div>
        </li>
    </ul>
</template>


<style lang="less" scoped>
ul{
    width: 1160px;
    margin: 0 auto;
    margin-top: 100px;
    li{
        margin: 20px 15px 0;
        width: 260px;
        height: 220px;
        background: #ffffff;
        border-top: 1px solid #e62323;
        overflow: hidden;
        float: left;
        text-align: center;
        padding-top: 40px;
        position: relative;
        cursor: pointer;
        >div{
            position: absolute;
            width: 100%;
            height: auto;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        i{
            font-size: 60px;
            color: #E62323;
        }
        h3{
            position: relative;
            height: 44px;
            line-height: 22px;
            overflow: hidden;
            margin: 10px auto;
            span{
                display: block;
                width: 230px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
                font-size: 16px;
                color: #4A4A4A;
            }
        }
        p{
            font-size: 13px;
            color: #4A4A4A;
            line-height: 18px;
            width: 230px;
            height: 90px;
            overflow: hidden;
            margin: 0 auto;
            display: none;
        }
    }
    li:hover{
        p{
            display: block;
        }
    }
    .l2{
         border-top: 1px solid #F5A623;
         i{
             color: #F5A623;
         }
    }
    .l3{
         border-top: 1px solid #F8C51C;
         i{
             color: #F8C51C;
         }
    }
    .l4{
         border-top: 1px solid #1EBD18;
         i{
             color: #1EBD18;
         }
    }
    .l5{
         border-top: 1px solid #CB55E3;
         i{
             color: #CB55E3;
         }
    }
    .l6{
         border-top: 1px solid #BA6BFF;
         i{
             color:#BA6BFF;
         }
    }
    .l7{
         border-top: 1px solid #0078E2;
         i{
             color: #0078E2;
         }
    }
    .l8{
         border-top: 1px solid #4AA1F2;
         i{
             color: #4AA1F2;
         }
    }

}
</style>
