<template>
    <div id="Header">
        <div class="Header" :class="typeClass">
            <nav class="nav">
                <router-link to="/" >
                    <img v-if="index=='homepage'" src="https://web.moocollege.com/mooc/hzq/competition/newcc/%E7%99%BD.png" class="logo">
                    <img v-else-if="logo" :src="logo" class="logo" />
                </router-link>
                <div class="nav-main">
                    <div class="nav-center">
                        <el-menu :default-active="index" class="el-menu-demo" mode="horizontal" >
                            <el-menu-item index="homepage" @click="$router.push('/')"><a>{{$t('nav.Home')}}</a></el-menu-item>
                            <el-menu-item index="competition" @click="$router.push('/competition')"> <a>{{$t('nav.Center')}}</a></el-menu-item>
                            <el-menu-item index="helpcenter" @click="$router.push('/helpcenter')"> <a>{{$t('nav.helpcenter')}}</a></el-menu-item>
                            <el-menu-item index="experience" @click="$router.push('/experience')"> <a>体验中心</a></el-menu-item>
                        </el-menu>
                    </div>
                    <div class="nav-right" v-if="!logined">
                        <span @click="tologin">{{$t('nav.Login')}}</span>
                        <span>/</span>
                        <span @click="toregister">{{$t('nav.Register')}}</span>
                    </div>
                    <div class="nav-right" v-else>
                        <div class="user">
                            <users :user="user" @changeCate="changeCate" :class="{'firstPage':typeClass=='on'}"/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import network from '@/api/jxapi/index.js'
import { loadStyle, addClass, getUserInfo } from '@/utils/commons'
import { tologin , toregister } from '@/utils/util'
import { mapState } from 'vuex'
import { getToken } from '../../utils/oauth'
import users from './person'

export default {
    props:['index'],
    components:{
        users
    },
    data() {
        return {
            // user_info: false,
            logined: '', // 是否已登录,
            user: {
                idcardName: null,
                icon: null,
                isAdmin: false,
            },
            logo: null
        }
    },
    computed:{
        ...mapState({
            authority:state => state.authorityManagement,
            islogin:state =>state.islogin
        }),
        typeClass(){
            if(this.index=='homepage'){
                return 'on'
            }else if(this.$route.path == '/competition'){
                return 'on'
            }else if(this.$route.path == '/searchteam'){
                return 'oncom'    
            }else{
                return ''
            }
            
        }
    },
    methods: {
        changeCate(){
            this.logined = false
        },
        tologin(){
            tologin()
        },
        toregister(){
            toregister();
        },
        async getUserInfo(){
           if(this.logined){
             let user = await  network.getUserInfo()
             if(user=='error') return
             this.user = user
           }
        },
        async init(){
            let pageset =await network.getPagesSetting();
            if(pageset=='error') return;

            this.logo = pageset.logo
            if (pageset.theme) {
                addClass(pageset.theme)
                loadStyle(`/static/theme/${pageset.theme}/style.css`)
            }

            this.logined = this.islogin || getToken()
            if(this.logined) this.user=getUserInfo()
            else this.getUserInfo()
        },
    },
    created() {
        this.init()
    },
    watch:{
        islogin(val){
            this.logined = val;
            if(this.logined) this.user=getUserInfo()
            else this.getUserInfo()
        }
    }
}
</script>


<style lang="less" scoped>
.Header{
    width: 100%;
    height: 60px;
    background: #ffffff;
    .el-menu{
        border-bottom:none;
        background: none;
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, 
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
        background: none;
        a{
            border: 1px solid #6283FF;
        }
    }
    .el-menu-item{
        a{
            color: #6283FF;
            border: 1px solid transparent;
            padding: 7px 12px;
            border-radius: 4px;
            font-size: 14px;
        }
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border: none;
        a{
            border: 1px solid #6283FF;
        }
    }
    .nav{
        width: 1200px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        margin: auto;
        .logo {
            width: auto;
            height: auto;
            max-height: 60px;
        }
        .nav-main{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .nav-right{
                position: relative;
                margin-left: 20px;
                span{
                    color: #4A4A4A;
                    font-size: 14px;
                    cursor: pointer;
                    &:hover{
                        color: #6283ff;
                    }
                }
            }
        }
    }
}
.Header.oncom{
    background-color: #1B2630;
}
.Header.on{
    background: linear-gradient(180deg, rgba(0 , 0, 0, .5) 0%, rgba(191, 2, 5, 0) 100%);
    position: absolute;
    top: 0;
    z-index: 3;
   
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, 
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
        background: none;
        a{
            border: 1px solid #ffffff;
        }
    }
    .el-menu-item{
        a{
            color: #ffffff;
            border: 1px solid transparent;
        }
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border: none;
        a{
            border: 1px solid #ffffff;
        }
    }
    .nav{
        .nav-main{
            .nav-right{
                span{
                    color: #ffffff;
                    &:hover{
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>

