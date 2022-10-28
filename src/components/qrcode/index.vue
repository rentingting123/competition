<template>
    <div @mouseover='getImg' @mouseout='out' style="display:inline-block;">
        <el-button v-if="color" size="small"><i class="iconfont" >&#xe62b;</i>&nbsp; {{$t('submitWork.share')}}</el-button>
        <i class="iconfont sharecode" v-else :style="{'opacity':!show?'1':'0'}">&#xe62b;</i>
        <div class="codeshow" :loading='loading' :style="{'display':show?'block':'none'}">
            <p>{{$t('submitWork.phonecode')}}</p>
            <img :src="img" alt="" srcset="" width="80" height="80">
        </div>
    </div>
</template>

<script>
import utils from '@@/utils/util';
export default {
    props: ['mdPoolId','color'],
    data(){
        return{
            img: '',
            loading: false,
            show: false
        }
    },
    methods:{
        getImg(){
            this.show = true
            this.loading = true
            let url = "http://"+location.host+"/#/share?mdPoolId="+this.mdPoolId
            utils.getQRcode(url,{width:200,height:200}).then(url=>{
                this.loading = false
                this.img = url;
            })
        },
        out(){
            this.show = false
        }
    }
}
</script>

<style lang="less" scoped>
.sharecode{
    font-size: 18px;
    color: #ffffff;
    padding: 0 10px 10px 0;
    cursor: pointer;
    &.color1{
        color: #000000;
        padding: 0;
        display: inline-block;
        vertical-align: middle;
    }
}
.codeshow{
    cursor: pointer;
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 100px;
    height: auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 6px 0px rgba(201,199,199,0.5);
    border-radius:8px;
    padding-top: 10px;
    p{
        font-size:12px;
        font-weight:400;
        color:rgba(74,74,74,1);
        line-height:17px; 
        text-align: center;
    }
    img{
        width: 80px;
        height: 80px;
        display: block;
        margin: 0 auto;
    }
}
</style>