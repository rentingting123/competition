<template>
    <div class="phone" :class="{'phone_div':show?true:false}">
        <!-- v-if="authority.editPassword" -->
      <p class="phone_title" @click="editShow">
        <span class="name">{{$t('usercenter.ModifyPassword')}}</span>
        <span class="edit">
          <em>{{$t('usercenter.Edit')}}</em>
          <i class="el-icon-arrow-down" v-if="!show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>
      <!-- 密码修改 -->
      <div class="change_phone" v-if="show">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item  :label="$t('usercenter.OldPassword')" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('usercenter.NewPassword')" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('usercenter.ConfirmPassword')" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('SSO.Submit')}}</el-button>
            <el-button @click="resetForm('ruleForm')">{{$t('usercenter.Reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- end 密码修改 -->
    </div>
</template>

<script>
import network from "@@/api/jxapi/index";
import { checkPassword } from "@@/utils/util"
export default {
    props: ['show'],
    data(){
        var checkPwd = (rule, value, callback) => {
            if (!value) {
                return callback(new Error(this.$t('usercenter.OldPasswordnotNull')));
            }else{
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
           if (!checkPassword(value)) {
                callback(new Error(this.$t('usercenter.EnterNewPassword')));
            } else {
                if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('usercenter.repassword')));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error(this.$t('usercenter.pwdIsDifferent')));
            } else {
                callback();
            }
        };
        return{
            ruleForm: {
                pass: '',
                checkPass: '',
                pwd: ''
            },
            rules: {
                pass: [
                    { required:true, validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required:true, validator: validatePass2, trigger: 'blur' }
                ],
                pwd: [
                    { required:true, validator: checkPwd, trigger: 'blur' }
                ]
            },
        }
    },
    created(){

    },
    methods:{
        editShow(){
            this.$emit('update:show', !this.show)
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) return false;
                let result = await network.changePwd({data:{newPassword:this.ruleForm.pass,oldPassword:this.ruleForm.pwd}});
                if(result=="error") return;
                this.$message.success(this.$t('usercenter.savePwdSuccess'))
                
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
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
// 修改手机号展开
.phone_div {
    border-radius: 0.5rem;
    margin: 1rem 0;
}
.phone_title{
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