<template>
    <div class="login">
        <ul class="clearfix">
            <li :class="{'on':type==1}" @click="type=1">密码登录</li>
            <li :class="{'on':type==2}" @click="type=2">短信登录</li>
        </ul>
        <div v-if="type==1" class="pwdlogin">
            <el-input v-model="pwdTel" placeholder="请输入手机号"></el-input>
            <el-input v-model="pwd" placeholder="请输入密码"></el-input>
            <el-button @click="pwdSubmit" round>登 录</el-button>
        </div>

        <div v-if="type==2" class="tellogin">
            <el-input v-model="tel" placeholder="请输入手机号"></el-input>
            <el-input v-model="telcode" placeholder="请输入验证码">
                <template slot="append">
                    <span v-if="seconds==0" @click="getsms">获取验证码</span>
                    <span style="width:80px;display:inline-block;" v-else >{{seconds}}</span>
                </template>
            </el-input>
            <el-button @click="telSubmit" round>登 录</el-button>
        </div>

        <p>
            <span @click="back(1)">立即注册</span>
            <span @click="back(2)">找回密码</span>
        </p>
        
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import { setInterval } from 'timers';
export default {
    props:['choose','id'],
    data(){
        return{
            type:1,
            pwdTel:'',
            pwd:'',
            tel:'',
            telcode:'',
            uuidCode:'',
            seconds:0,
        }
    },
    created(){
        this.uuidCode = this.uuid()
    },
    methods:{
        back(index){
            return this.choose && this.choose(index)
        },
        async getsms(){
            if(!this.tel){
                return this.$message.warning('请输入手机号')
            }
            this.seconds = 119;
            let secTimer = setInterval(()=> {
                this.seconds--;
                if (this.seconds == 0) {
                    clearInterval(secTimer);
                }
            }, 1000);
            let result = await network.sendSmsCode({
                data:{
                    mobile: this.tel,
                    domain: location.hostname
                },
                headers:{
                    deviceId: this.uuidCode + this.tel,
                }
            });
            if(result=='error') return;
            this.$message.success("获取验证码成功");
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
        toworkshow(res){
            localStorage.setItem('adminLogin','adminLogin')
             setToken(res.access_token);
             setReflashToken(res.refresh_token)  
            this.$router.push({path:'/admin/workshow/'+this.id})
        },
        async pwdSubmit(){
            if(!this.pwdTel){
                return this.$message.warning('请输入手机号')
            }
            if(!this.pwd){
                return this.$message.warning('请输入密码')
            }
            let result = await network.authenticationForm({
                data:{
                    username: this.pwdTel,
                    password: this.pwd
                },
                headers:{
                    deviceId: this.uuidCode + this.pwdTel
                }
            });
            if(result=='error') return;
            this.toworkshow(result)
            
        },
        async telSubmit(){
            if(!this.tel){
                return this.$message.warning('请输入手机号')
            }
            if(!this.telcode){
                return this.$message.warning('请输入验证码')
            }

            let data = await network.authenticationMobile({
                data:{
                    mobile: this.tel,
                    smsCode: this.telcode
                },
                headers:{
                    deviceId:this.uuidCode + this.tel
                }
            });
            if(data=='error') return;
            this.toworkshow(data)
        }
    }
}
</script>


<style lang="less" scoped>
.login{
    ul{
        text-align: center;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 36px;
        margin: 27px 0;
        li{
            float: left;
            width: 50%;
            cursor: pointer;
        }
        li.on{
            font-size: 24px;
            font-weight: bold;
        }
    }
    .el-input{
        margin-bottom: 30px;
        
    }
    .el-button{
         margin-bottom: 17px;
         width: 100%;
         font-size: 16px;
        color: #A3A3A3;
    }
    p{
        font-size: 16px;
        color: #FFFFFF;
        text-align: right;
        span{
            margin-left: 40px;
            cursor: pointer;
        }
    }

}
</style>

<style lang="less">
.adminlogin{
    .el-input__inner{
        border-radius: 40px;
        background: rgba(236, 238, 242, 0.2);
        font-size: 16px;
        color: #FFFFFF;
        border: none;
    }
    .el-input-group--append .el-input__inner{
        border-radius: 40px 0 0 40px;
    }
    .el-input-group__append{
        border-radius: 0 40px 40px 0;
        background: #D1D4DB;
        font-size: 16px;
        color: #A3A3A3;
    }
}
</style>
