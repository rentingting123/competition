<template>
    <div>
        <el-dialog
            title="申请发票"
            class="invoice"
            :visible.sync="invoiceVisible"
            :modal-append-to-body="false"
            width="800px"
            :close-on-press-escape="false"
            :close-on-click-modal= false
            >
            
            <div class="main pay">
                <p class="message">
                    <i class="iconfont ">&#xe63f;</i>已完成支付，可直接申请发票
                </p>
            </div>

            <div class="type main">
                <p>发票类型</p>
                <div>
                    <p>
                        <span>发票类型：</span>
                        <el-radio-group v-model="invoiceType">
                            <el-radio :label="1">个人普通发票</el-radio>
                            <el-radio :label="2">企业普通发票</el-radio>
                            <el-radio :label="3">企业专用发票</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>开票类型：</span>
                        <el-radio-group v-model="invoiceKind">
                            <el-radio :label="1" >电子发票&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
                            <el-radio :label="2">纸质发票</el-radio>
                        </el-radio-group>
                    </p>
                </div>
            </div>

            <div class="main message">
                <p>发票信息</p>
                <div>
                    <el-form :model="messageForm" ref="messageForm"  label-width="120px" label-position="left">
                        <el-form-item
                            label="发票抬头"
                            prop="invoiceTilte"
                            
                            :rules="[
                            { required: true, message: '发票抬头不能为空', trigger: 'blur'}
                            ]"
                            >
                            <el-input  v-model="messageForm.invoiceTilte" placeholder="税号发票抬头" ></el-input>
                        </el-form-item>
                        <el-form-item
                            v-if="invoiceType!=1"
                            label="税号"
                            prop="invoiceNum"
                            :rules="[
                            { required: true, message: '请输入税号', trigger: 'blur'}
                            ]"
                            >
                            <el-input  v-model="messageForm.invoiceNum" placeholder="请输入税号" ></el-input>
                        </el-form-item>
                        <div v-if="invoiceType==3">
                            <el-form-item
                                label="基本开户行"
                                prop="bankName"
                                :rules="[
                                { required: true, message: '请输入开户行名称', trigger: 'blur'}
                                ]"
                                >
                                <el-input  v-model="messageForm.bankName" placeholder="请输入开户行名称" ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="基本开户号"
                                prop="bankNumber"
                                :rules="[
                                { required: true, message: '请输入开户行账号', trigger: 'blur'}
                                ]"
                                >
                                <el-input  v-model="messageForm.bankNumber" placeholder="请输入开户行账号" ></el-input>
                            </el-form-item>

                            <el-form-item
                                label="注册场所地址"
                                prop="bankAddress"
                                :rules="[
                                { required: true, message: '请输入注册地址', trigger: 'blur'}
                                ]"
                                >
                                <el-input type="textarea" :rows="2"  v-model="messageForm.bankAddress" placeholder="请输入注册地址" ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="注册固话"
                                prop="bankMobile"
                                :rules="[
                                { required: true, message: '请输入注册固定电话', trigger: 'blur'}
                                ]"
                                >
                                <el-input  v-model="messageForm.bankMobile" placeholder="请输入注册固定电话" ></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item label="发票内容">
                            <el-input disabled v-model="invMessage"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="main address">
                <p v-if="invoiceKind==1">接收发票邮箱<span>(付款后7个工作日内电子发票将会发送到您的邮箱)</span></p>
                <p v-else>发票寄送地址<span>(付款后约7个工作日到，发顺丰快递，邮费到付)</span></p>
                <div>
                    <el-form :model="addressForm" ref="addressForm"  label-width="120px" label-position="left">
                        <div v-if="invoiceKind==1">
                            <el-form-item
                                label="电子邮箱"
                                prop="email"
                                :rules="[
                                { required: true, message: '请输入接收发票的电子邮箱', trigger: 'blur'},
                                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                                ]"
                                >
                                <el-input v-model="addressForm.email" placeholder="请输入接收发票的电子邮箱" ></el-input>
                            </el-form-item>
                        </div>
                        <div v-else>
                            <el-form-item
                                label="收件人姓名"
                                prop="userName"
                                :rules="[
                                { required: true, message: '请输入收件人姓名', trigger: 'blur'}
                                ]"
                                >
                                <el-input  v-model="addressForm.userName" placeholder="请输入收件人姓名" ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="收件地址"
                                prop="address"
                                :rules="[
                                { required: true, message: '请输入收件地址', trigger: 'blur'}
                                ]"
                                >
                                <el-input type="textarea" :rows="2"  v-model="addressForm.address" placeholder="请输入收件地址" ></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item
                            label="手机号"
                            prop="mobile"
                            :rules="[
                            { required: true, message: '请输入收件人手机号', trigger: 'blur'}
                            ]"
                            >
                            <el-input maxlength="11" v-model="addressForm.mobile" placeholder="请输入收件人手机号" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="invoiceVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok('messageForm','addressForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>


import network from '@@/api/jxapi/index'
export default {
    props:{
        close:Function,
        type:Number,
        groupId:Number
    },
    data(){
        return{
            invoiceVisible:true,
            invoiceType:2,
            invoiceKind:1,
            messageForm:{},
            addressForm:{},
            invMessage:'竞赛报名费',
            submiting: false
        }
    },
    computed:{
        onlinePay(){
            if(this.type!=2){
                return false
            }else{
                return true
            }
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            let invoice = await network.getIovice({data:{groupId:this.groupId}});
            if(invoice=='error'|| !invoice) return;
            this.invoiceType = invoice.invoiceType || 2
            this.invoiceKind = invoice.invoiceKind || 1

            this.messageForm = {
                invoiceTilte:invoice.invoiceTilte,
                invoiceNum:invoice.invoiceNum,
                bankName:invoice.bankName,
                bankNumber:invoice.bankNumber,
                bankAddress:invoice.bankAddress,
                bankMobile:invoice.bankMobile,
                transferNumber:invoice.transferNumber
            }
            this.addressForm = {
                userName:invoice.userName,
                mobile:invoice.mobile,
                email:invoice.email,
                address:invoice.address
            }
        },
        ok(form1,form2){
            if(this.submiting) {
                this.$message.info('当前请求正在提交中，请勿重复提交');
                return false;
            }
            this.$refs[form1].validate((valid)=>{
                if(!valid){
                   return false
                }
                this.$refs[form2].validate((valid)=>{
                    if(!valid){
                        return false
                    }
                    
                    this.$confirm('提交后不可修改，确定提交吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async ()=>{
                        this.submiting = true;
                        let obj = Object.assign(this.addressForm,this.messageForm)
                        obj = Object.assign(obj,{
                            invoiceType:this.invoiceType,
                            invoiceKind:this.invoiceKind,
                            groupId:this.groupId
                        })
                        
                        let setIovice = await network.setIovice({data:obj});
                        this.submiting = false;
                        if(setIovice=='error') return ;
                        this.close()

                    }).catch(()=>{
                        
                    })
                })
            })
            
        },

    },
    watch:{
        invoiceVisible(val){
            if(!val){
                return this.close()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.invoice{
    text-align: left;
    margin-top: 0;
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
</style>




