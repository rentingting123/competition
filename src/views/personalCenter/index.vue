<template>
  <div id="personalCenter">
    <div class="user_center">
      <div class="center_banner">
        <div class="banner_content">
          <div class="head_name">
            <div class="banner_head">
              <!--<img v-if="!peoInfo.icon" src="/static/img/user_center/head1.png" alt="">-->
              <!--<img v-else :src="peoInfo.icon" alt="">-->
              <img v-if="user.icon" :src="user.icon" alt>
              <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png">
            </div>
            <div class="name_intro">
              <p class="name">
                <span>{{user.idcardName}}</span>
                <img v-if="user.gender === 2" src="https://web.moocollege.com/mooc/hzq/competition/user_center/female.png" alt>
                <img v-if="user.gender === 1" src="https://web.moocollege.com/mooc/hzq/competition/user_center/male.png" alt>
              </p>
              <p class="intro"><span>{{user.signature}}</span>~</p>
            </div>
          </div>
          <div class="score">
            <p>304</p>
            <p>积分</p>
          </div>
        </div>
      </div>
      <!-- end center banner 头部 -->
      <div class="center_main">
        <div class="tag_list">
          <ul>
            <router-link :to="{path:'/jingsai'}" tag="li" v-if="authority.manageMyCompetition">
              <i class="iconfont">&#xe618;</i>
              <span>{{$t('nav.MyContest')}}</span>
            </router-link>
            <router-link :to="{path:'/personalCenter'}" tag="li" v-if="authority.manageMyTeam">
              <i class="iconfont">&#xe6a3;</i>
              <span>{{$t('usercenter.MyTeam')}}</span>
            </router-link>
            <router-link :to="{path:'/xuexi'}" tag="li" v-if="authority.manageMyStudy">
              <i class="iconfont">&#xe615;</i>
              <span>{{$t('usercenter.Study')}}</span>
            </router-link>
            <router-link :to="{path:'/credential'}" tag="li" v-if="authority.manageHonor">
              <i class="iconfont">&#xe61a;</i>
              <span>{{$t('usercenter.Honor')}}</span>
            </router-link>
            <router-link :to="{path:'/chengchang'}" tag="li" v-if="authority.manageGrowUp">
              <i class="iconfont">&#xe616;</i>
              <span>{{$t('usercenter.Growth')}}</span>
            </router-link>
            
            <!-- <router-link :to="{path:'/renzheng'}" tag="li">
              <i class="iconfont">&#xe619;</i>
              <span>认证体系</span>
            </router-link> -->
            <router-link :to="{path:'/profile'}" tag="li" >
            <!-- v-if="authority.managePersonalSettings" -->
              <i class="iconfont">&#xe61b;</i>
              <span>{{$t('usercenter.Setting')}}</span>
            </router-link>
             <!-- <router-link :to="{path:'/huaxiang'}" tag="li" v-if="authority.manageGrowUp">
              <i class="iconfont">&#xe616;</i>
              <span>{{$t('usercenter.huaxiang')}}</span>
            </router-link> -->
             <router-link class="mymsg" :to="{path:'/mymsg'}" tag="li" v-if="authority.manageGrowUp">
              <i class="iconfont">&#xe616;</i>
              <span>{{$t('usercenter.myMsg')}}
                <span v-if="istotal > 0">({{istotal}})</span>
              </span>
              
            </router-link>
            <router-link v-if="user.type==0" :to="{path:'/adminPlatformConfig'}" tag="li">
              <i class="iconfont">&#xe655;</i>
              <span>平台管理</span>
            </router-link>
          </ul>
        </div>

        <div class="center_content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import network from "@/api/jxapi/index";
import { getUserInfo } from "Lib/commons";
import { tologin } from '@/utils/util'
import { mapState } from 'vuex'
export default {
  name: "personalCenter",
  data() {
    return {
      isshow:false,
      istotal:0,
      user: {
        idcardName: null,
        icon: null,
        signature: null,
        gender: null,
        isGroupAdmin: false,
        
      }
    };
  },
    computed: mapState({
      authority: state => state.authorityManagement,
  }),
  methods: {
    async getmymsg(){
      let res = await network.getUserMessage({data:{pageSize:5,pageNum:1}})
      if(res == 'error') return
      if(res.total>0){
        this.isshow = true
        this.istotal = res.total
      }
    },
    async getUserInfo() {
      const list = await network.getUserInfo();
      if (list == "error") {
        
      } else {
        this.user = list;
      }
    }
  },
  created() {
    this.getmymsg()
    // this.getUserInfo();
    this.$store.dispatch('AuthorityPersonal')
    const user = getUserInfo()
    if(user){
      this.user = user;
    }else{
      tologin();
    }
  }


};
</script>


<style lang="less" scoped>
.user_center {
  width: 100%;
  min-height: calc(100vh - 5rem - 170px);
  background: #fff;
  // 头部
  .center_banner {
    background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/user_center_bg.jpg") no-repeat
      100% 100%;
    background-size: cover;
    width: 100%;
    height: 10rem;
    .banner_content {
      width: 56rem;
      margin: 0 auto;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 7rem 0 3rem;
      .head_name {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .banner_head {
          width: 6.2rem;
          height: 6.2rem;
          background: #fff;
          padding: 2px;
          border-radius: 50%;
          img {
            width: 6.2rem;
            height: 6.2rem;
            border-radius: 50%;
          }
        }
        .name_intro {
          text-align: left;
          margin-left: 3rem;
          .name {
            span {
              font-size: 1.8rem;
              color: #ffffff;
              letter-spacing: 0.36rem;
              font-weight: bold;
            }
            img {
              width: 1rem;
              margin-top: -0.75rem;
              margin-left: 0.75rem;
            }
          }
          .intro {
            font-size: 0.7rem;
            color: #b3b3b3;
            letter-spacing: 1px;
            margin-top: 0.5rem;
            background: transparent;
          }
        }
      }
      .score {
        display: none;
        p:first-child {
          font-size: 1.2rem;
          color: #dedede;
          font-weight: bold;
        }
        p:last-child {
          font-size: 0.7rem;
          color: #dedede;
          letter-spacing: 1px;
          margin-top: 0.2rem;
        }
      }
    }
  }
  .mymsg{
    position: relative;
    >div{
          position: absolute;
      top: 6px;
      right: 8px;
      }
  }
  // 主体
  .center_main {
    // width: 56rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    // overflow-x: scroll;
    padding: 2rem 0 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // 导航栏列表
    .tag_list {
      text-align: left;
      width: 18%;
      margin-right: 1rem;
      ul {
        // padding-left:1rem;
        li {
          &.router-link-exact-active {
            background: #1d86ff;
            color: #fff;
          }
          &:hover {
            color: #1d86ff;
          }
          &.router-link-exact-active:hover {
            color: #fff;
          }
          border-radius: 0.25rem;
          width: 9.5rem;
          height: 2.75rem;
          line-height: 2.75rem;
          font-size: 0.9rem;
          color: #787d81;
          padding-left: 1.2rem;
          cursor: pointer;
          margin-bottom: 0.3rem;
          i {
            margin-right: 0.7rem;
          }
        }
      }
    }
    .center_content {
      flex: 1;
      width: 80%;
      text-align: left;
      padding: 0.5rem;
      padding-right: 0;
    }
  }
}
</style>

