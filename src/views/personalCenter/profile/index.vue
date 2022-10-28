
<template>
  <div id="shezhi" class="shezhi">
    <div v-if="authority && authority.editUserInfo"  class="user_msg" :class="{'user_msg_div':!!msg_edit_show,'noBottomBorder':!msg_edit_show&&!phone_edit_show}">
      <p class="msg_title" @click="msg_edit_show=!msg_edit_show;phone_edit_show=false;pwd_edit_show=false;account_edit_show=false" :class="{'msg_edit_show':msg_edit_show?true:false}">
        <span class="name">{{$t('profile.information')}}</span>
        <span class="cnt" v-if="!msg_edit_show">{{ mName }}</span>
        <span class="cnt" style="color:#CB3A4C" v-else>{{$t('profile.improve')}}</span>
        <span class="edit">
          <em>{{$t('usercenter.Edit')}}</em>
          <i class="el-icon-arrow-down" v-if="!msg_edit_show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>
      <user v-show="msg_edit_show" :msg_edit_show="msg_edit_show" :setUser='setUser' ref='profileuser'></user>
    </div>
    <!-- 修改手机号 -->
    <Phone :contactPhone.sync='contactPhone' :show.sync='phone_edit_show' />
    <!-- 邮箱修改 -->
    <!-- <Email :email.sync='email' :show.sync='email_edit_show' :class="{'noTopBorder': !phone_edit_show && !email_edit_show}" /> -->
    <!-- 密码修改 -->
    <Pwd :show.sync='pwd_edit_show' :class="{'noTopBorder':!email_edit_show&&!pwd_edit_show}" />
    <!-- 微信绑定 -->
    <Account :isWechat='isWechat' :show.sync='account_edit_show' :class="{'noTopBorder': !pwd_edit_show&&!account_edit_show}" />
    <!-- 银行卡绑定 -->
    <Bank ref='bank' :show.sync='message_edit_show' :setUser='setUser' :class="{'noTopBorder':!account_edit_show&&!message_edit_show}" />
  </div>
</template>

<script>
import network from "@@/api/jxapi/index";
import { getHashParam, getUserInfo } from "@@/utils/commons";
import user from "./user/index";
import { mapState } from 'vuex';
import Email from './common/email';
import Phone from './common/phone';
import Pwd from './common/pwd';
import Account from './common/account';
import Bank from './common/bank';

export default {
  name: "shezhi",
  components: {
    user,
    Email,
    Phone,
    Pwd,
    Account,
    Bank,
  },
  data() {
    return {
      msg_edit_show: false, // 个人信息修改
      pwd_edit_show:false, // 密码修改
      phone_edit_show: false, // 手机号修改
      account_edit_show: false, // 绑定账号修改
      message_edit_show: false, //账户绑定
      email_edit_show: false, //邮箱修改
      mName: "", //个人信息处的姓名
      contactPhone: "", //手机号码
      email: "", //邮箱
      isWechat: 0, //是否绑定过微信
      
    };
  },
  computed:mapState(
    {authority: state => state.authorityManagement,}
  ),
  async created() {
    //获取个人信息
    this.getlocalUserInfo();

    // 绑定微信后运行
    const code = getHashParam("code");
    if (code) {
      let wechat = await network.bindingWechat({code:code});
      if(wechat=='error') return;
      this.$message.success(this.$t('usercenter.BindWechatSuccess'));
      this.getUserInfo();
    }
  },
  mounted() {
    this.msg_edit_show = !!this.$route.query.msg_edit_show;
  },
  methods: {
    async getlocalUserInfo() {
      const result = getUserInfo();
      this.setUser(result);
    },
    async getUserInfo() {
      const result = await network.getUserInfo();
      if (result == "error") return;
      this.setUser(result);
    },
    setUser(result) {
      this.mName = result.idcardName;
      this.contactPhone = result.contactPhone;
      this.email = result.email;
      this.isWechat = result.isWechat;
      if(this.$refs.bank){
        this.$refs.bank.init();
      }
      if(this.$refs.profileuser){
        this.$refs.profileuser.getlocalUserInfo();
      }
    },
    closeAll(name){
      this.msg_edit_show = false
      this.pwd_edit_show = false, // 密码修改
      this.phone_edit_show = false, // 手机号修改
      this.account_edit_show = false, // 绑定账号修改
      this.message_edit_show = false, //账户绑定
      this.email_edit_show = false, //邮箱修改
      this[name] = true
    }
  },
  watch:{
    msg_edit_show(val){
      if(val){
        this.closeAll('msg_edit_show')
      }
    },
    phone_edit_show(val){
      if(val){
        this.closeAll('phone_edit_show')
      }
    },
    email_edit_show(val){
      if(val){
        this.closeAll('email_edit_show')
      }
    },
    pwd_edit_show(val){
      if(val){
        this.closeAll('pwd_edit_show')
      }
    },
    account_edit_show(val){
      if(val){
        this.closeAll('account_edit_show')
      }
    },
    message_edit_show(val){
      if(val){
        this.closeAll('message_edit_show')
      }
    }
  }
};
</script>


<style lang="less" scoped>
.shezhi {
  font-size: 16px;
  color: #4a4a4a;
  // 个人信息
  .user_msg {
    border: 1px solid #dedede;
    padding: 0 1rem;
    .msg_title{
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
    // 个人信息展开
    &.user_msg_div {
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
    &.noBottomBorder {
      border-bottom: 0;
    }
  }
  
  .noTopBorder {
    border-top: 0;
  }
  
}
em {
  font-style: normal;
}
/deep/ .el-form-item__label {
  color: #787d81;
}
</style>
