<template>
    <div class="emailCert"  @mouseover="on=true" @mouseout="on=false">
        <el-button type="primary"  :class="{'last':!on}" @click="open()">
            <i class="icon iconfont">&#xe6f4;</i>
            {{$t('credential.emailCert')}}
        </el-button>
        <el-dialog :title="$t('credential.emailCert')" :append-to-body='true' :close-on-click-modal='false' :visible.sync="show">
            <div v-if="status==0" class="status0">
                <span>
                    <i class="iconfont">&#xe63f;</i>
                </span>
                <p>
                    {{$t('credential.waitmess')}}
                </p>
            </div>
            <div v-else-if="status==1" class="status0">
                <span>
                    <i class="iconfont">&#xe63f;</i>
                </span>
                <p>
                     {{$t('credential.already')}}
                </p>
                <div v-if="orderNo">
                    <i class="iconfont">&#xe6f4;</i>
                    <p>
                        <span> {{$t('credential.logistics')}}</span>
                        <span class="lastspan">{{orderNo}}</span>
                    </p>
                </div>
                 
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" v-else ref="ruleForm" label-position="top" class="ruleForm" label-width="100px" >
                <el-form-item :label="$t('credential.addressee')" prop="name">
                    <el-input v-model="ruleForm.name" autocomplete="off" :placeholder="$t('credential.nameMess')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('credential.phone')" prop="phone" >
                    <el-input v-model="ruleForm.phone" autocomplete="off" :placeholder="$t('credential.phoneMess')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('credential.address')" prop="address">
                    <el-input v-model="ruleForm.address" :placeholder="$t('credential.addressMess')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('credential.numbers')" prop="num">
                    <el-input v-model="ruleForm.num" :placeholder="$t('credential.numbersMess')" type="number" min="1"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="show=false">{{$t('credential.cancel')}}</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">{{$t('credential.submit')}}</el-button>
                </el-form-item>
                
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    props:['list'],
    data(){
        return{
            ruleForm:{
                name: '',
                phone: '',
                address: '',
                num: ''
            },
            rules: {
                name: [
                    { required: true, message: this.$t('credential.nameMess'), trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: this.$t('credential.phoneMess'), trigger: 'blur' }
                ],
                address: [
                    { required: true, message: this.$t('credential.addressMess'), trigger: 'blur' }
                ],
                num: [
                    { required: false, message: this.$t('credential.numbersMess'), trigger: 'blur' }
                ]
            },
            on: false,
            show: false,
            orderNo: '', //订单号
            status: null, // 0:申请中 1：申请通过 2：申请拒绝 null:未操作
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(async (valid) => {
                if(!formName) return;
                let res = await network.applyCertificate({data:{
                    ...this.ruleForm,
                    hornerId: this.list.id
                }})
                if(res=='error') return;
                this.$message.success(this.$t('credential.saveSuccess'))
                this.show = false
            })
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        async open(){
            let res = await network.selectApplyCertificate({data:{
                hornerId: this.list.id
            }})
            if(res=='error') return;
            this.orderNo = res && res.orderNo
            this.ruleForm.name = res && res.name
            this.ruleForm.phone = res && res.phone
            this.ruleForm.address = res && res.address
            this.ruleForm.num = res && res.num
            this.status = res && res.status
            this.show = true
        }
    }
}
</script>

<style lang='less' scoped>
.emailCert{
    display: inline-block;
    button {
        margin: 0;
        padding: 0;
        width: 217px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0.17px;
        background-color: #00aa91;
        margin-top: 10px;
        &.last {
            background: #ffffff;
            border: 1px solid #00aa91;
            
            color: #00aa91;
        }
    }
}
.ruleForm{
    width: 560px;
    margin: 0 auto;
    .footer{
        text-align: right;
    }
}
.status0{
    width: 560px;
    margin: 0 auto;
    min-height: 200px;
    text-align: center;
    >span{
        display: inline-block;
        color: #52C41A;
        padding-top: 70px;
        margin-bottom: 20px;
        i{
            font-size: 70px;
        }
    }
    >p{
        font-size: 24px;
        font-weight: bold;
    }
    >div{
        width: 354px;
        height: auto;
        background: #F4F4F4;
        margin: 30px auto 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 25px 0;
        i{
            color: #00AA91;
            font-size: 30px;
            margin: 0 45px;
        }
        p{
            
            text-align: left;
            span{
                display: block;
                font-size: 14px;
                &.lastspan{
                    font-size: 24px;
                    font-weight: bold;
                }
            }
            
        }
    }
}
</style>