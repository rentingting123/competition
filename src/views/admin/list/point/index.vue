<template>
    <!-- 使用 -->
    <!-- <point :id='id' /> -->
    <div id="Points">
        <p class="pointTitle" @click="show=true">
            <i class="iconfont">&#xe62d;</i> 创建赛项
        </p>
        <!--创建赛项弹框-->
        <el-dialog title="创建赛项" :visible.sync="show" :close-on-click-modal= false
            :modal-append-to-body="false" width="800px">
            <div class="dialogContent">
                <p><span style="margin-right:5px; color:red;">*</span>赛项类型</p>
                <div class="dialog_radio">
                    <el-radio v-model="childType" label="1">赛项</el-radio>
                    <el-radio v-model="childType" label="2">外链</el-radio>
                </div>
                <template v-if="childType === '1'">
                    <p>标题：</p>
                    <el-input placeholder="赛项名称" style="width:430px;" v-model="name"></el-input>
                </template>
                <template v-if="childType === '2'">
                    <p>封面：</p>
                    <upload
                        class="upload-demo"
                        accept=".jpg, .png"
                        name="attach"
                        drag
                        :showlist="false"
                        :onSuccess="upSuccess"
                        width="100%"
                        >
                        <img v-if="bannerUrl" :src="bannerUrl" width="360" height="180">
                        <i class="iconfont icon-up" v-if="!bannerUrl">&#xe614;</i>
                        <div class="el-upload__text" v-if="!bannerUrl">
                            点击或将文件拖拽到这里上传
                            <div class="el-upload__tip" slot="tip">尺寸:480x270px 仅支持扩展名：.jpg.png</div>
                        </div>
                    </upload>
                    <p>标题：</p>
                    <el-input placeholder="赛项名称" style="width:430px;" v-model="name"></el-input>
                    <p v-if="childType == '2'">链接：</p>
                    <el-input placeholder="外链赛项地址" style="width:430px;" v-model="allInOneUrl" v-if="childType == '2'"></el-input>
                </template>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="foundPoints">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import jxApi from '@/api/jxapi/index'
import upload from "@@/components/fileUpload/index";
export default {
    data(){
        return {
            show: false, //创建赛项弹框
            childType: '1', //创建赛项弹框单选按钮
            name: '', //赛项名称
            allInOneUrl: '', //外链赛项地址
            bannerUrl: '', //上传的图片
        }
    },
    props: ['id', 'close'],
    components:{
        upload
    },
    methods: {
        // 创建赛项
        async foundPoints(){
            const obj = {
                childType: this.childType,
                name: this.name,
                allInOneUrl: this.allInOneUrl,
                bannerUrl: this.bannerUrl,
                id: this.id,
            };

            let child= await jxApi.saveChild({data:obj})
            this.show = false;
            if(child=='error') return 
            this.$message.success('保存成功');
            this.close && this.close();
        },
        // 上传成功
        upSuccess(res,file){
            this.bannerUrl = res.location;
        },
    },
}
</script>


<style lang="less" scoped>
#Points{
    width: auto;
    display: inline-block;
    vertical-align: middle;
    text-align: left;

    .pointTitle{
        font-size: 14px;
        font-weight: 500;
        color: #1F92FD;
        line-height: 20px;
        display: inline-block;
        cursor: pointer;
        i{
            font-size: 16px;
            line-height: 20px;
            margin-right: 20px;
        }
    }

    // 创建赛项弹框
    .dialogContent{
        width: 340px;
        margin: auto;
        p{
            margin-top: 26px;
            margin-bottom: 18px;
        }
        .el-upload__text{
            color: #000;
            .el-upload__tip{
                color: rgba(0,0,0,0.43);
            }
        }
    }
    /deep/ .el-dialog__footer{
        border-top: 1px solid #DEDEDE;
    }
}
</style>

