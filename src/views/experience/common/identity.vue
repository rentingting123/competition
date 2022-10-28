<template>
    <div class="identity">
        <h2>了解身份</h2>
        <h3>
            摩课云竞赛分为6种身份，点击身份可查看详细操作手册。
            <span>请在每周五完成体验流程</span>
        </h3>
        <ul>
            <li v-for="item in datas" :key="item.id" @click="toHref(item)">
                <img :src="item.icon" alt="">
                <h4>{{item.title}}</h4>
                <p class="mess">
                    <span v-for="mess,i in item.mess" :key="i">{{mess}}</span>
                </p>
                <div class="buttom" >
                    <p class="hidden">查看操作手册</p>
                    <p class="show">选择该身份</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            datas:[
                {
                    icon: 'http://web.moocollege.com/mooc/hzq/competition/identity/1.png',
                    title: '主办方',
                    mess: ['竞赛管理员拥有竞赛管理','最高权限，主办方单位使用'],
                    id: 1,
                    url: '/helpcenter?type=3'
                },
                {
                    icon: 'http://web.moocollege.com/mooc/hzq/competition/identity/2.png',
                    title: '报名管理员',
                    mess: ['进行竞赛批量报名导入','并拥有管理、审核等权限'],
                    id: 2,
                    url: '/helpcenter?type=5'
                },
                {
                    icon: 'http://web.moocollege.com/mooc/hzq/competition/identity/3.png',
                    title: '评审专家',
                    mess: ['评委是该竞赛评审专家','账号可由主办方直接导入'],
                    id: 3,
                    url: '/helpcenter?type=4'
                },
                {
                    icon: 'http://web.moocollege.com/mooc/hzq/competition/identity/4.png',
                    title: '指导老师',
                    mess: ['对参赛团队','拥有编辑管理权限'],
                    id: 4,
                    url: '/helpcenter?type=2'
                },
                {
                    icon: 'http://web.moocollege.com/mooc/hzq/competition/identity/5.png',
                    title: '参赛队长',
                    mess: ['对参赛团队','拥有编辑管理权限'],
                    id: 5,
                    url: '/helpcenter?type=2'
                },
                {
                    icon: 'http://web.moocollege.com/mooc/hzq/competition/identity/6.png',
                    title: '参赛成员',
                    mess: ['报名参加个人赛、团体赛、','提交作品。可直接注册'],
                    id: 6,
                    url: '/helpcenter?type=2'
                }
            ]
        }
    },
    methods:{
        toHref(item){
            if(item && item.url){
                this.$router.push(item.url)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.identity{
    width: 1200px;
    margin: 0 auto;
    h2{
        font-size: 30px;
        font-weight: 500;
        color: #4A4A4A;
        line-height: 45px;
        letter-spacing: 1px;
        margin-top: 40px;
    }
    h3{
        font-size: 14px;
        font-weight: 400;
        color: #4A4A4A;
        line-height: 24px;
        margin-top: 8px;
        span{
            color: #6283FF;
        }
    }
    ul{
        border: 1px solid #EDEDED;
        margin: 20px 0 40px;
        li{
            display: inline-block;
            vertical-align: top;
            width: 198px;
            height: 295px;
            border-right: 1px solid #ededed;
            cursor: pointer;
            &:nth-child(6){
                border-right: none;
            }
            
            img{
                width: 70px;
                height: 70px;
                border-radius: 100%;
                margin: 43px auto 24px;
            }
            h4{
                font-size: 20px;
                font-weight: 500;
                color: #4A4A4A;
                line-height: 30px;
                letter-spacing: 2px;
            }
            .mess{
                height: 52px;
                font-size: 14px;
                font-weight: 400;
                color: #4A4A4A;
                line-height: 26px;
                margin: 10px 0;
                span{
                    display: block;
                }
            }
            .buttom{
                p{
                    width: 159px;
                    height: 37px;
                    line-height: 37px;
                    text-align: center;
                    border: 1px solid #5375FE;
                    font-size: 14px;
                    font-weight: 400;
                    color: #6283FF;
                    margin: 0 auto;
                }
                .show{
                    display: block;
                    border: 1px solid #fff;
                }
                .hidden{
                    display: none;
                }
            }
            &:hover{
                box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.11);
                .buttom{
                    .show{
                        display: none;
                    }
                    .hidden{
                        display: block;
                    }
                }
            }

        }
    }

}
</style>