<template>
    <div>
        <el-dialog
            title="申请发票"
            class="invoice"
            :visible.sync="invoiceVisible"
            width="800px"
            top="10px"
            :close-on-press-escape="false"
            :close-on-click-modal= false
            :modal-append-to-body="false"
            >
            <p class="title">发票申请已提交，若有疑问，请电话咨询17357146574</p>
            
            <div class="main">
                <div>
                    <p><span>发票凭证:</span>
                        <a v-for="(list,index) in fileList" :key="index" :href="list.location" target="_blanck">{{list.name}}</a>
                    </p>
                    <p><span>转账流水号:</span>{{messageForm.transferNumber?messageForm.transferNumber:'-'}}</p>
                </div>
            </div>
            
            <div class="main">
                <p>发票类型</p>
                <div>
                    <p><span>发票类型:</span>{{types | type}}</p>
                    <p><span>开票类型:</span>{{invoiceKind | applySta}}</p>
                </div>
            </div>
            
            <div class="main">
                <p>发票信息</p>
                <div>
                    <p v-if="messageForm.invoiceTilte"><span>发票抬头:</span>{{messageForm.invoiceTilte}}</p>
                    <p v-if="messageForm.invoiceNum"><span>税号:</span>{{messageForm.invoiceNum}}</p>
                    <p v-if="messageForm.bankName"><span>基本开户行:</span>{{messageForm.bankName}}</p>
                    <p v-if="messageForm.bankNumber"><span>基本开户号:</span>{{messageForm.bankNumber}}</p>
                    <p v-if="messageForm.bankAddress"><span>注册场所地址:</span>{{messageForm.bankAddress}}</p>
                    <p v-if="messageForm.bankMobile"><span>注册固话:</span>{{messageForm.bankMobile}}</p>
                    <p><span>发票内容:</span>竞赛报名费</p>
                </div>
            </div>
            
            <div class="main">
                <p v-if="invoiceKind==2">发票寄送地址</p>
                <div v-if="invoiceKind==2">
                    <p><span>收件人姓名:</span>{{addressForm.userName}}</p>
                    <p><span>收件地址:</span>{{addressForm.address}}</p>
                    <p><span>手机号:</span>{{addressForm.mobile}}</p>
                </div>
                <p v-if="invoiceKind==1">发票接收邮箱</p>
                <div v-if="invoiceKind==1">
                    <p><span>电子邮箱:</span>{{addressForm.email}}</p>
                    <p><span>手机号:</span>{{addressForm.mobile}}</p>
                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="invoiceVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import api from '~src/api/api.js'
export default {
    props:{
        close:Function,
        userId:String,
        trainId:String
    },
    data(){
        return{
            invoiceVisible:true,
            messageForm:{},
            addressForm:{},
            fileList:[             
            ],
            types:'',
            invoiceKind:'',
        }
    },
    async created(){
        let data = {
            trainingId:this.trainId,
            userId:this.userId
        }
        // api.get('Api/training/pay/queryInvoice',data).then(res =>{
        //     if(res=='error') return;
        //     if(!res){
        //         this.$message.warning('未申请发票');
        //         return this.close&& this.close()
        //     }
        //     if(res){
        //         let invoice = res
        //         this.types = invoice.invoiceType
        //         this.invoiceKind = invoice.invoiceKind

        //         this.messageForm = {
        //             invoiceTilte:invoice.invoiceTilte,
        //             invoiceNum:invoice.invoiceNum,
        //             bankName:invoice.bankName,
        //             bankNumber:invoice.bankNumber,
        //             bankAddress:invoice.bankAddress,
        //             bankMobile:invoice.bankMobile,
        //             transferNumber:invoice.transferNumber
        //         }
        //         this.addressForm = {
        //             userName:invoice.userName,
        //             mobile:invoice.mobile,
        //             email:invoice.email,
        //             address:invoice.address
        //         }
        //         this.fileList = JSON.parse(invoice.imgUrl)
        //     }
        // })
        
        


    },
    filters:{
        type(val){
            switch(val){
                case 1: return '个人普通发票';
                case 2: return '企业普通发票';
                case 3: return '企业专用发票';
            }
        },
        applySta(val){
            switch(val){
                case 1: return '电子发票';
                case 2: return '纸质发票';
            }
        }
    },
    watch:{
        invoiceVisible(val){
            if(!val){
                return this.close();
            }
        }
    }
}
</script>

<style lang="less" scoped>
.invoice{
    text-align: left;
    margin-top: 0;
    .title{
        background: #EAF5FF;
        text-align: center;
        font-size: 14px;
        color: #0078E2;
        line-height: 32px;
        letter-spacing: 0;
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
        }
        >div{
            background: #FAFAFA;
            padding: 17px 19px 17px;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 1px;
            p{
                margin-bottom: 18px;
                span{
                    display: inline-block;
                    width: 120px;
                }
                a{
                   color: #4199FF;
                   margin-right: 10px;
                   display: inline-block;
                }
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
.avatar-uploader{
        margin: 20px 0;
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
</style>
<style lang="less">
.invoice{
    .el-upload-dragger{
        background: #FAFAFA ;
    }
    .el-dialog__body{
        padding:30px 0;
    }
}
</style>



