<template>
    <el-row :gutter="10" class="adminlogin">
       <el-col :span="20" :offset="2">
           <div class="middle">
                <div class="header">
                    <img src="https://web.moocollege.com/mooc/hzq/competition/home/logo1.png" alt="" srcset="">
                </div>
                <login v-if="islogin && workid" :id="workid" :choose="choose"/>
                <register v-if="isregister && workid" :choose="choose"/>
                <review v-if="isview && workid" :choose="choose"/>
                <div class="footer">
                    杭州简学技术有限公司
                </div>
           </div>
       </el-col>
    </el-row>
</template>

<script>
import login from './common/login'
import register from './common/register'
import review from './common/review'
export default {
    data(){
        return{
            islogin: true,
            isregister: false,
            isview: false,
            workid: ''
        }
    },
    methods:{
        choose(index){
            this.islogin = false
            this.isregister = false
            this.isview = false
            if(index==1){
                this.isregister = true
            }else if(index==2){
                this.isview = true
            }else{
                this.islogin = true
            }
        }
    },
    components:{
        login,
        register,
        review
    },
    created(){
        localStorage.clear()
        this.workid = this.$route.params.id
        document.getElementById('app').style.minWidth = '1px';
    }    
}
</script>

<style lang="less" scoped>
    .adminlogin{
        width: 100%;
        min-height: 100vh;
        padding-bottom: 28px;
        background: url('https://web.moocollege.com/mooc/hzq/competition/cert/mlogo.png') no-repeat, linear-gradient(-49deg, #0078E2 0%, #2BD2B3 100%);
        background-position: bottom right,top left;
        position: relative;
        .middle{
            width: 90%;
            margin: 0 auto;
        }
        .header{
            width: 100%;
            padding: 31px 0 21px;
            border-bottom: 1px solid #FFFFFF;
            img{
                width: 80%;
                height: auto;
            }
        }
        .footer{
            position: absolute;
            bottom: 14px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #FFFFFF;
        }
    }
</style>
