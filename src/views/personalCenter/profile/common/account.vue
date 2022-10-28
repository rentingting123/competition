<template>
    <div>
        <div class="account" :class="{'account_div':show?true:false}">
                <!-- v-if="authority.bindWechat" -->
            <p class="account_title" @click="editShow" >
                <span class="name">{{$t('usercenter.BindSocialAccount')}}</span>
                <span class="cnt" v-if="isWechat">{{$t('usercenter.Bound')}}</span>
                <span class="cnt" v-else>{{$t('usercenter.Unbound')}}</span>
                <span class="edit">
                <em>{{$t('SSO.Bind')}}</em>
                <i class="el-icon-arrow-down" v-if="!show"></i>
                <i class="el-icon-arrow-up" v-else></i>
                </span>
            </p>
            <div class="bind_account" v-if="show">
                <i class="iconfont icon-weixin"></i>
                <p v-if="isWechat">{{$t('usercenter.Bound')}}</p>
                <p v-else class="wx_binding" @click="wxBinding">{{$t('usercenter.BindNow')}}</p>
            </div>
            <!-- end 绑定社交账号 -->
        </div>
        <!-- 绑定社交账号登录注册弹窗 -->
        <div class="logins" v-show="wechatActive">
            <div class="login_modals">
                <div class="qrcode_logins">
                <div class="login_heads">
                    <img src="https://web.moocollege.com/mooc/hzq/competition/home/logo1.png">
                    <i class="iconfont icon-guanbi" @click="wechatActive=false"></i>
                </div>
                <!-- 扫码登录 -->
                <div class="login_codes">
                    <p id="login_containers"></p>
                </div>
                </div>
            </div>
            <div v-show="wechatActive" class="bg" @click="wechatActive=false"></div>
        </div>
    </div>
</template>

<script>
import network from "@@/api/jxapi/index";
export default {
    props: ['isWechat', 'show'],
    data(){
        return{
            wechatActive: false, //绑定微信的弹出框

        }
    },
    created(){

    },
    methods:{
        editShow(){
            this.$emit('update:show', !this.show)
        },
        /**
         *
         * @Description: 绑定微信
         */
        wxBinding() {
            window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=wx131be88fce505f45&redirect_uri=http%3A%2F%2Fcc.moocollege.com%2F%23%2Fprofile&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
        },
    }
}
</script>

<style lang='less' scoped>
.account_title {
    cursor: pointer;
    height: 2.5rem;
    line-height: 2.5rem;
    position: relative;
    .name {
      display: inline-block;
      width: 12rem;
      text-align: left;
    }
    .edit {
      position: absolute;
      right: 1rem;
      cursor: pointer;
      em {
        margin-right: 1rem;
        color: #9b9b9b;
      }
      &:hover {
        em {
          color: #1d86ff;
        }
      }
    }
}

// 帐号绑定
.account {
    border: 1px solid #dedede;
    padding: 0 1rem;
    .bind_account {
      border-top: 1px solid #dedede;
      // margin-top:0.7rem;
      padding: 1rem;
      padding-top: 1.5rem;
      font-size: 0.8rem;
      text-align: center;
      i {
        font-size: 3rem;
      }
      p {
        border: 1px solid #1d86ff;
        border-radius: 4.9rem;
        font-size: 0.8rem;
        color: #1d86ff;
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        margin: 0 auto;
        margin-top: 1rem;
      }
      .wx_binding {
        cursor: pointer;
      }
    }
}
.noTopBorder{
    .account{
        border-top: 0;
    }
}

// 绑定账号展开
.account_div {
    border-radius: 0.5rem;
    margin: 1rem 0;
}

.login_modals {
    .qrcode_logins {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 30rem;
      height: 27.5rem;
      margin-left: -15rem;
      margin-top: -13.75rem;
      background: #fff;
      z-index: 1041;
      box-shadow: 0.1rem 0.2rem 0.3rem #000;
      border-radius: 0.3rem;
      padding: 1rem 1.5rem;
      .login_heads {
        position: relative;
        i {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
      // 二维码登录
      .login_codes {
        margin: 1rem;
        text-align: center;
        border-top: 1px solid #dedede;
        font-size: 1rem;
        p {
          img {
            width: 11.5rem;
            height: 11.5rem;
          }
        }
      }
    }
}
em {
  font-style: normal;
}
</style>