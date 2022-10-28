<template>
    <div>
        <div class="content_topRight">
            <p v-if="authority.editInvoice" class="invoice">
                <i class="iconfont" v-if="groupInfo.invoiceStatus!=0">&#xe66a;</i>
                <span v-if="groupInfo.invoiceStatus==1" @click="toinvoice(groupInfo.invoiceStatus)">
                    {{$t('teamDetail.apply')}}
                </span>
                <span v-if="groupInfo.invoiceStatus==2 || groupInfo.invoiceStatus==3" @click="toinvoice(groupInfo.invoiceStatus)">
                    {{$t('teamDetail.Check')}}
                </span>
                <span v-if="groupInfo.invoiceStatus==4" @click="toinvoice(groupInfo.invoiceStatus)">
                    {{$t('teamDetail.editApply')}}
                </span>
            </p>
            <!-- 支付 -->
            <p v-if="groupInfo.payStatus==0 && authority.editPay" @click="topay" class="topay">
                <i class="iconfont">&#xe66b;</i>
                <span>{{$t('teamDetail.pay')}}</span>
            </p>
            <!-- 已支付 -->
            <p v-if="groupInfo.payStatus==1" class="topay">
                <i class="iconfont">&#xe66b;</i>
                <span>{{$t('teamDetail.areadyPay')}}</span>
            </p>
            <slot></slot>
        </div>

        <invoice v-if="payFlag==1" :type="groupInfo.payStatus" :groupId="groupInfo.groupId" :close="closeDia"/>
        <invoice-detail v-if="payFlag==2" :groupId="groupInfo.groupId" :close="closeDia"/>
       
        <el-dialog class="paytype" :title="$t('teamDetail.payTypeMess')" :close-on-click-modal= false :visible.sync="paychoose">
            <div style="margin:30px 0">
                <el-button @click="linepay">{{$t('teamDetail.linepay')}}</el-button>
                <el-button @click="outlinePay">{{$t('teamDetail.outlinepay')}}</el-button>
            </div>
            <div class="paychoose">
                <h1> <span>*</span> {{$t('teamDetail.payMess')}}</h1>
            </div>
        </el-dialog>
        <outlineDia v-if="outlineDia" :teamId="teamId" :payDetail="payDetail" :close="outlineDiaclose"/>

    </div>
</template>

<script>
import jxapi from '@@/api/jxapi/index'
import { mapState } from 'vuex';

import invoice from '@@/components/invoice/index'
import invoiceDetail from '@@/components/invoice/common/detail'
import outlineDia from '@@/components/invoice/common/outlineDia'

export default {
    props:[
        'groupInfo',
        'close'
    ],
    components:{
        invoice,
        invoiceDetail,
        outlineDia
    },
    data(){
        return{
            paychoose:false,
            outlineDia:false,
            pay:{},
            payFlag:0,
            payDetail:{},
            teamId: '',

        }
    },
    computed:mapState({
        authority: state=>state.authorityManagement
    }),
    methods:{
        outlineDiaclose(flag){
            this.outlineDia = false;
            if(flag){
                this.paychoose = false;
                this.close && this.close();
            }
        },
        toinvoice(index){
            // "payStatus"   0：未支付 1：已支付
            // "invoiceStatus" 0：无权限开票  1：有权限未申请  2：开票中  3：开票成功  4：开票失败 暂时这几个  不够再加
            if(index==1 || index==4){
                this.payFlag =  1
            }else if(index==3 || index==2){
                this.payFlag =  2
            }else{

            }
        },
        async topay(){
            this.paychoose = true;
        },
        async outlinePay(){
            this.teamId = this.$route.params.teamId            
            let params = {
                competitionId:this.groupInfo.competition.id,
                groupId:this.teamId
            }
            let payDetail = await jxapi.queryGroupPay({data:params});
            if(payDetail=='error') return;
            if(payDetail.outlinePay==0) return this.$message.error(this.$t('teamDetail.noPay'));
            this.payDetail = payDetail
            this.outlineDia = true
        },
        async linepay(){
            let params = {
                competitionId:this.groupInfo.competition.id,
                payType:1,
                groupId:this.groupInfo.groupId,
                returnUrl:location.href,
            }
            let pay = await jxapi.teamPay({data:params});
            if(pay=='error') return;
            document.getElementsByTagName('body')[0].innerHTML = pay
            document.getElementsByTagName('form')[0].submit()
        },
        closeDia(){
            this.payFlag = 0
            this.close && this.close();
        }
    }
}
</script>

<style lang='less' scoped>
.content_topRight{
    width: 380px;
    display: flex;
    justify-content: flex-end;
    p{
        cursor: pointer;
        color:#1D86FF;
        margin-right: 16px;
    }
    .invoice{
        color: #ED630A;
    }
    .topay{
        color: #4199FF;
    }
    .team{
        color: #D0021B;
    }
}
.paychoose{
    h1{
        width: 80%;
        margin: 0 auto;
        font-size: 14px;
        text-align: left;
        margin-top: 10px;
        span{
            color: red;
        }
    }
}
</style>

<style lang="less">
.paytype{
    .el-dialog__header {
        padding: 20px 40px 10px;
    }
}
</style>