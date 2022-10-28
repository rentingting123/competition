<template>
    <!-- 账户绑定 -->
    <div class="account" :class="{'account_div':show?true:false}">
      <p class="account_title" @click="editShow">
        <span class="name">{{$t('usercenter.BindAccount')}}</span>
        <span class="cnt" v-if="bnankBindForm && bnankBindForm.bankNumber">{{$t('usercenter.Bound')}}</span>
        <span class="cnt" v-else>{{$t('usercenter.Unbound')}}</span>
        <span class="edit">
          <em>{{$t('usercenter.Edit')}}</em>
          <i class="el-icon-arrow-down" v-if="!show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>
      <div class="bind_account" v-if="show">
        <el-form :model="bnankBindForm" ref="bnankBindForm" label-width="5rem">
          <el-form-item
            prop="idcardNumber"
            :label="$t('usercenter.idCard')"
            :rules="[
                { required: true, message: $t('usercenter.idCardMess') },
                { min: 8, max: 18, message: $t('profile.idcardNumberMess1'), trigger: 'blur' }
            ]"
          >
            <el-input :placeholder="$t('usercenter.idCardMess')" v-model="bnankBindForm.idcardNumber"></el-input>
          </el-form-item>
          <el-form-item
            prop="bankAddress"
            :label="$t('usercenter.bank')"
            :rules="[
                { required: true, message: $t('usercenter.bankMess') },
            ]"
          >
            <el-input :placeholder="$t('usercenter.bankMess')" v-model="bnankBindForm.bankAddress"></el-input>
          </el-form-item>
          <el-form-item
                prop="bankNumber"
                :label="$t('usercenter.bankAccount')"
                :rules="[
                    { required: true, message: $t('usercenter.bankAccountMess') },
                ]"
              >
              <el-input :placeholder="$t('usercenter.bankAccountMess')" v-model="bnankBindForm.bankNumber"></el-input>
          </el-form-item>
          <el-form-item>
        <el-button 
              type="primary"
              style="width:6rem;font-size:0.8rem;margin-left:5rem"
              @click="bankSubm('bnankBindForm')"
            >{{$t('usercenter.save')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- end账户绑定 -->
</template>

<script>
import { getUserInfo } from "@@/utils/commons";
import network from "@@/api/jxapi/index";
export default {
    props: ['show', 'setUser'],
    data(){
        return{
            bnankBindForm:{
                idcardNumber:'',
                bankAddress:'',
                bankNumber:''
            },
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            let result = getUserInfo()
            if(result){
                this.bnankBindForm = result
            }
        },
        editShow(){
            this.$emit('update:show', !this.show)
        },
        // 银行个人信息提交
        bankSubm(formName) {
            let user = getUserInfo()
            if(!user || user.type==3 || user.type==4){
                return this.$message(this.$t('usercenter.WithoutPermission'))
            }

            this.$refs[formName].validate(async (valid, obj) => {
                if (!valid) return;
                let params = {
                    idcardNumber: this.bnankBindForm.idcardNumber,
                    bankAddress: this.bnankBindForm.bankAddress,
                    bankNumber: this.bnankBindForm.bankNumber
                }
                let res = await network.updateUserBankInfo({data: params})
                if(res=='error') return;
                let user = await network.getUserInfo();
                if (user == "error") return this.$message(this.$t('usercenter.setSuccessButNoMess'));
                this.$message.success(this.$t('usercenter.saveSuccess'));
                localStorage.setItem("userInfo", JSON.stringify(user));
                this.setUser && this.setUser(user, true);
            });
        },
    }
}
</script>

<style lang='less' scoped>
// 绑定账号展开
.account_div {
    border-radius: 0.5rem;
    margin: 1rem 0;
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
em {
  font-style: normal;
}

</style>