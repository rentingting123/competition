<template>
<el-dialog fullscreen center class="newbieGuidedialog" :visible.sync='show' :show-close='false' :append-to-body='true'>

    <div class="newbieGuide">
        <div class="topclose" >
            <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/goVideo.png" @click="gotoVideo" height="20px" style="margin-right: 20px">
            <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/topclose.png" @click="cancel" height="20px">
        </div>
        <div class="top">
            <img v-for="(list,i) in lists" :key="i" 
                v-show="index==i" 
                :style="{ 'max-width': list.width || 0+'px'}"
                :src="list.url" >
        </div>
        <div class="submit">
            <div class="button pre" v-show="index!=0" @click="pre">
                <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/pre_hover.png" class="hover" >
                <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/pre.png" >
            </div>
            <div class="button next" v-show="index!=lists.length-1" @click="next">
                <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/next_hover.png" class="hover" >
                <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/next.png" >
            </div>
            <div class="button close" v-show="index==lists.length-1" @click="cancel">
                <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/close_hover.png" class="hover" >
                <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/close.png" >
            </div>
        </div>

    </div>
    </el-dialog>
    
</template>

<script>
export default {
    props: ['close', 'lists', 'type', 'id'],
    data(){
        return{
            index: 0,
            show: true
        }
    },
    methods:{
        pre(){
            this.index--
        },
        next(){
            this.index++
        },
        cancel(){
            this.close && this.close()
        },
        gotoVideo(){
            //type 3主办方  2参赛者 4评审专家  1高校管理员  5报名管理员
            // id 视频的id，默认打开时显示
            if(this.type){
                this.close && this.close()
                this.$router.push('/helpcenter?type='+this.type+'&id='+this.id)
            }else{
                this.$message.warning('未找到视频')
            }
        }
    }
}
</script>

<style lang='less' scoped>
.newbieGuidedialog{
    /deep/.el-dialog.is-fullscreen{
        background: none;
    }
    /deep/.el-dialog__header{
        padding: 0;
        border: none;
    }
}
.newbieGuide{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    overflow: auto;
    .topclose{
        position: absolute;
        top: 30px;
        right: 30px;
        img{
            cursor: pointer;
        }
    }
    .top{
        margin: 0 auto;
        margin-top: 65px;
        text-align: center;
        height: 60%;
        img{
            max-height: 100%;
        }
    }
    .submit{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 63px;
        .button{
            margin-left: 24px;
            position: relative;
            width: 134px;
            height: 86px;
            cursor: pointer;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                &.hover{
                    display: none;
                }
            }
            &:hover{
                img{
                    display: none;
                }
                img.hover{
                    display: block;
                }
            }
        }
    }

}

</style>