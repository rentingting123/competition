<template>
    <div class="allP">
        <p class="bastitle">上传竞赛手册</p>
        <el-input class="input" v-model="pdf"/>
        <!-- 前端上传 -->
        <el-upload :before-upload="pdfUpload" accept=".pdf" :show-file-list="false" action="/">
            <el-button size="small" style="margin-top:10px" type="primary">{{pdf?'更换':'上传'}}</el-button>
        </el-upload>
    </div>
</template>

<script>
import Upload from "@/components/fileUpload/spaceNotice.vue";
export default {
    props: ['value','close'],
    computed:{
        pdf:{
           get(){
                return this.value
           },
           set(val){
               this.close && this.close('pdf', val)
           }
        }
    },
    methods:{
        pdfUpload(file) {
            Upload.upload({ file: file }).then(ret => {
                this.close && this.close('pdf', ret.location)
            });
            return false
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