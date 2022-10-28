<template>
    <div class="load">
        <p style="cursor: pointer" v-if="type=='canload'" @click="scroll">{{$t('loading.more')}}</p>
        <p v-if="type=='nomore'">{{$t('loading.noMore')}}~</p>
        <p v-if="type=='loading'">{{$t('loading.loading')}}...</p>
    </div>
</template>
<script>
import { Message } from 'element-ui';
export default {
    props: {
        type:String,
        more:{
            type:Function,
            required:true
        }
    },
    data(){
        return {
        }
    },
     mounted(){
          window.addEventListener('scroll',this.scroll)
    },
    beforeDestroy(){
            window.removeEventListener('scroll',this.scroll)
        },
        methods:{
                scroll(e){
                    // console.log('body.scrollTop:'+window.pageYOffset)
                    // console.log('body.scrollHeight:'+document.body.scrollHeight)
                    // console.log('window.innerHeight:'+window.innerHeight)
                    // console.log(this.type)
                if((window.innerHeight+window.pageYOffset+300)>document.body.scrollHeight && this.type=='canload'){
                    this.more();
                }
            },
        }
}
</script>
<style lang="less" scoped>

    .load{
        width:100%;
        height:1.5rem;
        p{
            width:100%;
            height:100%;
            text-align:center;
            color:#4a4a4a;
            font-size:0.8rem;
        }
    }
</style>
