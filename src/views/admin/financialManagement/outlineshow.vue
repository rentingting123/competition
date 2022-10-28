<template>
    <el-dialog class="invoice" title="线下支付数据" :modal-append-to-body="false" :close-on-click-modal=false :visible.sync="outlineDia"  width="70%">
        <div class="main">
            <div>
                <p><span>支付凭证:</span>
                    <a v-for="(list,index) in fileList" :key="index" :href="list.location" target="_blanck">{{list.name}}</a>
                </p>
                <p><span>备注:</span>{{remark}}</p>
            </div>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:['payDetail','close'],
    data(){
        return{
            outlineDia:true,
            fileList:[],
            remark:''
        }
    },
    created(){
        this.fileList = this.payDetail?JSON.parse(this.payDetail.imgUrl):[];
        this.remark = this.payDetail&&this.payDetail.remark
    },
    watch:{
        outlineDia(val){
            if(!val) return this.close&&this.close();
        }
    }
}
</script>

<style lang="less" scoped>
.main{
    width: 80%;
    margin: 0 auto;
    margin-top: 40px;
    text-align: left;
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
</style>
