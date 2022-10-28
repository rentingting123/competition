<template>
    <div class="apply">
        <div class="button" @click="show=true">点击申请体验</div>

        <el-dialog :visible.sync="show" >
            <div slot="title" class="title">
                申请体验
            </div>

            <div class="main">
                <div class="mess">请填写您的基本信息，工作人员审核完毕后，系统将会将资料发送至您的邮箱</div>
                <el-form
                    :model="userMessage"
                    :rules="rules"
                    ref="userMessage"
                    label-position="left"
                    >
                    <el-form-item prop="name" label="姓名" label-width="80px">
                        <el-input placeholder="请输入您的姓名" v-model="userMessage.name"></el-input>
                    </el-form-item>

                    <el-form-item prop="tel" label="手机号" label-width="80px">
                        <el-input placeholder="请输入您的手机号" maxlength="11" v-model="userMessage.tel"></el-input>
                    </el-form-item>

                    <el-form-item prop="smsCode"  label="验证码" label-width="80px">
                        <el-input v-model="userMessage.smsCode" placeholder="请输入验证码">
                            <template slot="append">
                                <div class="sendmess">
                                <p v-if="seconds == 0" @click="send">
                                    {{ $t("newHome.sendCode") }}
                                </p>
                                <p v-else class="seconds">{{ seconds }}s</p>
                                </div>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="email" label="邮箱" label-width="80px">
                        <el-input placeholder="请输入邮箱" v-model="userMessage.email"></el-input>
                    </el-form-item>
                </el-form>
                <div class="uploadMess">
                    <el-checkbox v-model="agree">
                        <span>我已阅读并同意<a href="javascript:void()"></a></span>
                    </el-checkbox>
                    <disclaimer />
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="show=false">关闭</el-button>
                <el-button type="primary" :disabled='!agree' @click="submit('userMessage')">提交</el-button>
            </span>
        </el-dialog> 
    </div>
</template>

<script>
import util from '@@/utils/util'
import network from '@@/api/jxapi'
import disclaimer from './disclaimer'
export default {
    components:{
        disclaimer
    },
    data(){
        return{
            show: false,
            userMessage: {},
            rules: {
                name: [{ required: true, message: "请输入您的名字", trigger: "blur" }],
                tel: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮箱", trigger: ["blur", "change"],},
                ],
                smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            },
            seconds: 0,
            uuid:util.randomChar(8),
            agree: false,

        }
    },
    methods:{
        async send() {
            if (!util.checkPhone(this.userMessage.tel)) {
                return this.$message.warning("请输入正确的手机号");
            }
            const res = await network.sendSmsCode({
                data: { mobile: this.userMessage.tel },
                headers: { deviceId: this.uuid },
            });
            if (res == "error") return;

            this.seconds = 59;
            let interval = setInterval(() => {
                if (this.seconds <= 1) {
                clearInterval(interval);
                }
                this.seconds--;
            }, 1000);
        },
        submit(formName){
            this.$refs[formName].validate(async (valid, obj) => {
                if (!valid) return;
                
                let data = {
                    email: this.userMessage.email,
                    name: this.userMessage.name,
                    mobile:this.userMessage.tel,
                };

                let res = await network.sendApply({
                    data:data,
                    urlData:{
                        mobile:this.userMessage.tel,
                        smsCode:this.userMessage.smsCode
                    },
                    headers:{deviceId:this.uuid}
                });
                if (res == "error") return;
                this.$message.success('提交成功')
                this.show = false;
            })
        }
    }
}
</script>

<style lang='less' scoped>
.apply{
    .button{
        width: 267px;
        height: 66px;
        line-height: 66px;
        background: #6283FF;
        border-radius: 66px;
        font-size: 34px;
        font-weight: bold;
        color: #FFFFFF;
        text-align: center;
        margin: 0 auto;
        cursor: pointer;
        animation: identifier 1s infinite linear;
    }
}

@keyframes identifier {
    0% {transform: scale(1);}
    50% {transform: scale(0.95);}
    100% {transform: scale(1);}
}

/deep/.el-dialog__header, /deep/.el-dialog__footer{
    padding: 0;
}

.title{
    text-align: left;
    border-bottom: 1px solid #eee;
    line-height: 54px;
    font-size: 16px;
    font-weight: bold;
    color: #4A4A4A;
    padding: 0 20px;
}
.dialog-footer{
    border-top: 1px solid #eee;
    display: block;
    padding: 10px 20px;
}
.main{
    width: 380px;
    margin: 0 auto;
    padding: 40px 0;
    .mess{
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #818181;
        line-height: 29px;
        letter-spacing: 3px;
        text-align: left;
        margin-bottom: 20px;
    }
    .uploadMess {
        margin: 20px 0 16px;
        text-align: right;
    }
}


</style>