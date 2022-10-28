<template>
    <div>
        <span v-if="type==1" class="ing">进&nbsp;行&nbsp;中</span>
        <span v-else-if="type==2" class="hot">火热报名</span>
        <span v-else-if="type==3" class="coming">筹&nbsp;备&nbsp;中</span>
        <span v-else class="ended">已&nbsp;结&nbsp;束</span>
    </div>
</template>

<script>
export default {
    props: ['type'],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
div{
    display: inline-block;
    vertical-align: top;
    span{
        display: inline-block;
        vertical-align: top;
        width: 60px;
        height: 17px;
        line-height: 17px;
        background: #0078E2;
        border-radius: 3px;
        margin-right: 9px;
        font-size: 11px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
    }
    .ing{
        background:#F5A623 ;
    }
    .ended{
        background: #9B9B9B;
    }
    .coming{
        background: #0078E2;
    }
    .hot{
        background: #DA3145;
    }
}
</style>