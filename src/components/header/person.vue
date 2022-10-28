<template>
    <div class="users" :class="{'on':authority.managerPermission || authority.manageCompetitionAdmin}">
        <ul class="flearfix">
            <li v-if="authority.manageCompetitionAdmin">
                <a href="./#/admin" target="_blank">竞赛管理</a>
            </li>
            <li v-if="authority.managerPermission">
                <a href="/system/home" target="_blank" >组织管理</a>
            </li>
        </ul>

        <div class="avatarbg" >
            <el-badge :value="num" :hidden="num<=0" class="item">
                <el-avatar :size="36" :src="circleUrl"></el-avatar>
            </el-badge>
            <div class="details" >
                <div class="san" ></div>
                <div class="info">
                    <!-- <div @click="$router.push('/jingsai')">我的竞赛</div> -->
                    <div v-if="authority.manageMyCompetition" @click="$router.push('/jingsai')">{{$t('nav.MyContest')}}</div>
                    <!-- <div><el-badge :value="num" :hidden="num<=0">我的消息</el-badge></div> -->
                    <div @click="$router.push('/profile')">{{$t('nav.PersonalCenter')}}</div>
                    <div @click="$router.push('/mymsg')">
                        {{$t('nav.myMsg')}}<span v-if="istotal>0">({{istotal}})</span>
                    </div>
                    <div @click="rolechange">{{$t('nav.SwitchIdentity')}}</div>
                    <div @click="logout">{{$t('nav.LoginOut')}}</div>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {selectGroup} from '@@/utils/commons'
import network from '@/api/jxapi'
export default {
    props:['user'],
    data(){
        return{
            istotal:0,
            circleUrl: 'https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png',
            num: 0
        }
    },
    computed:{
        ...mapState({
            authority:state => state.authorityManagement
        }),
    },
    created(){
        if(this.user && this.user.icon){
            this.circleUrl = this.user.icon
        }
        this.getmymsg()
    },
    beforeCreate(){
        this.$store.dispatch('setAuthorityByCodeNoID',{
            // cId:this.competitionId,
            codes:['managerPermission','manageCompetitionAdmin','manageMyCompetition','managePersonalSettings']
        })

    },
    methods:{
        async getmymsg(){
      let res = await network.getUserMessage({data:{pageSize:5,pageNum:1}})
      if(res == 'error') return
      if(res.total>0){
        this.istotal = res.total
      }
    },
        rolechange(){
            selectGroup(()=>(this.$router.go(0)),true)
        },
        async logout () {
            let res = await network.setLoginOut();
            if(res=='error') return;
            this.$emit('changeCate', false)
            this.logined = false
            //登录信息
            localStorage.removeItem('login')
            //用户组织id
            localStorage.removeItem('groupId')
            //用户信息
            localStorage.removeItem('userInfo')
            //新手引导信息
            localStorage.removeItem('noviceGuide')
             this.$store.state.islogin = false;
            window.location.href = 'http://' + window.location.host
        },
    }
}
</script>

<style lang="less" scoped>
.users{
    // width: 255px;
    height: 45px;
    border-radius: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-badge{
        top: -8px;
    }
    .avatarbg{
        height: 25px;
        position: relative;
        margin-right: 16px;
        .details{
            position: absolute;
            left: -40px;
            top: 26px;
            width: 109px;
            font-size: 14px;
            color: #000000;
            z-index: 99999;
            display: none;
            .san{
                width:0;
                height:0;
                border-right:14px solid transparent;
                border-left:14px solid transparent;
                border-bottom:14px solid #ffffff;
                margin: 0 auto;
            }
            .info{
                width: 100%;
                background: #ffffff;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
                >div{
                    &:hover{
                        background: #F5F7F9;
                        box-shadow: 0 0 2px 0 #999999;
                    }
                }
            }
        }
    }
    .avatarbg:hover .details{
        display: block;
    }
    ul{
        display: none;
        font-size: 14px;
        li{
            line-height: 45px;
            width: 84px;
            text-align: left;
            display: inline-block;
            vertical-align: top;
            a{
                color: #767A7D;
            }
        }
    }
}
.users.on{
    // width: 255px;
    height: 45px;
    background: none;
    border-radius: 45px;
    ul{
        display: block;
    }
}
.users.firstPage{
    ul{
        li{
            a{
                color: #FFE039;
            }
        }
    }
}
</style>

<style lang="less">
.details .el-badge__content.is-fixed{
    transform: translateY(0) translateX(130%) !important;
}
</style>

