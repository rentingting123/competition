<template>
    <div class="trainTablle">
        
        <div class="tableConnent">
            <div class="title">
                <p>报名管理</p>
            </div>
            <div class="cont">
                <div class="top">
                    <div class="seach">
                        <div class="inputs">
                            <input type="text" v-model="searchName" @keyup.enter="seachTrains" placeholder="搜索 手机号，学校，姓名">
                            
                        </div>
                        <div class="icons">
                            <i class="iconfont" style="color:#9b9b9b;fontSize:24px;" @click="seachTrains">&#xe626;</i>
                        </div>
                    </div>
                    <div class="exporTable" @click="exporTable">
                        导出报名表
                    </div>
                </div>
                <div style="clear:both;"></div>
                <p class="pNumber">人数  <span>{{total}}</span>名</p>
                <div class="tables">
                    <el-table style="width: 100%" :header-cell-style="{background:'#f3f3f3'}" v-loading="loading" border :data="tableList">
                        <el-table-column fixed header-align="center" type="index" align="center" label="序号" max-width="40">
                        </el-table-column>
                        <el-table-column fixed min-width="80" prop="name"  label="姓名"  >
                        </el-table-column>
                        <el-table-column  min-width="150" prop="phone"  label="手机号" >
                        </el-table-column>
                        <el-table-column min-width="200" prop="school"   label="学校"  >
                        </el-table-column>
                        <el-table-column min-width="80" prop="department"  label="部门"  >
                        </el-table-column>
                        
                        <el-table-column min-width="50" prop="sex"  label="性别"  >
                            
                        </el-table-column>
                        <el-table-column header-align="center" align="center" prop="payStatus" label="线上付款" min-width="100">
                            
                            <template slot-scope="scope">
                                <div>
                                    <span v-if="scope.row.payStatus==-1">   
                                        已退款
                                    </span>
                                    <span style="display: inline-grid;" v-else-if="scope.row.payStatus">
                                        {{scope.row.price}}    
                                        <el-button type="button"  size="mini" @click="payrRefund(scope.row.userId)">退款</el-button>
                                    </span>
                                    <span v-else>
                                        未支付
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column 
                            header-align="center" 
                            align="center" 
                            prop="payStatus" 
                            column-key="payStatus"

                            :filters="namefilters"
                            :filter-multiple="false" 
                            label="线上付款" 
                            min-width="100">

                            <template slot-scope="scope">
                                <div>
                                    <span v-if="scope.row.payStatus==-1">   
                                        已退款
                                    </span>
                                    <span v-else-if="scope.row.payStatus">
                                        ￥{{scope.row.price}}    
                                        <el-button type="button"  size="mini" @click="payrRefund(scope.row.userId)">退款</el-button>
                                    </span>
                                    <span v-else>
                                        未支付
                                    </span>
                                </div>
                            </template>
                        </el-table-column> -->
                        <el-table-column header-align="center" align="center" prop="offlineStatus" label="线下付款" min-width="160" column-key="offlineStatus">
                            <template slot-scope="scope">
                                <div >
                                    <p class="check" @click="checkOutline(scope.row.userId)">查看</p>
                                    <div style="text-align:center;" v-if="scope.row.offlineStatus==1">
                                        <p >已转账</p>
                                        <el-button type="button"  size="mini" @click="resetpayStatus(scope.row.userId,0)">重置</el-button>
                                    </div>
                                    <div style="text-align:center;" v-else-if="scope.row.offlineStatus==2">
                                        <p>已反馈</p>
                                        <el-button type="button"  size="mini" @click="resetpayStatus(scope.row.userId,0)">重置</el-button>
                                    </div>
                                    <div v-else>
                                        <el-button style="float:left"  v-if="scope.row.offlineStatus==0"  type="primary" size="mini" @click="outline(scope.row.userId,true)">审核</el-button>
                                        <el-button style="float:left"  v-else type="primary" size="mini" @click="outline(scope.row.userId,true)">确认</el-button>
                                        <el-button style="float:left"  type="button" size="mini" @click="outline(scope.row.userId,false)">反馈</el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" prop="invoiceStatus" label="发票信息" min-width="160" column-key="invoiceStatus">
                            <template slot-scope="scope">
                                <!-- null：未操作  0：待审核    1：已审核（确认） 2：已反馈 -->
                                <div>
                                    <p class="check"  @click="checkFile(scope.row.userId)">查看</p>
                                    <div style="text-align:center;" v-if="scope.row.invoiceStatus==1">
                                        <p >已开票</p>
                                        <el-button type="button"  size="mini" @click="resetpayStatus(scope.row.userId,1)">重置</el-button>
                                    </div>
                                    <div style="text-align:center;" v-else-if="scope.row.invoiceStatus==2">
                                        <p>已反馈</p>
                                        <el-button type="button"  size="mini" @click="resetpayStatus(scope.row.userId,1)">重置</el-button>
                                    </div>
                                    <div v-else>
                                        <el-button style="float:left"  v-if="scope.row.invoiceStatus==0"  type="primary" size="mini" @click="invoiceStatus(scope.row.userId,true)">审核</el-button>
                                        <el-button style="float:left"  v-else type="primary" size="mini" @click="invoiceStatus(scope.row.userId,true)">开票</el-button>
                                        <el-button style="float:left"  type="button" size="mini" @click="invoiceStatus(scope.row.userId,false)">拒绝</el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="email" min-width="200"  label="Email"  >
                            
                        </el-table-column>
                        <el-table-column prop="hostel" min-width="100"  label="住宿"  >
                            
                        </el-table-column>
                        <el-table-column prop="family" min-width="100"  label="带家属"  >
                            
                        </el-table-column>
                        <template v-for="(item,index) in tableHead">
                            <el-table-column min-width="100" align="center" :prop="item.column_name" 
                               v-if="
                                    item.column_comment !='手机号'&&
                                    item.column_comment !='学校' &&
                                    item.column_comment !='部门'&&
                                    item.column_comment !='姓名' &&
                                    item.column_comment !='性别'&&
                                    item.column_comment !='线上付款' &&
                                    item.column_comment !='线下付款' &&
                                    item.column_comment !='发票信息' &&
                                    item.column_comment !='Email' &&
                                    item.column_comment !='住宿' &&
                                    item.column_comment !='带家属'
                               " 
                               :label="item.column_comment" :key="index" >
                                
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        :page-size="8"
                        :current-page.sync='currentPage'
                        layout="prev, pager, next"
                        @current-change='currentChange'
                        :hide-on-single-page='true'
                        :total="total">
                    </el-pagination>
                </div>
                <outline-pay-detail :payDetail="payDetail" v-if="outlinepayshow" :close="close"/>
            </div>
            
        </div>
        
        <invoice-detail :userId="invoGroupId" :trainId="trainId" v-if="invoShow" :close="close"/>
    </div>
</template>
<script>
// import api from '~src/api/api.js'
// import webapi from '~src/api/webapi.js'
import outlinePayDetail from '@@/views/admin/financialManagement/outlineshow'
import invoiceDetail from './invoice'
import network from "@/api/jxapi/index";
export default {
    props:['trainId'],
    data() {
        
        return {
            loading:false,
            total:null,
            currentPage:1,
            competitionId:null,
            searchName:'',
            popelNum:666,
            tableList:[],
            invoShow:false,
            outlinepayshow:false,
            payDetail:{},
            invoGroupId:'',
            
            namefilters:[
                {
                value:'1',
                text:'已支付'
                },
                {
                value:'2',
                text:'未支付'
                },
                {
                value:'3',
                text:'已退款'
                },
                
            ],
            tableHead:[
                {
                column_name: "phone",column_comment:"手机号"
                },
                {
                column_name: "school",column_comment:"学校"
                },
                {
                column_name: "department",column_comment:"部门"
                },
                {
                column_name: "name",column_comment:"姓名"
                },
                {
                column_name: "sex",column_comment:"性别"
                },
                {
                column_name: "price",column_comment:"线上付款"
                },
                {
                column_name: "email",column_comment:"Email"
                },
                {
                column_name: "hostel",column_comment:"住宿"
                },
                {
                column_name: "family",column_comment:"带家属"
                },
                
            ],
        }
    },
    components: {
       outlinePayDetail,
       invoiceDetail
      
    },
    async created(){
        // this.trainId = this.$route.query.id
        this.competitionId = JSON.parse(localStorage.getItem('competitionId'))
        // this.getList()
    },
    mounted() {
        
    },
    computed:{

    },
    methods:{
        close(){
            this.invoShow = false
            this.outlinepayshow = false
        },
        currentChange(page){
            this.currentPage = page
            this.getList()
        },
        //搜索
        seachTrains(){
            this.getList()
        },
        //导出报名表
        async exporTable(){
            if(this.total>0){
                let data = {
                    trainingId:this.trainId
                }
                let downtable = await network.trainingSignUpInfo({data,config:{responseType:'arraybuffer'}})
            //     api.exportGet('Api/training/report/trainingSignUpInfo',data).then(res =>{
            //         // console.log(res)
            //         // console.log(res)
            //         // this.getList()
            //     })
            }else{
                this.$message.info('暂无数据')
            }
            
        },
        //退款
        async payrRefund(userId){
            let data = {
                userId:userId,
                trainingId:this.trainId,
            }
            let res = await network.payrRefund({data})
            if(res=='error') return
            this.getList()
            // api.get('Api/training/pay/payrRefund',data).then(res =>{
            //     // console.log(res)
            //     this.getList()
            // })

        },
        async getList(){
            this.loading = true
            this.tableList = []
            this.tableHead = [
                {
                column_name: "phone",column_comment:"手机号"
                },
                {
                column_name: "school",column_comment:"学校"
                },
                {
                column_name: "department",column_comment:"部门"
                },
                {
                column_name: "name",column_comment:"姓名"
                },
                {
                column_name: "sex",column_comment:"性别"
                },
                {
                column_name: "price",column_comment:"线上付款"
                },
                {
                column_name: "email",column_comment:"Email"
                },
                {
                column_name: "hostel",column_comment:"住宿"
                },
                {
                column_name: "family",column_comment:"带家属"
                },
                
            ]
            let data = {
                form:this.searchName,
                trainingId:this.trainId,
                pageNum:this.currentPage,
                pageSize:8
            }
            let res = await network.selectSignupList({data})
            if(res=='error') return
            this.loading = false
                this.total = res.total
                    this.tableList = res.list
                    let arr = []
                    if(res&&res.list.length>0){
                        res.list.forEach((ele,index) =>{
                            if(Array.isArray(ele.customDetailVoList)){
                                ele.customDetailVoList.forEach((item,ind) =>{
                                    res.list[index][item.name] = item.value
                                })
                            }
                            
                        })
                        let arr =[]
                        this.tableHead.forEach(ele =>{
                            arr.push(ele.column_comment)
                        })
                        for(let i = 0; i<res.list.length;i++){
                            if(Array.isArray(res.list[i]['customDetailVoList'])){
                                res.list[i]['customDetailVoList'].forEach(e =>{
                                    if(arr.indexOf(e.name)<0){
                                        this.tableHead.push({
                                            column_name:e.name,
                                            column_comment:e.name
                                        })
                                    }
                                    
                                })
                            }
                            
                        }
                    }
                    let result = []
                    let obj = {}
                    for(let i of this.tableHead){
                        if(!obj[i.column_name]){

                            result.push(i)
                            obj[i.column_name] = 1
                        }
                    }
                    this.tableHead = result

            // api.post('Api/training/selectSignupList',data).then(res =>{
            //         this.loading = false
            //         this.total = res.total
            //         this.tableList = res.list
            //         let arr = []
            //         if(res&&res.list.length>0){
            //             res.list.forEach((ele,index) =>{
            //                 if(Array.isArray(ele.customDetailVoList)){
            //                     ele.customDetailVoList.forEach((item,ind) =>{
            //                         res.list[index][item.name] = item.value
            //                     })
            //                 }
                            
            //             })
            //             let arr =[]
            //             this.tableHead.forEach(ele =>{
            //                 arr.push(ele.column_comment)
            //             })
            //             for(let i = 0; i<res.list.length;i++){
            //                 if(Array.isArray(res.list[i]['customDetailVoList'])){
            //                     res.list[i]['customDetailVoList'].forEach(e =>{
            //                         if(arr.indexOf(e.name)<0){
            //                             this.tableHead.push({
            //                                 column_name:e.name,
            //                                 column_comment:e.name
            //                             })
            //                         }
                                    
            //                     })
            //                 }
                            
            //             }
            //         }
            //         let result = []
            //         let obj = {}
            //         for(let i of this.tableHead){
            //             if(!obj[i.column_name]){

            //                 result.push(i)
            //                 obj[i.column_name] = 1
            //             }
            //         }
            //         this.tableHead = result
                    
            //     })
        },
        //线下付款审核 
        async outline(userId,flag){
            
            if(!flag){
                this.$prompt('反馈将以短信的形式通知参赛队伍', '反馈', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({ value }) => {
                    let data ={
                        userId:userId,
                        trainingId:this.trainId,
                        type:flag,
                        message:value
                    }
                    let res = await network.auditUserPay({data})
                    if(res=='error') return
                    this.getList()
                    // api.post('Api/training/pay/auditUserPay',data).then(res =>{
                    //     // console.log(res)
                    //     this.getList()
                    // })
                    
                }).catch(() => {
                    this.$message.info('取消反馈');       
                });
            }else{
                let data ={
                    userId:userId,
                    trainingId:this.trainId,
                    type:flag,
                }
                let res = await network.auditUserPay({data})
                    if(res=='error') return
                    this.getList()
                // api.post('Api/training/pay/auditUserPay',data).then(res =>{
                //     // console.log(res)
                //     this.getList()
                // })
            }
        },
        //发票信息审核 开票 拒绝
        async invoiceStatus(userId,flag){
            
            if(!flag){
                this.$prompt('反馈将以短信的形式通知参赛队伍', '反馈', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({ value }) => {
                    let data ={
                        userId:userId,
                        trainingId:this.trainId,
                        type:flag,
                        message:value
                    }
                    let res = await network.auditGroupInvoice({data})
                    if(res=='error') return
                    this.getList()
                    // api.post('Api/training/pay/auditGroupInvoice',data).then(res =>{
                    //     // console.log(res)
                    //     this.getList()
                    // })
                }).catch(() => {
                    this.$message.info('取消反馈');       
                });
            }else{
                let data ={
                    userId:userId,
                    trainingId:this.trainId,
                    type:flag,
                }
                let res = await network.auditGroupInvoice({data})
                    if(res=='error') return
                    this.getList()
                // api.post('Api/training/pay/auditGroupInvoice',data).then(res =>{
                //     // console.log(res)
                //     this.getList()
                // })
            }            
        },
        //线下付款 、发票信息  重置
        async resetpayStatus(userId,type){
            let data ={
                userId:userId,
                trainingId:this.trainId,
                type:type,
            }
            let res = await network.resetStatus({data})
                    if(res=='error') return
                    this.getList()
            // api.get('Api/training/pay/resetStatus',data).then(res =>{
            //     // console.log(res)
            //     this.getList()
            // })
            
        },
        //线下付款查看
        async checkOutline(userId){
            let data = {
                trainingId:this.trainId,
                userId:userId

            }
            // this.outlinepayshow = true
            let res = await network.queryOfflineStatus({data})
                    if(res=='error') return
                    this.outlinepayshow = true
                    let datas = {
                        remark:res.remark,
                        imgUrl:JSON.stringify(res.imgUrl)
                    }
                    this.payDetail = datas
            // api.get(`Api/training/pay/queryOfflineStatus`,data).then(res =>{
            //     if(!res) return this.$message.warning('未上传支付凭证');
            //     if(res){
            //         this.outlinepayshow = true
            //         let data = {
            //             remark:res.remark,
            //             imgUrl:JSON.stringify(res.imgUrl)
            //         }
            //         this.payDetail = data
            //     }
            // })
            
        },
        checkFile(userId){
            this.invoShow=true
            this.invoGroupId=userId
        },
       
    },
    
}
</script>

<style lang="less">
.trainTablle{
    
    // width: 1050px;
    margin: 0 auto;
    margin-bottom: 50px;
    .goback{
        span{
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #787D81;
            letter-spacing: 0;
            cursor: pointer;
        }
    }
    .tableConnent{
        margin-top: 12px;
        background: #fff;
        .el-dialog__wrapper{
            width: 1050px;
            margin: 0 auto;
        }
        .title{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #FAFAFA;
            border-bottom: 1px solid #E1E1E1;
            p{
                font-family: PingFang-SC-Bold;
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 0;
                padding: 0 30px;
                font-weight: 500;
            }
        }
        .cont{
            background: #fff;
            padding: 0 16px;
            .top{
                
                margin-top: 16px;
                .seach{
                    display: inline-block;
                    width: 256px;
                    border: 1px solid #DEDEDE;
                    border-radius: 5px;
                    float: left;
                    .inputs{
                        width: 200px;
                        height: 36px;
                        
                        display: inline-block;
                        padding-left: 10px;
                        float: left;
                        input{
                            width: 100%;
                            height: 34px;
                            border: none;
                            outline: none;
                        }
                    }
                    .icons{
                        width: 40px;
                        height: 36px;
                        border: 1px solid #DEDEDE;
                        background: #DEDEDE;
                        display: inline-block;
                        float: right;
                        line-height: 36px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .exporTable{
                    float: right;
                    font-family: PingFang-SC-Medium;
                    font-size: 16px;
                    color: #fff;
                    letter-spacing: 0;
                    line-height: 30px;
                    cursor: pointer;
                    text-align: center;
                    width: 114px;
                    height: 30px;
                    background: #1890FF;
                    border-radius: 4px;
                }
            }
            .pNumber{
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 1px;
                margin-top: 12px;
                padding-left: 12px;
                span{
                    color: #4199FF;
                }
            }
            .tables{
                // margin-bottom: 30px;
                // padding-bottom: 30px;
                margin-top: 12px;
                .check{
                    cursor: pointer;
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    color: #1D86FF;
                    letter-spacing: 0;
                }
            }
            .pagination{
                margin-top: 20px;
                text-align: center;
                padding-bottom: 20px;
            }
        }
        .el-table__fixed{
            height: 100% !important;
        }
        
    }
    
}


</style>
