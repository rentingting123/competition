<template>
    <div>
        <div class="allP">
            <p class="bastitle">上传视频</p>

            <notice :showlist="false" accept=".mp4" drag :onSuccess="banUpSuccessIphone">
                <div class="upImg" v-if="videourl">
                    <video :src="videourl" width="100%" height="100%" ></video>
                </div>
                <div class="avatar" v-else>
                    <p class="iconfont icon-icon-uploadExcel">
                        <i class="el-icon-upload"></i>
                    </p>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </notice>
        </div>
    </div>
</template>

<script>
import notice from "@@/components/fileUpload/notice.vue";
export default {
    components:{notice},
    props:['videourl','close'],
    methods:{
        banUpSuccessIphone(ret, file, flieList) {
            if (!ret.location) {
                return this.$message.info("上传失败");
            }
            this.close && this.close('videourl', ret.location)
        },
    }
}
</script>

<style lang='less' scoped>
.bastitle{
    font-size: 17px;
    color: #4a4a4a;
    letter-spacing: 1.21px;
}

</style>