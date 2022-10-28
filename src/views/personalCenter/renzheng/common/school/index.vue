<template>
  <div class="card-message">
      <div class="card-message">
        <p class="title">
            盖章协议上传
            <a href="https://web.moocollege.com/admin/%E6%91%A9%E8%AF%BE%E4%BA%91%E7%AB%9E%E8%B5%9B%E5%B9%B3%E5%8F%B0%E4%BD%BF%E7%94%A8%E5%8D%8F%E8%AE%AE-%E7%BA%BF%E4%B8%8A%E5%8D%95%E6%96%B9%E5%8D%8F%E8%AE%AE5.9.docx"> <i class="iconfont icon-xiazai1"></i>下载协议</a>
        </p>
        <upload
            class="avatar-uploader"
            :drag='true'
            :onError="handleFileError"
            :onSuccess = "coverSuccess"
            :fileList = 'fileList'
             listType="picture"
            >
                <img v-if="student.imageUrlTwo" :src="student.imageUrlTwo" class="avatar">
                <div v-else class="avatar">
                    <p class="iconfont icon-icon-uploadExcel"></p>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
        </upload>

         <!-- <div class="file-list">
            <div
                :style="{marginBottom: '10px', width: '360px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}"
                v-for="(item, j) in fileList"
                :key="j"
            >
                <div>
                    <el-input :style="{width: '200px'}" v-model="item.name"></el-input>
                    <span :style="{margin: '0 10px'}">{{item.extensionName}}</span>
                </div>
                <span :style="{cursor: 'pointer'}" @click="delFileFun(j)" >
                    <el-icon class="el-icon-close"></el-icon>
                </span>
            </div>
        </div> -->

      </div>

      <div class="submit" @click="submit">
          提交
      </div>

  </div>
</template>

<script>
import upload from '@/components/fileUpload/index'
import jxapi from '@@/api/jxapi/index'
import { getGroupId } from "@@/utils/commons";
export default {
    components:{
        upload
    },
    data() {
        return {
            student: {
                imageUrlTwo: null,
            },
            fileList:[],
        };
    },
    created(){
        this.getList()
    },
    methods: {
        handStudentTwo() {},
        async getList(){
           let list = await jxapi.getContractList()
           if(list == 'error') return
           this.fileList = list.fileList||[]
        },
        handleFileError(){
            this.$message('上传失败，请重试')
        },
        coverSuccess(res,file,filelist){
            this.fileList = filelist
        },
        delFileFun(j){
            this.fileList.splice(j,1)
        },
        download(){
            // 下载协议
            
        },
        // 提交盖章协议
        async submit(){
            if(this.fileList.length<1){
                return this.$message('请上传盖章协议！')
            }
            let res= await jxapi.setMateralData({data:{
                groupId: getGroupId(),
                type:6,
                fileList:this.fileList
            }})
            if(res == 'error') return
            this.$message.success('文件上传成功！')   
            // 后期上传
        

        }
  }
};



</script>


<style lang="less" scoped>
.card-message{
    width: 440px;
    height: auto;
    margin-top: 40px;
    .title {
      font-size: 16px;
      color: #4a4a4a;
      a{
          float: right;
          font-size: 12px;
          color: #1D86FF;
          letter-spacing: 0.86px;
          cursor: pointer;
          margin-right: 14px;
      }
    }
    .avatar-uploader{
        margin-top: 10px;
        .el-upload-dragger{
            background: rgba(0,0,0,0.02);
        }
        overflow: hidden;
        .avatar{
            text-align: center;
            p{
                font-size: 16px;
                color: rgba(0,0,0,0.85);
                line-height: 24px;
            }
            .iconfont{
                font-size: 48px;
                line-height: 1.5;
                padding-top: 35px;
                color: #1D86FF;
            }
        }
        img.avatar {
        width: 100%;
        height: 100%;
        }
    }


}
.submit{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 22px;
    background-image: linear-gradient(-90deg, #3EBBFF 0%, #1D86FF 100%);
    border-radius: 5px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    cursor: pointer;
}

</style>
