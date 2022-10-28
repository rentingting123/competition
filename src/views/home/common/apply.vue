<template>
    <div class="apply" id='apply'>
        <div>
            <h3>{{$t('newHome.apply')}}</h3>
            
            <el-form label-position="right" label-width="80px" class="form" :model="formLabelAlign">
                <el-form-item :label="$t('newHome.competitionName')">
                    <el-input v-model="formLabelAlign.name" :placeholder="$t('newHome.competitionNameMess')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('newHome.applyMobile')">
                    <el-input v-model="formLabelAlign.mobile" :placeholder="$t('newHome.applyMobileMess')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('newHome.applyCode')">
                    <el-input v-model="formLabelAlign.smsCode" :placeholder="$t('newHome.applyCodeMess')">
                        <template slot="append">
                            <div class="sendmess">
                                <p v-if="seconds==0" @click="send">{{$t('newHome.sendCode')}}</p>
                                <p v-else class="seconds">{{seconds}}s</p>
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>

            <div class="submit" @click="submit">{{$t('newHome.apply')}}</div>
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import {checkPhone} from '@@/utils/util'
export default {
    data(){
        return{
            formLabelAlign:{
                name: '',
                mobile: '',
                smsCode: ''
            },
            uuid: 0,
            seconds: 0,

        }
    },
    created(){
        this.uuid = this.getUuid();
    },
    methods:{
        async send(){
            if(!checkPhone(this.formLabelAlign.mobile)){
                return this.$message.warning('请输入正确的手机号')
            }
            const res =await network.sendSmsCode(
                {
                    data:{mobile: this.formLabelAlign.mobile},
                    headers:{deviceId:this.uuid}
                })
            if(res=='error') return;
            

            this.seconds = 59;
            let interval = setInterval(()=>{
                if(this.seconds<=1){
                    clearInterval(interval)
                }
                this.seconds --;
            }, 1000)
        },
        getUuid() {
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
        async submit(){
            if(!this.formLabelAlign.name) return this.$message.warning('请输入竞赛名称')
            if(!this.formLabelAlign.mobile) return this.$message.warning('请输入手机号')
            if(!this.formLabelAlign.smsCode) return this.$message.warning('请输入验证码')

            let res = await network.sendApply({
                data:this.formLabelAlign,
                headers:{deviceId:this.uuid}
            })
            if(res=='error') return;
            this.$message.success('申请成功，请耐心等待客服联系')
        },
    }
}
</script>

<style lang='less' scoped>
#apply{
    width: 100%;
    // height: 351px;
    background: url('https://web.moocollege.com/mooc/hzq/competition/newhome/bg1.png') no-repeat;
    background-size: 1920px auto;
    background-position: center;
    >div{
        width: 1200px;
        margin: 0 auto;
        padding: 55px 0 40px;
        h3{
            font-size: 30px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 1;
            letter-spacing: 1px;
            text-align: center;
        }
        .form{
            width: 350px;
            margin: 0 auto;
            margin-top: 30px;
            margin-bottom: 0px;
            /deep/.el-form-item__label{
                color: #ffffff;

            }
            /deep/.el-form-item{
                margin-bottom: 12px;
            }
            /deep/.el-input__inner{
                background: none;
                color: #ffffff;
                &:focus{
                    border-color: #ffffff;
                }
            }
            /deep/input::-webkit-input-placeholder { 
            /* WebKit browsers */ 
                color: rgba(255, 255, 255, 0.6); 
            } 
            /deep/input:-moz-placeholder { 
            /* Mozilla Firefox 4 to 18 */ 
                color: rgba(255, 255, 255, 0.6); 
            } 
            /deep/input::-moz-placeholder { 
            /* Mozilla Firefox 19+ */ 
                color: rgba(255, 255, 255, 0.6); 
            } 
            /deep/input:-ms-input-placeholder { 
            /* Internet Explorer 10+ */ 
                color: rgba(255, 255, 255, 0.6); 
            }
            .sendmess{
                width: 80px;
                cursor: pointer;
                color: #6283FF;
                .seconds{
                    color: #4a4a4a;
                }
            }
        }
        .submit{
            margin: 0 auto;
            width: 120px;
            height: 36px;
            line-height: 36px;
            background: #FFFFFF;
            box-shadow: 0px 10px 8px 0px rgba(255, 255, 255, 0.21);
            border-radius: 18px;
            font-size: 14px;
            font-weight: bold;
            color: #6283FF;
            text-align: center;
            cursor: pointer;
        }
    }   
}
</style>