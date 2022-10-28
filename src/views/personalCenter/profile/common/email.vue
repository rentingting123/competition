<template>
    <div class="phone" :class="{'phone_div':show?true:false}">
      <p class="phone_title" @click="editShow" >
        <span class="name">邮箱</span>
        <span class="cnt">{{ email }}</span>
        <span class="edit">
          <em>{{$t('usercenter.Edit')}}</em>
          <i class="el-icon-arrow-down" v-if="!show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>
      <div class="change_phone" v-if="show">
        <el-form :model="phoneBindForm" ref="phoneBindForm" label-width='6rem'>
          <el-form-item prop="mobile" label="修改邮箱" :rules="[{ required: true, validator: checkEmails, trigger: 'blur'}]">
            <el-input placeholder="请输入邮箱绑定" v-model="phoneBindForm.mobile" style="width:14.4rem"></el-input>
          </el-form-item>
          <el-form-item prop="smsCode" label="邮箱验证码" :rules="[{ required: true, message: '收到的验证码', trigger: 'blur' },{  min: 6, max: 6, message: '验证码错误', trigger: 'blur' }]">
            <el-input placeholder="收到的验证码" v-model="phoneBindForm.smsCode" style="width:7.75rem;margin-right:1rem"></el-input>
            <el-button  type="primary" v-if="seconds==0?true:false" @click="getAuthCode()" >获取验证码</el-button>
            <span v-else>重新获取({{seconds}})</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormPhone('phoneBindForm')">绑定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import network from "@@/api/jxapi/index";
import { checkEmail } from "@@/utils/util";
export default {
    props: ['email', 'show'],
    data(){
        return{
            seconds: 0,
            phoneBindForm: { mobile: "", smsCode: "" }, // 手机号绑定表单
            uuidCode: "", //uuid唯一的状态码
        }
    },
    created(){
        this.uuidCode = this.uuid(); //这是获取手机验证码时请求头的机器随机标识码
    },
    methods:{
        checkEmails(rule, value, callback) {
          if (!value) {
            return callback(new Error(this.$t('profile.emailMess')));
          }
          setTimeout(() => {
            if (checkEmail(value)) {
              callback();
            } else {
              callback(new Error(this.$t('profile.emailMessRight')));
            }
          }, 100);
        },
        editShow(){
            this.$emit('update:show', !this.show)
        },
        uuid() {
            let s = [];
            let hexDigits = "0123456789abcdef";
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            let uuid = s.join("");
            return uuid;
        },
        // 获取验证码
        async getAuthCode() {
            if(!this.phoneBindForm.mobile) return this.$message.warning('请填写邮箱');
            const res =await network.sendSmsCode(
                {
                data:{mobile: this.phoneBindForm.mobile},
                headers:{deviceId:this.uuidCode}
                })
            if(res=='error') return;

            this.$message.success('验证码已发送，请注意查收！');
            let _this = this;
            this.seconds = 59;
            let secTimer = setInterval(function() {
                _this.seconds--;
                if (_this.seconds == 0) {
                    clearInterval(secTimer);
                }
            }, 1000);
        },
        submitFormPhone(formName) {
          this.$refs[formName].validate(async valid => {
              if (valid) {
              // 验证是否有正在进行的团队
              const res = await network.phoneStatus({data:{
                  mobile: this.email
              }});
              if(res=='error') return;

              const phone = await network.modifyMobile({data:{...this.phoneBindForm, email: true},headers:{deviceId:this.uuidCode}})
              if(phone=='error') return;
                  this.$message.success('修改成功');
                  this.$emit('update:email', this.phoneBindForm.mobile)
                  this.phoneBindForm.mobile = "";
                  this.phoneBindForm.smsCode = "";
              } else {
                  console.log("error submit!!");
                  return false;
              }
          });
        },
    },
    watch:{
        show(val){
            if(val){
                this.close && this.close(1)
            }
        }
    }
}
</script>

<style lang='less' scoped>
// 手机号
.phone {
    border: 1px solid #dedede;
    padding: 0 1rem;
    .change_phone {
        border-top: 1px solid #dedede;
        // margin-top:0.7rem;
        padding: 1rem;
        padding-top: 1.5rem;
        font-size: 0.8rem;
        label {
        text-align: left;
        font-size: 0.8rem;
        color: #787d81;
        span {
            font-size: 0.8rem;
        }
        }
        input {
        font-size: 0.8rem;
        }
    }
}
.phone_div {
    border-radius: 0.5rem;
    margin: 1rem 0;
}
.phone_title {
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