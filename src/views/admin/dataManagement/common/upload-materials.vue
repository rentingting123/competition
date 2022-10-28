<template>
    <div class="uploadSeal">
        <el-button size="small" @click="show">管理公布资料</el-button>

        <el-dialog
            title="上传公布资料"
            :visible.sync="dialogFormVisible"
            :modal-append-to-body="false"
            width="600px"
            :close-on-press-escape="false"
            :close-on-click-modal= false
            >
            <div>上传公布资料（盖章PDF文件）：</div>
            <upload
                :drag='true'
                class="logouploader"
                :showlist="false"
                accept=".pdf"
                :config="{fileType:3}"
                :onSuccess="handleAvatarSuccess"
                :beforeUpload="beforeAvatarUpload">
                <div class="avatar">
                    <p class="iconfont icon-icon-uploadExcel"><i class="el-icon-upload"></i></p>
                    <p><span class="red">点击</span>或将文件<span class="red">拖拽</span>到这里上传</p>
                    <p style="font-size:12px;color: rgba(0, 0, 0, 0.43);">支持扩展名pdf</p>
                </div>
            </upload>
            <div style="margin-bottom: 10px;">已上传资料：</div>
            <ul class="showLists">
                <li v-for="(item,index) in lists" :key="index">
                    {{item.name}}
                    <a :href="item.href" target="_blank">查看</a>
                    <span @click="del(index)">删除</span>
                </li>
            </ul>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import upload from '@/components/fileUpload'
export default {
    components:{
        upload
    },
    props: ['competitionId'],
    data(){
        return{
            dialogFormVisible: false,
            lists: []
        }
    },
    methods:{
        show(){
            this.$api.get('/Admin/Competition/selectPublicFile',{
                cid: this.competitionId
            }).then(res=>{
                this.lists = res || []
                this.dialogFormVisible = true
            })
        },
        submit(){
            this.$api.post('/Admin/Competition/savePublicFile',{
                cid: this.competitionId,
                files: this.lists.length>0 ? this.lists : null
            }).then(res=>{
                this.$message.success('提交成功')
                this.dialogFormVisible = false
            })
        },
        beforeAvatarUpload(file){
        },
        del(i){
            this.lists.splice(i, 1)
        },
        handleAvatarSuccess(res, file){
            this.lists.push({
                key: res.name,
                name: file.name,
                href: res.location
            })
        }
    }
}
</script>

<style lang="less" scoped>
.uploadSeal{
    display: inline-block;
    vertical-align: top;
    /deep/.el-dialog__header{
        border-bottom: 1px solid #eeeeee;
    }
    /deep/.el-dialog__body{
        margin: 20px 0;
        margin-left: 36px;
    }

}
.logouploader{
    margin: 20px 0 10px;
    .avatar{
        font-size: 16px;
        color: rgba(0,0,0,0.85);
        line-height: 24px;
        p:nth-child(2){
            font-size: 12px;
        }
    }
    .avatar .iconfont{
        font-size: 48px;
        color: #1890FF;
        line-height: 48px;
        margin-top: 20px;
    }
    .upImg{
        width: 100%;
        height: 100%;
        position: relative;
        img{
            width: 178px;
            height: 178px;
            display: block;
            margin: 0 auto;
        }
        &:hover{
            .edit{
                display: block;
            }
        }
        .edit{
            display: none;
            line-height: 178px;
            text-align: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0,0,0,0.6);
            color: #ffffff;
            font-size: 20px;
        }
    }
}
.showLists{
    li{
        border: none !important;
        padding: 0 0 10px 0 !important;
        a{
            margin-left: 15px;
            color: -webkit-link;
            font-size: 18px;
            vertical-align: middle;
        }
        span{
            cursor: pointer;
            color: red;
            margin-left: 15px;
            font-size: 18px;
            vertical-align: middle;
        }
    }
}
.red{
    color: red;
    font-size: 18px;
}
</style>
