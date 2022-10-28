<template>
    <el-dialog class="invoice" title="线下支付数据" :modal-append-to-body="false" :close-on-click-modal=false :visible.sync="outlineDia"  width="70%">
        <el-form label-position="top" ref="form1" :model="form1" class="form">
            <el-form-item label="户名" prop="payAccount">
            <el-input v-model="form1.payAccount" placeholder="请输入户名" disabled></el-input>
            </el-form-item>
            <el-form-item label="帐号" prop="payNumber">
            <el-input v-model="form1.payNumber" placeholder="请输入帐号" disabled></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="payAddress">
                <el-input v-model="form1.payAddress" placeholder="请输入开户行" disabled></el-input>
            </el-form-item>
            <el-form-item label="收费规则" prop="payrule">
                <el-input v-model="form1.rules" disabled></el-input>
            </el-form-item>
            <el-form-item label="线下付费凭证(请上传汇款回执单和团队名称信息截图)" prop="imgUrl" :rules="[{ required: true, message: '付费凭证不能为空', trigger: 'blur' }]">
                <upload
                    class="avatar-uploader"
                    :showlist="false"
                    :drag='true'
                    :onSuccess = "coverSuccess"
                    >
                        <div class="avatar">
                            <i class="iconfont">&#xe614;</i>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                </upload>
                <span class="file-list">
                    <div
                        :style="{marginBottom: '10px', width: '360px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}"
                        v-for="(item, j) in form1.imgUrl"
                        :key="j"
                        >
                        <div>
                            <el-input :style="{width: '200px'}" v-model="item.name"></el-input>
                        </div>
                        <span :style="{cursor: 'pointer'}" @click="delFileFun(j)" >
                            <el-icon class="el-icon-close"></el-icon>
                        </span>
                    </div>
                </span>
            </el-form-item>
            <el-form-item label="备注" prop="remark" :rules="[{ required: true, message: '备注不能为空', trigger: 'blur' }]">
                <el-input type="textarea" :rows="3" v-model="form1.remark" placeholder="请输入学校＋团队码，若多个团队一起开票，则团队数量和支付金额需一致"></el-input>
            </el-form-item>
            <div class="paychoose">
                <h1> ＊ 凭证上传后，财务审核通过了您的汇款信息，才可以进行申请发票</h1>
            </div>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="outlineDia=false">取 消</el-button>
            <el-button type="primary" @click="ok('form1')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import network from '@@/api/jxapi'
import upload from '@@/components/fileUpload/index'
export default {
    props:['close','payDetail','teamId'],
    components:{
        upload
    },
    data(){
        return{
            outlineDia:true,
            form1:{
                imgUrl:[],
                payAccount:'',
                payNumber:'',
                payAddress:'',
                remark:'',
            }
        }
    },
    async created(){
        let payDetail = this.payDetail

        // 添加显示收费规则
        let rules = ''
        if(payDetail.payRule==0){
            rules += '按团收费 '
        }else if(payDetail.payRule==1){
            rules += '按参赛者收费 '
        }else if(payDetail.payRule==2){
            rules += '按指导老师收费 '
        }else if(payDetail.payRule==3){
            rules += '按参赛者和指导老师收费 '
        }
        rules += payDetail.price?payDetail.price:''

        this.form1 = {
            payAccount:payDetail.payAccount,
            payNumber:payDetail.payNumber,
            payAddress:payDetail.payAddress,
            remark:payDetail.remark,
            rules:rules,
            imgUrl:payDetail.imgUrl&&JSON.parse(payDetail.imgUrl)||[]
        }
    },
    methods:{
        ok(formName){
             this.$refs[formName].validate(async (valid) => {
                if(!valid) return;

                let obj = {
                    imgUrl:JSON.stringify(this.form1.imgUrl),
                    remark:this.form1.remark,
                    groupId:this.teamId
                }
                let result = await network.saveGroupPay({data:obj});
                if(result=='error') return;
                this.$message.success('提交成功！')
                this.close&&this.close(true)

             })
        },
        coverSuccess(file,filelist){
            this.form1.imgUrl.push({
                name:filelist.name,
                location:file.location
            })
        },
        delFileFun(j){
            this.form1.imgUrl.splice(j,1)
        },
    },
    watch:{
        outlineDia(val){
            if(!val)  return this.close&&this.close();
        }
    }
}
</script>

<style lang="less" scoped>
.invoice{
    text-align: left;
    margin-top: 0;
    .form{
        padding: 30px;
    }
    .main{
        width: 552px;
        margin: 0 auto;
        margin-top: 40px;
        > p{
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 1px;
            font-weight: bold;
            margin: 9px 0;
            span{
                font-size: 12px;
                font-weight: 150;
            }
        }
        >div{
            background: #FAFAFA;
            padding: 17px 19px 1px;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 1px;
            p{
                margin-bottom: 18px;
            }
        }
    }
    .pay{
        .message{
            font-size: 16px;
            color: #787D81;
            letter-spacing: 1px;
            i{
                color: #52C41A;
                margin-right: 5px;
            }
        }
    }
}
.paychoose{
    h1{
        width: 80%;
        margin: 0 auto;
        font-size: 14px;
        text-align: left;
        margin-top: 10px;
        color: red;
    }
}
.avatar-uploader{
        margin: 20px 0;
        .el-upload-dragger{
            background: rgba(0,0,0,0.02);
        }
        overflow: hidden;
        .avatar{
            text-align: center;
            padding-top: 35px;
            p{
                font-size: 16px;
                color: rgba(0,0,0,0.85);
                line-height: 24px;
            }
            .iconfont{
                font-size: 48px;
                line-height: 1.5;
                color: #1D86FF;
            }
        }
        img.avatar {
        width: 100%;
        height: 100%;
        }
    }
</style>
<style lang="less">
.invoice{
    .el-upload-dragger{
        background: #FAFAFA ;
    }
}
</style>