<template>
    <div class="searchCert">
        <img src="https://web.moocollege.com/mooc/hzq/competition/search/searchCert.png" class="logo">
        <div class="search">
            <el-input placeholder="输入证书编号" v-model="search" @keyup.enter.native="searchCert">
                <span slot="append"  @click="searchCert">搜索证书</span>
            </el-input>
        </div>
        <div class="result">
            <span v-if="cert=='nomess'"></span>
            <img v-else-if="cert" :src="cert">
            <span v-else>未查询到该证书，请核对证书编号或联系主办方</span>
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    data(){
        return{
            search: '',
            cert: 'nomess'
        }
    },
    created(){
        document.getElementById('app').style.minWidth = '1px';
    },
    methods:{
        async searchCert(){
            if(!this.search) return;
            let res = await network.getCertificate({data:{
                certificateNumber:this.search
            }});
            if(res=='error') return;
            this.cert = res;
        }
    }
}
</script>

<style lang='less' scoped>
.searchCert{
    background: #ffffff;
    width: 100%;
    min-height: 100vh;
    .logo{
        width: 50%;
        height: auto;
        display: block;
        margin: 0 auto 58px;
        padding-top: 86px;
    }
    .search{
        width: 90%;
        margin: 0 auto;
        /deep/.el-input__inner{
            border: 1px solid #0078E2;
            border-radius: 8px 0px 0px 8px;
        }
        /deep/.el-input-group__append{
            background: #0078E2;
            border-radius: 0px 8px 8px 0px;
            border: 1px solid #0078E2;
            color: #ffffff;
            cursor: pointer;
        }
    }
    .result{
        width: 100%;
        height: auto;
        margin: 30px auto;
        img{
            width: 80%;
            height: auto;
            display: block;
            margin: 0 auto;
        }
        span{
            color: red;

        }
    }
}
@media screen and (min-width: 750px){
    .searchCert{
        .logo{
            width: 348px;
        }
        .search{
            width: 600px;
        }
        .result{
            width: 600px;
        }
    }
}
</style>