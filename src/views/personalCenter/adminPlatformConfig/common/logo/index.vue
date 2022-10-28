<template>
    <div class="logoContainer">
        <h3>
            上传logo
            <span class="tip">(270x62px，500kb以下，png格式文件)</span>
        </h3>
        <upload
            width='270px'
            height='62px'
            :fileList="banners"
            :onSuccess="handleAvatarSuccess"
            :onError="handleError"
            :showlist='false'
            :beforeUpload="beforeAvatarUpload"
            accept='.png'
            class="avatar"
            >
            <img v-if="imageUrl" :src="imageUrl" >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </upload>
        <el-button type="primary" class="submit" @click="saveLogo">保存</el-button>
    </div>
</template>

<script>
import upload from "@/components/fileUpload/index"
import network from "@/api/jxapi/index";
import { getGroupId } from '@@/utils/commons'
export default {
    components:{
        upload
    },
    data(){
        return{
            imageUrl: "",
            banners: [],
            groupId: '',
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init() {
            this.groupId = getGroupId();
            if (!this.groupId) return;
            const data = await network.getPageSetting({ groupId: this.groupId });
            if (data == "error") return;
            this.imageUrl = data && data.logo || '';
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = res.location;
        },
        beforeAvatarUpload(file) {
            const isPNG = file.type === "image/png";
            const isLt = file.size / 1024 / 1024 < 0.5;

            if (!isPNG) {
                this.$message.error("上传头像图片只能是 PNG 格式!");
            }
            if (!isLt) {
                this.$message.error("上传头像图片大小不能超过 500KB!");
            }
            return isPNG && isLt;
        },
        saveLogo() {
            let params = {
                objectId : this.groupId,
                logo: this.imageUrl
            }
            this.save(params);
        },
        handleError(err, file, fileList) {
            this.$message.error("上传文件失败");
        },
        async save(param) {
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
            this.$message.success("保存成功");
        },
    }
}
</script>

<style lang='less' scoped>
.logoContainer{
    padding: 30px;
    /deep/ .el-progress-circle{
      width: 62px !important;
      height: 62px !important;
    }
    .tip {
        color: #666;
        line-height: 24px;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: normal;
    }
    .avatar{
        margin: 20px 0;
    }
}
</style>