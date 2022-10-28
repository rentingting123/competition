<template>
    <div class="selectExpert">
        <el-button type="primary" size="mini" @click="toShow" v-if="disabled" class="button">上传汇总表</el-button>
        
        <el-dialog title="上传汇总表" :visible.sync="show" :close-on-click-modal="false" :modal-append-to-body="false" width="60%">
            
            <upload
              class="upload-demo"
              :drag='true'
              :showlist="false"
              accept= ".pdf"
              :onSuccess="handleAvatarSuccess"
            >
              <i class="iconfont">&#xe614;</i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
                <div class="el-upload__tip" slot="tip" style="color:#000000;">
                    仅支持：.pdf
                </div>
              </div>
            </upload>
            <a v-if="filePath" :href="filePath" target="_blank" style="color:#0000dd;">{{filePath}}</a>
            <p v-if="filePath">
                <el-button type="primary" size="mini" @click="open">查看汇总表</el-button>
                <el-button type="danger" size="mini" @click="filePath=''">删除</el-button>
            </p>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show=false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import upload from '@@/components/fileUpload/index'
import network from "@@/api/jxapi/index"
export default {
    props: ['competitionId'],
    components:{
        upload,

    },
    data(){
        return{
            show: false,
            filePath: '',
            disabled: false
        }
    },
    methods:{
        async getShow(){
            let res = await network.checkUploadFile({data:{
                competitionId: this.competitionId
            }});
            if(res=='error') return;
            this.disabled = res
        },
        handleAvatarSuccess(file){
            this.filePath = file.location
        },
        toShow(){
            if(!this.competitionId) return this.$message.warning('请选择竞赛！');
            this.getUrl()
            this.show = true
        },
        async getUrl(){
            let school = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).school
            if(!school) return this.$message.warning('请先完善个人信息！')

            let res = await network.queryUploadLog({data:{
                competitionId: this.competitionId,
                remark: school
            }});
            if(res=='error') return;
            this.filePath = res && res.filePath || ''
        },
        async submit(){
            if(!this.filePath) return this.$message.warning('请上传汇总表！')
            let userId = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).id
            let school = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).school
            
            if(!school) return this.$message.warning('请先完善个人信息！')
            let res = await network.uploadlogfile({data:{
                userId: userId,
                competitionId: this.competitionId,
                filePath: this.filePath,
                remark: school
            }});
            if(res=='error') return;
            this.$message.success('上传成功')
            this.show = false
        },
        open(){
            window.open(this.filePath)
        }
    },
    watch:{
        competitionId:{
            immediate: true,
            handler(val){
                if(!val) return;
                // 控制按钮是否显示
                this.getShow()
            }
        }
    }
}
</script>

<style lang='less' scoped>
.selectExpert{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .upload-demo {
      text-align: left;
      .iconfont {
        font-size: 48px;
        color: #1890ff;
        margin-top: 20px;
        display: inline-block;
        width: 48px;
        height: 48px;
      }
      & /deep/ .el-upload-dragger {
        height: 150px;
        background: rgba(0, 0, 0, 0.02);
        line-height: normal;
    
      }
      /deep/ .el-upload__text {
        margin-top: 16px;
      }
    }
}
</style>