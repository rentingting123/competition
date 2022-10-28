<template>
    <div class="allP">
        <p class="bastitle">上级首页地址</p>
        <el-input class="input" v-model="homeUrl"/>
    </div>
</template>

<script>

export default {
    props: ['value','close'],
    computed:{
        homeUrl:{
           get(){
                return this.value
           },
           set(val){
               this.close && this.close('homeUrl', val)
           }
        }
    }
}
</script>

<style lang='less' scoped>
.bastitle{
    font-size: 17px;
    color: #4a4a4a;
    letter-spacing: 1.21px;
}
.input{
    width: 100%;
    margin: 10px 0;
}
</style>